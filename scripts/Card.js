import { openImageCardHandler } from "./index.js";
//Класс создания карточки
class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this.openImageCardHandler = openImageCardHandler;
  }
  //Приватный метод получения элементов Template-контейнера
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }
  //Публичный метод создания карточки
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListenersLikeButton();
    this._setEventListenersCardDelete();
    this._setEventListenersOpenPopupImage();
    return this._cardElement;
  }
  //Приватный метод подключения слушателя к кнопке Like
  _setEventListenersLikeButton() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", (event) => {
      event.target.classList.toggle("card__like-button_active");
    });
  }
  //Приватный метод подключения слушателя к кнопке удаления карточки
  _setEventListenersCardDelete() {
    const cardDelete = this._cardElement.querySelector(".card__delete");
    cardDelete.addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });
  }
  //Приватный метод подключения слушателя для открытия картинки в popup
  _setEventListenersOpenPopupImage() {
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.addEventListener("click", () => {
      this.openImageCardHandler(cardImage, cardTitle);
    });
  }
}

export { Card };
