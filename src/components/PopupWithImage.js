import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    super(popupSelector, closeButtonSelector);
    this._popupImage = document.querySelector(".popup__open-card-image");
    this._popupFigcaption = document.querySelector(
      ".popup__open-card-figcaption"
    );
  }
  open(cardsData) {
    super.open();
    this._popupImage.src = cardsData.link;
    this._popupFigcaption.textContent = cardsData.name;
  }
}
