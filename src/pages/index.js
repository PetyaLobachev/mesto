import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
export const nameAuthor = popup.querySelector(".popup__form_author_name");
export const aboutAuthor = popup.querySelector(".popup__form_author_about");
const container = document.querySelector(".cards")
const profileAboutAuthor = document.querySelector(".profile__about-author")
const profileTitle = document.querySelector(".profile__title")
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
//Функция вывода карточек на экран
const renderArrayCards = new Section(
  {
    data: initialCards,
    renderer,
  },
  ".cards"
);
//Функция обработчик клика по карточке
const handleCardClick = (cardImage, cardTitle) => {
  popupWithImage.open(cardImage, cardTitle);
};
//Функция создания карточек из класса Card
function renderer (card)  {
  const itemCard = new Card( card.cardName, card.cardLink, handleCardClick , ".template");
  const cardElement = itemCard.createCard();
  renderArrayCards.addItemsOnContainer(cardElement);
}
renderArrayCards.renderItems();

//Инициализация класса добавления новой карточки в разметку
const popupWithFormAddNewCard = new PopupWithForm({
  popupSelector: ".popup__add-card",
  closeButtonSelector: ".popup__close-button_add-card",
   submitForm: (newCard) => {
    const itemCard = new Card( newCard["cardName"], newCard["cardLink"],handleCardClick , ".template");
    const cardElement = itemCard.createCard();
    container.prepend(cardElement);
  }
});

addButton.addEventListener("click", function () {
  popupWithFormAddNewCard.open(); 
});
popupWithFormAddNewCard.setEventListeners();
//--------------------------------------------------// 

//--------------------------------------------------// 
//Инициализация класса  для открытия и закрытия popup фотографии карточки
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup__open-card",
  closeButtonSelector: ".popup__close-button_open-card",
});
popupWithImage.setEventListeners();
//--------------------------------------------------// 

//--------------------------------------------------// 
//Инициализация класса с информацией об авторе 
const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileAboutAuthor: ".profile__about-author",
});
//Инициализация классов добавления информации об авторе на страницу 
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup",
  closeButtonSelector: ".popup__close-button",
  submitForm: () => {
    userInfo.setUserInfo({ nameAuthor, aboutAuthor });
    popupWithFormEditProfile.close();
  },
});

profileEditButton.addEventListener("click", function () {
  popupWithFormEditProfile.open();
  nameAuthor.value = profileTitle.textContent;
  aboutAuthor.value = profileAboutAuthor.textContent;
  userInfo.getUserInfo();
});

popupWithFormEditProfile.setEventListeners();
//--------------------------------------------------// 

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
