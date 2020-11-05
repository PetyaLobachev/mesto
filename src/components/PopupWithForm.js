import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, closeButtonSelector, submitForm }) {
    super(popupSelector, closeButtonSelector);
    this._submit = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._submit.reset();
  }
}
