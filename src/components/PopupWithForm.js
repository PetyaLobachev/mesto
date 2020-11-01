import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, hundleSubmitForm }) {
    super(popupSelector);
    this._hundleSubmitForm = hundleSubmitForm;
    this._form = document.querySelector(formSelector);
  }
  close() {
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListenersPopup() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._hundleSubmitForm(inputValues);
      this.close();
    });
  }
}
