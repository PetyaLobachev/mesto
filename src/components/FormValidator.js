/*-------------------------------Валидация форм средствами javaScript-------------------------------*/
//Класс Валидации форм
export class FormValidator {
  constructor(parametrs, formSelector) {
    this._formElement = document.querySelector(formSelector);
    this._formSelector = formSelector;
    this._inputSelector = parametrs.inputSelector;
    this._submitButtonSelector = parametrs.submitButtonSelector;
    this._inactiveButtonClass = parametrs.inactiveButtonClass;
    this._inputErrorClass = parametrs.inputErrorClass;
    this._errorClass = parametrs.errorClass;
    this._inputSubmitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  //Приватный метод показывает ошибку в поле ввода(input)
  _showInputError(popupInput, errorMessege) {
    const errorElement = this._formElement.querySelector(
      `#${popupInput.id}-error`
    );
    popupInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessege;
    errorElement.classList.add(this._errorClass);
  }
  //Приватный метод скрывает ошибку в поле ввода(input)
  _hideInputError(popupInput) {
    const errorElement = this._formElement.querySelector(
      `#${popupInput.id}-error`
    );
    popupInput.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  //Приватный метод проверяет массив полей ввода на предмет корректности введеных данных и
  // в зависимости от этого вызывает методы показать или скрыть ошибку
  _checkInputValidity(popupInput) {
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  }
  //Приватный метод проверяет корректность полей ввода для кнопки submit
  _hasInvalidInput(inputList) {
    return inputList.some(function (popupInput) {
      return !popupInput.validity.valid;
    });
  }
  //Приватный метод стилизации кнопок submit
  _toggleButtonState(inputList, inputSubmitButton) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledSubmitButton();
    } else {
      inputSubmitButton.classList.remove(this._inactiveButtonClass);
      inputSubmitButton.removeAttribute('disabled');
    }
  }
  //Приватный метод отключения кнопки
  _disabledSubmitButton() {
    const inputSubmitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    inputSubmitButton.classList.add(this._inactiveButtonClass);
    inputSubmitButton.setAttribute('disabled', true);
  }
  //Приватный метод проходит по массиву input^ов => устанавливает слушителя событий полю ввода,
  // в функции колбека вызывает методы
  // 1. _checkInputValidity - проверки валиднойсти input^ов,
  // 2. _toggleButtonState - переключение состояния кнопки.
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(inputList, this._inputSubmitButton);
    inputList.forEach((popupInput) => {
      popupInput.addEventListener('input', () => {
        this._checkInputValidity(popupInput);
        this._toggleButtonState(inputList, this._inputSubmitButton);
      });
    });
    this._formElement.addEventListener('submit', () =>
      this._disabledSubmitButton()
    );
  }
  //Публичный метод включения валидации формы
  enableValidation() {
    function submitFormHandler(event) {
      event.preventDefault();
    }
    this._formElement.addEventListener('submit', submitFormHandler);
    this._setEventListeners();
  }
}
