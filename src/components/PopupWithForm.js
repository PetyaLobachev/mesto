import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    closeButtonSelector,
    submitForm,
    submitButton,
  }) {
    super(popupSelector, closeButtonSelector, submitButton);
    this._submit = this._popupElement.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._submitButton = document.querySelector(submitButton);
    this._initialTextButton = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._popupElement.querySelectorAll('.popup__input')
    );
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading, downloadText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = downloadText;
    } else {
      this._submitButton.textContent = this._initialTextButton;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._submit.reset();
  }
}
