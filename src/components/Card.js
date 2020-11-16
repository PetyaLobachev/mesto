export class Card {
  constructor(
    ownerId,
    cardsData,
    setLike,
    deleteLike,
    handleCardClick,
    handleDeleteCard,
    cardSelector
  ) {
    this._ownerId = ownerId;
    this._cardsData = cardsData;
    this._cardsDataid = cardsData._id;
    this._dataId = cardsData.owner._id;
    this._likes = cardsData.likes;
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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

    this._deleteButton = this._cardElement.querySelector('.card__delete');
    if (this._dataId === this._ownerId) {
      this._deleteButton.classList.add('card__delete_visible');
    }
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._photoLikeCount = this._cardElement.querySelector('.card__like-count');
    this._cardElement.querySelector('.card').id = this._cardsDataid;

    this._setEventListenersLikeButton();
    this._setEventListenersOpenPopupImage();
    this._setEventListenersOpenPopupDeleteCard();

    this.setLikeCount();
    this.delLikeCount();
    this._checkLikedState();

    return this._cardElement;
  }

  _dislike(data) {
    this._removeLikedClass();
    this._deleteLike(data);
  }

  _like(data) {
    this._addLikedClass();
    this._setLike(data);
  }

  _removeLikedClass() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  _addLikedClass() {
    this._likeButton.classList.add('card__like-button_active');
  }

  setLikeCount() {
    this._photoLikeCount.textContent = this._likes.length += 1;
  }

  delLikeCount() {
    this._photoLikeCount.textContent = this._likes.length -= 1;
  }

  _checkLikedState() {
    this._likes.forEach((ownerLikes) => {
      if (ownerLikes._id === this._ownerId) {
        this._addLikedClass();
      }
    });
  }

  _setEventListenersLikeButton() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-button_active')) {
        this._dislike(this._cardsData);
      } else {
        this._like(this._cardsData);
      }
    });
  }

  _setEventListenersOpenPopupDeleteCard() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardsData);
    });
  }

  _setEventListenersOpenPopupImage() {
    const cardImage = this._cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardsData);
    });
  }
}
