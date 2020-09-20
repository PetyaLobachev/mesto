//profileEditButton - кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
//popup - всплывающее окно
const popup = document.querySelector(".popup");
//popupCloseButton - кнопка закрытия редактирования профиля
const popupCloseButton = popup.querySelector(".popup__close-button");
// Создание одноименных переменных для классов элементов
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

const popupOpenCard = document.querySelector(".popup__open-card");
const popupOpenCardImage = popupOpenCard.querySelector(".popup__open-card-image");
const popupOpenCardFigcaption = popupOpenCard.querySelector(".popup__open-card-figcaption");
const popupCloseOpenCard = popupOpenCard.querySelector(".popup__close-button_open-card");


addButton.addEventListener("click", function popupOpenedAddCard() {
  popupAddCard.classList.add("popup_opened");
});

popupCloseBattonAddCard.addEventListener("click", popupClosedAddCard);

function popupClosedAddCard() {
  popupAddCard.classList.remove("popup_opened");
}

function formSubmitHandlerAddCard() {
  evt.preventDefault();
  cardTitle.textContent = popupFormCardName.value;
  cardImage.src = popupFormCardLink.value;
  popupFormCardLink.value = "";
  popupFormCardName.value = "";
  cards.prepend(cardElement);

  popupClosedAddCard();
}
popupFormAddCard.addEventListener("submit", formSubmitHandlerAddCard);

function openImageCard() {
  popupOpenCard.classList.add("popup_opened");
  popupOpenCardImage.src = cardImage.src;
  popupOpenCardFigcaption.textContent = cardTitle.textContent;
  popupClosedAddCard();
}

function popupClosedOpenCard() {
  popupOpenCard.classList.remove("popup_opened");
}
popupCloseOpenCard.addEventListener("click", popupClosedOpenCard);

function renderCard(card) {
  const cardTemplate = document.querySelector(".template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete");
  const cardContainer = cardElement.querySelector(".card");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardDelete.addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
  cards.prepend(cardElement);

  cardImage.addEventListener("click", openImageCard);
}

initialCards.forEach(renderCard);

function popupClosedOpenCard() {
  popupOpenCard.classList.remove("popup_opened");
}

popupCloseOpenCard.addEventListener("click", popupClosedOpenCard);
