import { esc } from "../pages/index.js";

export class Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButtonSelector = document.querySelector(closeButtonSelector);
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", (event) => {
      this._closePopupOnEsc(event);
    });
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", (event) => {
      this._closePopupOnEsc(event);
    });
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

  setEventListenersPopup() {
    this._closeButtonSelector.addEventListener("click", () => {
      this.close();
    });
    const popupList = Array.from(document.querySelectorAll(".popup"));
    popupList.forEach((popupItem) => {
      popupItem.addEventListener("click", (event) => {
        this._closePopupOnOverlay(event);
      });
    });
  }
}
