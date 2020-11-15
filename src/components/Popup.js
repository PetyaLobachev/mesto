import { esc } from "../utils/Constants.js";

export class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement = document.querySelector(closeButtonSelector);
    this._closePopupOnEsc = this._closePopupOnEsc.bind(this);
    this._closePopupOnOverlay = this._closePopupOnOverlay.bind(this);
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupOnEsc);
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupOnEsc);
  }

  _closePopupOnEsc(event) {
    if (event.key === esc) {
      this.close();
    }
  }

  _closePopupOnOverlay(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.close();
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", this._closePopupOnOverlay);
  }
}
