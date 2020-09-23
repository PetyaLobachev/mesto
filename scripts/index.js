
const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupForm = popup.querySelector(".popup__form");
const inputSubmitButton = popup.querySelector(".popup__submit-button");
const nameAuthor = popup.querySelector(".popup__form_author_name");
const aboutAuthor = popup.querySelector(".popup__form_author_about");
const profileTitle = document.querySelector(".profile__title");
const profileAboutAuthor = document.querySelector(".profile__about-author");

//Функция - для открывания popup (всплывающее окно)
function popupOpened() {
  popup.classList.add("popup_opened");
  nameAuthor.value = profileTitle.textContent;
  aboutAuthor.value = profileAboutAuthor.textContent;
}
function popupClosed() {
  popup.classList.remove("popup_opened");
}
//Функция вывода данных через input в профиль автора
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameAuthor.value;
  profileAboutAuthor.textContent = aboutAuthor.value;
  popupClosed();
}
//Подключаем слушатель для переменной profileEditButton (кнопка с классом .profile__edit-button)
profileEditButton.addEventListener("click", popupOpened);
//Подключаем слушатель для переменной popupCloseButton (кнопка с классом .popup__close-button)
popupCloseButton.addEventListener("click", popupClosed);
//Подключаем слушатель для переменной popupForm (со значаниями: отправить(submit), и функцией вывода данных: formSubmitHandler)
popupForm.addEventListener("submit", formSubmitHandler);

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
const cardTemplate = document.querySelector(".template").content;
// Функция открытия модального окна фотографии
addButton.addEventListener("click", function popupOpenedAddCard() {
  popupAddCard.classList.add("popup_opened");
});
popupCloseBattonAddCard.addEventListener("click", popupClosedAddCard);
//Функция закрытия молдальных окон добавлениея карточки и фотографии
function popupClosedAddCard() {
  popupAddCard.classList.remove("popup_opened");
};
// Создан объект для получения значений  из попап input-ов и для создания новой карточки
const card = {
  name: popupFormCardName,
  link: popupFormCardLink
}
// Функция добавления новой карточки
function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  card.name = popupFormCardName.value,
  card.link = popupFormCardLink.value
  renderCard(card);
  popupFormCardLink.value = "";
  popupFormCardName.value = "";
  popupClosedAddCard();
}
popupFormAddCard.addEventListener("submit", formSubmitHandlerAddCard);

//Функция вывода фотографии в модальное окно
function openImageCard(cardImage, cardTitle) {
  popupOpenCard.classList.add("popup_opened");
  popupOpenCardImage.src = cardImage.src;
  popupOpenCardFigcaption.textContent = cardTitle.textContent;
  popupCloseOpenCard.addEventListener("click", popupClosedOpenCard);
  popupClosedAddCard();
}
//Функция закрытия моджального окна фотографии
function popupClosedOpenCard() {
popupOpenCard.classList.remove("popup_opened");
}
popupCloseOpenCard.addEventListener("click", popupClosedOpenCard);
//Функция вывода карточки на экран (из массива и добавление новой карточки)
function renderCard(card) {
  const cardTemplate = document.querySelector(".template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete");
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardDelete.addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
  cardImage.addEventListener("click",() => {
    openImageCard(cardImage, cardTitle)
  });
  cards.prepend(cardElement);
}
// Перебор массива для вывода объектов массива на экран
initialCards.forEach(renderCard);