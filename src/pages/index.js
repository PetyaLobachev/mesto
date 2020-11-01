import '../pages/index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
export const nameAuthor = popup.querySelector(".popup__form_author_name");
export const aboutAuthor = popup.querySelector(".popup__form_author_about");
const addButton = document.querySelector(".profile__add-button");
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
//--------------------------------------------------//
// Массив с объектом для создания новой карточки
const addCard = [
  {
    cardName: ".popup__form_card_name",
    cardLink: ".popup__form_card_link",
  },
];
//--------------------------------------------------//
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
//--------------------------------------------------//
//Инициализация экземпляра класса Popup для открытия и закрытия popup редактирования профиля
const popupOpenedAndClosedEditProfile = new Popup({
  popupSelector: ".popup",
  closeButtonSelector: ".popup__close-button",
});
profileEditButton.addEventListener("click", () => {
  popupOpenedAndClosedEditProfile.open();
  popupOpenedAndClosedEditProfile.setEventListenersPopup();
  userInfo.getUserInfo();
});
//--------------------------------------------------//
//Инициализация экземпляра Popup для открытия и закрытия popup добавления новой карточки
const popupOpenedAndClosedAddCard = new Popup({
  popupSelector: ".popup__add-card",
  closeButtonSelector: ".popup__close-button_add-card",
});
addButton.addEventListener("click", () => {
  popupOpenedAndClosedAddCard.open();
  popupOpenedAndClosedAddCard.setEventListenersPopup();
});
//--------------------------------------------------//
//Инициализация экземпляра Popup для открытия и закрытия popup фотографии карточки
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup__open-card",
  closeButtonSelector: ".popup__close-button_open-card",
});
//--------------------------------------------------//
//Перебор массива объектов => создание initial карточек из класса Card и вывод их на страницу через экземпляр класса Section
const renderArrayCards = new Section(
  {
    data: initialCards,
    renderer: (card) => {
      const handleCardClick = (cardImage, cardTitle) => {
        popupWithImage.open(cardImage, cardTitle);
        popupWithImage.setEventListenersPopup();
      };
      const itemCard = new Card({ card, handleCardClick }, ".template");
      const cardElement = itemCard.createCard();
      renderArrayCards.addItemsOnContainer(cardElement);
    },
  },
  ".cards"
);

renderArrayCards.renderItems();
//--------------------------------------------------//
//Создание новой карточки из попапа и вывод их на страницу через экземпляр класса Section
const renderAddCards = new Section(
  {
    data: addCard,
    renderer: () => {
      const popupWithFormAddCard = new PopupWithForm({
        popupSelector: ".popup__add-card",
        formSelector: ".popup__form_add-card",
        hundleSubmitForm: (card) => {
          const handleCardClick = (cardImage, cardTitle) => {
            popupWithImage.open(cardImage, cardTitle);
            popupWithImage.setEventListenersPopup();
          };
          const itemCard = new Card({ card, handleCardClick }, ".template");
          const cardElement = itemCard.createCard();
          renderAddCards.addItemsOnContainer(cardElement);
          popupOpenedAndClosedAddCard.close();
        },
      });
      popupWithFormAddCard.setEventListenersPopup();
    },
  },
  ".cards"
);
renderAddCards.renderItems();
//--------------------------------------------------//
//Инициализация класса с информацией об авторе
const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileAboutAuthor: ".profile__about-author",
});
//Инициализация класса добавления информации об авторе на страницу
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup",
  formSelector: ".popup__form",
  hundleSubmitForm: () => {
    userInfo.setUserInfo({ nameAuthor, aboutAuthor });
    popupOpenedAndClosedEditProfile.close();
  },
});

popupWithFormEditProfile.setEventListenersPopup();
//--------------------------------------------------//
//Создание нового объекта - экземляра класса для валидации формы EditProfile
const formValidatorEditProfile = new FormValidator(
  parametrs,
  parametrs.formSelector
);
formValidatorEditProfile.enableValidation();
//--------------------------------------------------//
//Создание нового объекта - экземляра класса для валидации формы AddCard
const formValidatorAddCard = new FormValidator(
  parametrs,
  parametrs.formSelectorAddCard
);
formValidatorAddCard.enableValidation();
//--------------------------------------------------//

// const popupCloseBattonAddCard = popupAddCard.querySelector(
//   ".popup__close-button_add-card"
// );
// const popupOpenCard = document.querySelector(".popup__open-card");
// const popupCloseOpenCard = document.querySelector(
//   ".popup__close-button_open-card"
// );
// const cards = document.querySelector(".cards");
// const popupFormAddCard = popupAddCard.querySelector(".popup__form_add-card");
// const popupCloseButton = document.querySelector(".popup__close-button");
// const popupForm = popup.querySelector(".popup__form");
// const popupFormCardName = popupAddCard.querySelector(".popup__form_card_name");
// const popupFormCardLink = popupAddCard.querySelector(".popup__form_card_link");
// const popupAddCard = document.querySelector(".popup__add-card");
