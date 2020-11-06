import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameAuthor = document.querySelector(".popup__form_author_name");
const aboutAuthor = document.querySelector(".popup__form_author_about");
//--------------------------------------------------//
//Клавиши клавиатуры
export const esc = "Escape";
//--------------------------------------------------//

//Массив карточек, добавляется при загрузке страницы
const initialCards = [
  {
    cardName: "Архыз",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    cardName: "Челябинская область",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    cardName: "Иваново",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    cardName: "Камчатка",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    cardName: "Холмогорский район",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    cardName: "Байкал",
    cardLink:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Объект с классами селекторов для валидации форм
export const parametrs = {
  formSelectorAddCard: ".popup__form_add-card",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-input-error_active",
};

//Объект для заполнение профиля нового автора
const dataAuthor = {
  name: nameAuthor,
  about: aboutAuthor,
}

//--------------------------------------------------//
//Функция обработчик клика по карточке
const handleCardClick = (cardImage, cardTitle) => {
  popupWithImage.open(cardImage, cardTitle);
};
//Функция создания карточек из класса Card
const handleRenderCard = (card) => {
  const itemCard = new Card(
    card.cardName,
    card.cardLink,
    handleCardClick,
    ".template"
  );
  const cardElement = itemCard.createCard();
  renderArrayCards.addItemsOnContainer(cardElement);
};
//Функция вывода карточек на экран
const renderArrayCards = new Section(
  {
    data: initialCards,
    handleRenderCard,
  },
  ".cards"
);

renderArrayCards.renderItems();

//Инициализация класса добавления новой карточки в разметку
const popupWithFormAddNewCard = new PopupWithForm({
  popupSelector: ".popup__add-card",
  closeButtonSelector: ".popup__close-button_add-card",
  submitForm: (newCard) => {
    const itemCard = new Card(
      newCard["cardName"],
      newCard["cardLink"],
      handleCardClick,
      ".template"
    );
    const cardElement = itemCard.createCard();
    renderArrayCards.addNewCardOnContainer(cardElement)
  },
});

addButton.addEventListener("click", () => {
  popupWithFormAddNewCard.open();
});
popupWithFormAddNewCard.setEventListeners();

//--------------------------------------------------//
//Инициализация класса  для открытия и закрытия popup фотографии карточки
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup__open-card",
  closeButtonSelector: ".popup__close-button_open-card",
});
popupWithImage.setEventListeners();

//--------------------------------------------------//
//Инициализация класса с информацией об авторе
const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileAboutAuthor: ".profile__about-author",
});
//Инициализация класса добавления информации об авторе на страницу
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup",
  closeButtonSelector: ".popup__close-button",
  submitForm: () => {
    userInfo.setUserInfo(dataAuthor);
    popupWithFormEditProfile.close();
  },
});

profileEditButton.addEventListener("click", () => {
  popupWithFormEditProfile.open();
  const userData = userInfo.getUserInfo();
  nameAuthor.value = userData.nameAuthor;
  aboutAuthor.value = userData.aboutAuthor;
  
});

popupWithFormEditProfile.setEventListeners();

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
