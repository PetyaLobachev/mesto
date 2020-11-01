import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  open(cardImage, cardTitle) {
    this.popupImage = document.querySelector(".popup__open-card-image");
    this.popupFigcaption = document.querySelector(
      ".popup__open-card-figcaption"
    );
    this.popupImage.src = cardImage.src;
    this.popupFigcaption.textContent = cardTitle.textContent;
    super.open();
  }
}
