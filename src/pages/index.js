import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirmDeleteCard } from '../components/PopupConfirmDeleteCard.js';
import { Api } from '../components/Api.js';
import {
  profileEditButton,
  addButton,
  name,
  about,
  editButtonAvatar,
  parametrs,
} from '../utils/Constants.js';

//Переменная для получения id владельца с сервера
let ownerId = '';

//Данные для создания вызова на сервер
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'fa53dc10-0bed-404e-84a8-68518d7f0629',
    'Content-Type': 'application/json',
  },
});

//Промис изначальных данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((data) => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    ownerId = userData._id;
    renderArrayCards.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//Функция изменения данных автора
const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileAboutAuthor: '.profile__about-author',
  avatarAuthor: '.profile__image-author',
});

//--------------------------------------------------//
//Функция вывода картинки карточки в попап
const popupWithImage = new PopupWithImage({
  popupSelector: '.popup__open-card',
  closeButtonSelector: '.popup__close-button_open-card',
});
popupWithImage.setEventListeners();

//Изменение фотографии автора
const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: '.popup__edit-avatar',
  closeButtonSelector: '.popup__close-button_edit-avatar',
  submitButton: '.popup__submit-button_edit-avatar',
  submitForm: (data) => {
    popupWithFormEditAvatar.renderLoading(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEditAvatar.renderLoading(false);
      });
  },
});
popupWithFormEditAvatar.setEventListeners();

//Изменение данных автора
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: '.popup',
  closeButtonSelector: '.popup__close-button',
  submitButton: '.popup__submit-button',
  submitForm: (data) => {
    popupWithFormEditProfile.renderLoading(true, 'Загрузка...');
    api
      .editDataProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEditProfile.renderLoading(false);
      });
  },
});
popupWithFormEditProfile.setEventListeners();

//Добавление новой карточки на страницу
const popupWithFormAddNewCard = new PopupWithForm({
  popupSelector: '.popup__add-card',
  closeButtonSelector: '.popup__close-button_add-card',
  submitButton: '.popup__submit-button-newcard',
  submitForm: (data) => {
    popupWithFormAddNewCard.renderLoading(true, 'Создание...');
    api
      .addNewCard(data)
      .then((res) => {
        handleRenderCard(res);
        popupWithFormAddNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAddNewCard.renderLoading(false);
      });
  },
});
popupWithFormAddNewCard.setEventListeners();

//Удаление карточки со страницы
const popupConfirmDeleteCard = new PopupConfirmDeleteCard({
  popupSelector: '.popup__delete-card',
  closeButtonSelector: '.popup__close-button_delete-card',
});
popupConfirmDeleteCard.setEventListeners();

//Функция визуализации карточки
const handleRenderCard = (data) => {
  const itemCard = new Card(
    ownerId,
    data,
    setLike,
    deleteLike,
    handleCardClick,
    handleDeleteCard,
    '.template'
  );
  const cardElement = itemCard.createCard();
  renderArrayCards.addItemsOnContainer(cardElement);

  function handleCardClick(data) {
    popupWithImage.open(data);
  }

  function handleDeleteCard(dataId) {
    popupConfirmDeleteCard.open();
    popupConfirmDeleteCard.setSubmitCallback(() => {
      api
        .deleteCard(dataId._id)
        .then(() => {
          document.getElementById(dataId._id).remove();
          popupConfirmDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function setLike(dataId) {
    api
      .putLikeCard(dataId)
      .then(() => {
        itemCard.setLikeCount();
        console.log('liked');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteLike(dataId) {
    api
      .deleteLikeCard(dataId)
      .then(() => {
        itemCard.delLikeCount();
        console.log('disliked');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//Функция добаления карточки в DOM-элемент
const renderArrayCards = new Section(
  {
    handleRenderCard,
  },
  '.cards'
);

//Добавление слушаетелей кнопкам открытия попапов
editButtonAvatar.addEventListener('click', () => {
  popupWithFormEditAvatar.open();
});

addButton.addEventListener('click', () => {
  popupWithFormAddNewCard.open();
});

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  name.value = userData.name;
  about.value = userData.about;
  popupWithFormEditProfile.open();
});

//--------------------------------------------------//
//Инициализация класса для валидации формы EditProfile
const formValidatorEditProfile = new FormValidator(
  parametrs,
  parametrs.formSelector
);
formValidatorEditProfile.enableValidation();

//Инициализация класса для валидации формы AddCard
const formValidatorAddCard = new FormValidator(
  parametrs,
  parametrs.formSelectorAddCard
);
formValidatorAddCard.enableValidation();

const formValidatorEditAvatar = new FormValidator(
  parametrs,
  parametrs.formSelectorEditAvatar
);
formValidatorEditAvatar.enableValidation();
