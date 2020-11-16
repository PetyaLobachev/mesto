import { Popup } from './Popup.js';
export class PopupConfirmDeleteCard extends Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    super(popupSelector, closeButtonSelector);
    this._submit = this._popupElement.querySelector('.popup__form-delete-card');
  }
  setSubmitCallback(callback) {
    this._handleSubmitForm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm();
    });
  }
}
