import {Card} from './Card.js'

const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupForm = popup.querySelector(".popup__form");
const inputSubmitButton = popup.querySelector(".popup__submit-button");
const nameAuthor = popup.querySelector(".popup__form_author_name");
const aboutAuthor = popup.querySelector(".popup__form_author_about");
const profileTitle = document.querySelector(".profile__title");
const profileAboutAuthor = document.querySelector(".profile__about-author");
const popupAddCard = document.querySelector(".popup__add-card");
const cards = document.querySelector(".cards");
const popupFormAddCard = popupAddCard.querySelector(".popup__form_add-card");
const addButton = document.querySelector(".profile__add-button");
const popupTitleAddCard = popupAddCard.querySelector(".popup__title_add-card");
const popupFormCardName = popupAddCard.querySelector(".popup__form_card_name");
const popupFormCardLink = popupAddCard.querySelector(".popup__form_card_link");
const popupCloseBattonAddCard = popupAddCard.querySelector(".popup__close-button_add-card");
const popupSubmitButtonAddCard = popupAddCard.querySelector(".popup__submit-button_add-card");
const popupOpenCardImage = document.querySelector(".popup__open-card-image");
const popupOpenCardFigcaption = document.querySelector(".popup__open-card-figcaption");
const popupOpenCard = document.querySelector(".popup__open-card");
const popupCloseOpenCard = document.querySelector(".popup__close-button_open-card");
//Клавиши клавиатуры
const esc = 'Escape';
//Массив карточек, добавляется при загрузке страницы
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//Создан объект для создания новой карточки
const card = {
  name: popupFormCardName,
  link: popupFormCardLink,
};
//*-------------------------------Функции открытия и закрытия попапов-------------------------------*/
//Функция открытия попапов
function openPopup(evt) {
  evt.classList.add("popup_opened");
}
//Функция закрытия попапов
function closePopup(evt) {
  evt.classList.remove("popup_opened");
}
//Функция закрытия попапа по клику кнопки Escape
function closePopupOnEsc(event) {
  if (event.key === esc) {
    popupClosedHandler();
    popupClosedOpenCardHandler();
    popupClosedAddCardHandler();
  }
}
//Подключение слушателя к документу для активации действия кнопки Escape
document.addEventListener("keydown", closePopupOnEsc);

//Функция закрытия попапа по клику на область затеменения(overlay) вокруг попап-контейнера
function closePopapOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupClosedHandler();
  popupClosedOpenCardHandler();
  popupClosedAddCardHandler();
}
//Функция выбора всех попапов и подключения им слушателя функции закрытия попапов
function setEventListenersPopup() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach(function (popupItem) {
    popupItem.addEventListener("click", closePopapOnOverlay);
  });
}
//Вызов функции выбра всех попапов
setEventListenersPopup();

/*-------------------------------Редактирования профиля-------------------------------*/
//Функция обрабочик вывода данных через input в профиль автора
function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameAuthor.value;
  profileAboutAuthor.textContent = aboutAuthor.value;
  popupClosedHandler();
}
//Функция открывания popup редактирования профиля
function popupOpenedProfileHandler() {
  openPopup(popup);
  nameAuthor.value = profileTitle.textContent;
  aboutAuthor.value = profileAboutAuthor.textContent;
}
//Подключаем слушатель для переменной profileEditButton (кнопка с классом .profile__edit-button)
profileEditButton.addEventListener("click", popupOpenedProfileHandler);
//Функция закрытия попап редактирования профиля
function popupClosedHandler() {
  closePopup(popup);
}
//Подключаем слушатель для переменной popupCloseButton (кнопка с классом .popup__close-button)
popupCloseButton.addEventListener("click", popupClosedHandler);
//Подключение слушателя к форме (окно редактирования профиля)
popupForm.addEventListener("submit", formSubmitProfileHandler);

/*-------------------------------Добавление новой карточки-------------------------------*/
//Функция добавления новой карточки
function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  (card.name = popupFormCardName.value),
  (card.link = popupFormCardLink.value);
  addCard();
  openPopup(popupAddCard);
  resetForm();
  popupClosedAddCardHandler();
}
// Добавление новой карточки в начало страницы
function addCard() {
  const addNewCard = new Card(card, '.template')
  const newCard = addNewCard.createCard();
  cards.prepend(newCard);
}
// Сброс полей input-ов до начального состояния
function resetForm() {
  popupFormAddCard.reset();
}
//Подключение слушателя к форме
popupFormAddCard.addEventListener("submit", formSubmitHandlerAddCard);
//Обработчик закрытия попапа добавления карточки и фотографии
function popupClosedAddCardHandler() {
  closePopup(popupAddCard);
}
//Подключение слушателя к кнопке закрытия обработчика события
popupCloseBattonAddCard.addEventListener("click", popupClosedAddCardHandler);
//Обработчик открытия попапа добавления карточки
function popapOpenedAddCardHandler() {
  openPopup(popupAddCard);
}
// Подключение слушателя к кнопке (открытия профиля создания карточки)
addButton.addEventListener("click", popapOpenedAddCardHandler);

/*-------------------------------Открытие фотографии карточки в попапе-------------------------------*/
//Функция вывода фотографии в попап
function openImageCardHandler(cardImage, cardTitle) {
  popupOpenCardImage.src = cardImage.src;
  popupOpenCardFigcaption.textContent = cardTitle.textContent;
  openPopup(popupOpenCard);
}
//Подключение слушателя к кнопке (вывода фотографии в попап)
popupCloseOpenCard.addEventListener("click", popupClosedOpenCardHandler);
//Обработчик закрытия попапа фотографии
function popupClosedOpenCardHandler() {
  closePopup(popupOpenCard);
}

// function formSubmitHandlerAddCard(evt) {
//   evt.preventDefault();
//   (card.name = popupFormCardName.value),
//   (card.link = popupFormCardLink.value);
//   createCard(card);
//   addCard(card);
//   openPopup(popupAddCard);
//   resetForm();
//   popupClosedAddCardHandler();
// }
// // Добавление новой карточки в начало страницы
// function addCard(card) {
//   cards.prepend(createCard(card));
// }

/*-------------------------------Вывод карточек на экран-------------------------------*/
//Функция создания карточек
// function createCard(card) {
//   const cardTemplate = document.querySelector(".template").content;
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardTitle = cardElement.querySelector(".card__title");
//   const cardImage = cardElement.querySelector(".card__image");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const cardDelete = cardElement.querySelector(".card__delete");
//   cardTitle.textContent = card.name;
//   cardImage.src = card.link;
//   likeButton.addEventListener("click", function (evt) {
//     evt.target.classList.toggle("card__like-button_active");
//   });
//   cardDelete.addEventListener("click", function (event) {
//     event.target.parentElement.remove();
//   });
//   cardImage.addEventListener("click", () => {
//     openImageCardHandler(cardImage, cardTitle);
//   });
//   return cardElement;
// }
// // Перебор массива для вывода объектов массива на экран
// initialCards.forEach(renderCards);

// // Добавление карточек из массива в начало страницы
// function renderCards(card) {
//   cards.prepend(createCard(card));
// } 


// class Card {
//   constructor(card, cardSelector) {
//     this._name = card.name;
//     this._link = card.link;
//     this._cardSelector = cardSelector;
    
//   }
//   _getTemplate() {
//     const cardTemplate = document.querySelector(this._cardSelector).content;
//     const cardElement = cardTemplate.cloneNode(true);
//     return cardElement;
//   }
//   createCard() {
//     this._cardElement = this._getTemplate();
//     this._cardElement.querySelector('.card__image').src = this._link;
//     this._cardElement.querySelector('.card__title').textContent = this._name;
//     this._setEventListenersLikeButton()
//     this._setEventListenersCardDelete()
//     this._setEventListenersOpenPopupImage()
//     return this._cardElement;
//   }
//   _setEventListenersLikeButton() {
//     const likeButton = this._cardElement.querySelector('.card__like-button');
//     likeButton.addEventListener('click', (event) => {
//       event.target.classList.toggle('card__like-button_active');
//     })
//   }
//   _setEventListenersCardDelete() {
//     const cardDelete = this._cardElement.querySelector('.card__delete');
//     cardDelete.addEventListener('click', (event) => {
//       event.target.parentElement.remove();
//     })
//   }
//   _setEventListenersOpenPopupImage() {
//     const cardImage = this._cardElement.querySelector('.card__image')
//     const cardTitle = this._cardElement.querySelector('.card__title')
//     cardImage.addEventListener('click', () => {
//       openImageCardHandler(cardImage, cardTitle)
//     })
//   }
// }
// initialCards.forEach(function(card) {
//   const itemCard = new Card(card, '.template');
//   const cardElement = itemCard.createCard();
//   cards.append(cardElement)
// })

initialCards.forEach(function(card) {
  const itemCard = new Card(card, '.template');
  const cardElement = itemCard.createCard();
  cards.append(cardElement)
})

export {openImageCardHandler}