import {openImageCardHandler} from './index.js'
class Card {
    constructor(card, cardSelector) {
      this._name = card.name;
      this._link = card.link;
      this._cardSelector = cardSelector;
      
    }
    _getTemplate() {
      const cardTemplate = document.querySelector(this._cardSelector).content;
      const cardElement = cardTemplate.cloneNode(true);
      return cardElement;
    }
    createCard() {
      this._cardElement = this._getTemplate();
      this._cardElement.querySelector('.card__image').src = this._link;
      this._cardElement.querySelector('.card__title').textContent = this._name;
      this._setEventListenersLikeButton()
      this._setEventListenersCardDelete()
      this._setEventListenersOpenPopupImage()
      return this._cardElement;
    }
    _setEventListenersLikeButton() {
      const likeButton = this._cardElement.querySelector('.card__like-button');
      likeButton.addEventListener('click', (event) => {
        event.target.classList.toggle('card__like-button_active');
      })
    }
    _setEventListenersCardDelete() {
      const cardDelete = this._cardElement.querySelector('.card__delete');
      cardDelete.addEventListener('click', (event) => {
        event.target.parentElement.remove();
      })
    }
    _setEventListenersOpenPopupImage() {
      const cardImage = this._cardElement.querySelector('.card__image')
      const cardTitle = this._cardElement.querySelector('.card__title')
      cardImage.addEventListener('click', () => {
        openImageCardHandler(cardImage, cardTitle)
      })
    }
  }
export {Card}