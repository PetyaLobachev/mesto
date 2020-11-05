import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    super(popupSelector, closeButtonSelector);
    this._popupImage = document.querySelector(".popup__open-card-image");
    this._popupFigcaption = document.querySelector(
      ".popup__open-card-figcaption"
    );
  }
  open(cardImage, cardTitle) {
    super.open();
    this._popupImage.src = cardImage.src;
    this._popupFigcaption.textContent = cardTitle.textContent;
  }
}
