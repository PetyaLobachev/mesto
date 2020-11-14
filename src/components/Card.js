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
    this._cardsData = cardsData;
    this._cardsDataid = cardsData._id;
    this._ownerId = ownerId;
    this._dataId = cardsData.owner._id;
    this._likes = cardsData.likes;
    this._name = cardsData.name;
    this._link = cardsData.link;
    (this._setLike = setLike),
      (this._deleteLike = deleteLike),
      (this._cardSelector = cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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

    this._deleteButton = this._cardElement.querySelector(".card__delete");
    if (this._dataId === this._ownerId) {
      this._deleteButton.classList.add("card__delete_visible");
    }
    this._likeButton = this._cardElement.querySelector(".card__like-button");
  
    this._photoLikeCount = this._cardElement.querySelector(".card__like-count");
  
    this._cardElement.querySelector(".card").id = this._cardsDataid;
    
    this._setEventListenersLikeButton();
    this._setEventListenersOpenPopupImage();
    this._setEventListenersOpenPopupDeleteCard();

    //this.setLikeCount(this._cardsData);
    //this._checkLikedState();
    //this._checkIsOwnCard();
    
    return this._cardElement;
  }

  // removeCard() {
  //   document.getElementById(".card").remove();
  // }

  // _deleteElem(elem) {

  //   elem = null;
  // }

  // removeCard() {
  //   document.getElementById(".card").remove
  //   // elem = null;
  // }

  _dislike(data) {
    this._removeLikedClass();
    this._deleteLike(data);
  }

  _like(data) {
    this._addLikedClass();
    this._setLike(data);
  }

  _removeLikedClass() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  _addLikedClass() {
    this._likeButton.classList.add("card__like-button_active");
  }

  setLikeCount(cardsData) {
    this._photoLikeCount.textContent = String(cardsData.likes.length);
  }

  _checkIsOwnCard() {
    if (this._dataId !== this._ownerId) {
      this._deleteElem(this._deleteButton);
    }
  }

  _checkLikedState() {
    this._likes.forEach((ownerLikes) => {
      if (ownerLikes._id === this._ownerId) {
        this._addLikedClass();
      }
    });
  }
  // isLiked() {
  //   if (this._likes.some((like) => {
  //     like._id === this._dataId})) {
  //     this._cardElement
  //       .querySelector(".card__like-button")
  //       .classList.add("card__like-button_active");
  //   }
  // }

  // _handleLike() {
  //   if (event.target.classList.contains("card__like-button_active")) {
  //     event.target.classList.remove("card__like-button_active");
  //     likeContainer.textContent = this._likes.length -= 1;
  //     this._deleteLike(this._cardsDataid);
  //   } else {
  //     event.target.classList.add("card__like-button_active");
  //     likeContainer.textContent = this._likes.length += 1;
  //     this._setLike(this._cardsDataid);
  //   }
  // }

  _setEventListenersLikeButton() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like-button_active")) {
        this._dislike(this._data);
      } else {
        this._like(this._data);
      }
    });
  }

  // _setEventListenersLikeButton() {
  //     const likeButton = this._cardElement.querySelector(".card__like-button");
  //     likeButton.addEventListener("click", (event) => {
  //         if (event.target.classList.contains("card__like-button_active")) {
  //           event.target.classList.remove("card__like-button_active");
  //           this._likeContainer.textContent = this._likes.length -= 1;
  //           this._deleteLike(this._cardsDataid);
  //         } else {
  //           event.target.classList.add("card__like-button_active");
  //           this._likeContainer.textContent = this._likes.length += 1;
  //           this._setLike(this._cardsDataid);
  //         }

  //       })
  //     }
  _setEventListenersOpenPopupDeleteCard() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._cardsData);
    });
  }

  _setEventListenersOpenPopupImage() {
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardsData);
    });
  }

  // _checkIsOwnCard() {
  //   if (this._dataId !== this._ownerId ) {
  //     this._deleteElem(this._deleteButton);
  //   }
  // }

  // _checkLikedState() {
  //   this._likes.forEach((ownerLikes) => {
  //     if (ownerLikes._id === this._ownerId) {
  //       this._addLikedClass();
  //     }
  //   });
  // }

  // _addLikedClass() {
  //   this._likeButton.classList.add(this._settings.photoLikedButtonClass);
  // }
  // _removeLikedClass() {
  //   this._likeButton.classList.remove(this._settings.photoLikedButtonClass);
  // }

  // _dislike(data) {
  //   this._removeLikedClass();
  //   this._deleteLike(data);
  // }

  // _like(data) {
  //   this._addLikedClass();
  //   this._setLike(data);
  // }

  // _setEventListenersLikeButton() {
  //   this._likeButton = this._cardElement.querySelector(".card__like-button");
  //   this._likeButton.addEventListener("click", (event) => {
  //     if(event.target.classList.add("card__like-button_active")) {
  //       this._dislike(this._data);
  //     } else { this._like(this._data);}
  //     })

  //   }
  // }

  //   removeCard (event) {
  //   event.target.parentElement.remove();
  // }

  //   // _removeCard(elem) {
  //   //   elem.remove();
  //   //   elem = null;
  //   // }

  //   // deleteCardElem() {
  //   //   this._removeCard(this._cardElement)
  //   // }

  // removeCard () {
  //   this._handleDeleteCard(this._cardsData)
  //     .then(()=> {
  //       this.deleteCard(this._cardsData)})
  // }

  //    deleteCard (event) {
  //   event.target.parentElement.remove();
  // }

  //   removeCard () {
  //       this._handleDeleteCard(this._cardsDataid)
  //       .then(()=> {
  //         this._deleteCard(this._cardsDataid)});

  //   }

  // //   deleteCard (evt) {
  // //     evt.target.closest(".card").remove();
  // // }
  //      _deleteCard (evt) {
  //       if (this._dataId === this._ownerId)
  //        {
  //       evt.target.closest(".card").remove();
  //     }
  //   }

  // removeCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  //     }

  // event.target.parentElement.remove();
  // _setEventListenersLikeButton() {
  //   const likeButton = this._cardElement.querySelector(".card__like-button");
  //   likeButton.addEventListener("click", (event) => {
  //     event.target.classList.toggle("card__like-button_active");
  //   });
  // }
}

//  likeCard() {

//  }

// _setEventListenersLikeButton() {
//   const likeButton = this._cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", (event) => {
//     event.target.classList.toggle("card__like-button_active");
//   });
// }

// export class Card {
//   constructor(cardName, cardLink, handleCardClick, cardSelector) {
//     this._name = cardName;
//     this._link = cardLink;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//   }
//   //Приватный метод получения элементов Template-контейнера
//   _getTemplate() {
//     const cardTemplate = document.querySelector(this._cardSelector).content;
//     const cardElement = cardTemplate.cloneNode(true);
//     return cardElement;
//   }
//   //Публичный метод создания карточки
//   createCard() {
//     this._cardElement = this._getTemplate();
//     this._cardElement.querySelector(".card__image").src = this._link;
//     this._cardElement.querySelector(".card__title").textContent = this._name;
//     this._setEventListenersLikeButton();
//     this._setEventListenersCardDelete();
//     this._setEventListenersOpenPopupImage();
//     return this._cardElement;
//   }
//   //Приватный метод подключения слушателя к кнопке Like
//   _setEventListenersLikeButton() {
//     const likeButton = this._cardElement.querySelector(".card__like-button");
//     likeButton.addEventListener("click", (event) => {
//       event.target.classList.toggle("card__like-button_active");
//     });
//   }
//Приватный метод подключения слушателя к кнопке удаления карточки
// _setEventListenersCardDelete() {
//   const cardDelete = this._cardElement.querySelector(".card__delete");
//   cardDelete.addEventListener("click", (event) => {
//     event.target.parentElement.remove();
//   });
// }
//   //Приватный метод подключения слушателя для открытия картинки в popup
//   _setEventListenersOpenPopupImage() {
//     const cardImage = this._cardElement.querySelector(".card__image");
//     const cardTitle = this._cardElement.querySelector(".card__title");
//     cardImage.addEventListener("click", () => {
//       this._handleCardClick(cardImage, cardTitle);
//     });
//   }
// }

// export class Card {
//   constructor(
//     ownerId,
//     cardsData,
//     setLike,
//     deleteLike,
//     handleCardClick,
//     handleDeleteCard,
//     cardSelector,
//   ) {
//     this._cardsData = cardsData;
//     this._cardsDataid = cardsData._id;
//     this._ownerId = ownerId;
//     this._dataId = cardsData.owner._id;
//     this._likes = cardsData.likes;
//     this._name = cardsData.name;
//     this._link = cardsData.link;
//     this._setLike = setLike,
//     this._deleteLike = deleteLike,
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleDeleteCard = handleDeleteCard;

//   }
//   //Приватный метод получения элементов Template-контейнера
//   _getTemplate() {
//     const cardTemplate = document.querySelector(this._cardSelector).content;
//     const cardElement = cardTemplate.cloneNode(true);
//     return cardElement;
//   }
//   //Публичный метод создания карточки
//   createCard() {
//     this._cardElement = this._getTemplate();
//     this._cardElement.querySelector(".card__image").src = this._link;
//     this._cardElement.querySelector(".card__title").textContent = this._name;

//     this._deleteButton = this._cardElement.querySelector(".card__delete");
//     if (this._dataId === this._ownerId) {
//       this._element.classList.add("card__delete_visible");
//     }
//     this.isLiked()
//     this._likeContainer = this._cardElement.querySelector(".card__like-container");
//     this._likeContainer.textContent = this._likes.length;
//     //document.querySelector('.card') = this._cardsDataid
//     //this._setEventListenersLikeButton();

//     this._setEventListenersLikeButton()
//     this._setEventListenersOpenPopupImage();
//     this._setEventListenersOpenPopupDeleteCard();

//     this._checkIsOwnCard()
//     return this._cardElement;
//   }

//   isLiked() {
//     if (this._likes.some((like) => {
//       like._id === this._dataId})) {
//       this._cardElement
//         .querySelector(".card__like-button")
//         .classList.add("card__like-button_active");
//     }
//   }

//   // _handleLike() {
//   //   if (event.target.classList.contains("card__like-button_active")) {
//   //     event.target.classList.remove("card__like-button_active");
//   //     likeContainer.textContent = this._likes.length -= 1;
//   //     this._deleteLike(this._cardsDataid);
//   //   } else {
//   //     event.target.classList.add("card__like-button_active");
//   //     likeContainer.textContent = this._likes.length += 1;
//   //     this._setLike(this._cardsDataid);
//   //   }
//   // }

//   removeCard() {
//     this._deleteElem(this._cardElement);
//   }

//   _deleteElem(elem) {
//     elem.remove();
//     elem = null;
//   }

// _setEventListenersLikeButton() {
//     const likeButton = this._cardElement.querySelector(".card__like-button");
//     likeButton.addEventListener("click", (event) => {
//         if (event.target.classList.contains("card__like-button_active")) {
//           event.target.classList.remove("card__like-button_active");
//           this._likeContainer.textContent = this._likes.length -= 1;
//           this._deleteLike(this._cardsDataid);
//         } else {
//           event.target.classList.add("card__like-button_active");
//           this._likeContainer.textContent = this._likes.length += 1;
//           this._setLike(this._cardsDataid);
//         }

//       })
//     }
//     _setEventListenersOpenPopupDeleteCard() {
//       this._element.addEventListener("click", () => {
//         this._handleDeleteCard(this._cardsData);
//       });
//     }

//     _setEventListenersOpenPopupImage() {
//       const cardImage = this._cardElement.querySelector(".card__image");
//       cardImage.addEventListener("click", () => {
//         this._handleCardClick(this._cardsData);
//       });
//     }
