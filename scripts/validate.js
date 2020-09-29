/*-------------------------------Валидация форм средствами javaScript-------------------------------*/
//Функция показывает ошибку в поле ввода(input)
function showInputError(popupForm, popupInput, errorMessege, parametrs) {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.add(parametrs.inputErrorClass);
  errorElement.textContent = errorMessege;
  errorElement.classList.add(parametrs.errorClass);
}
//Функция скрывает ошибку в поле ввода(input)
function hideInputError(popupForm, popupInput, parametrs) {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.remove(parametrs.inputErrorClass);
  errorElement.classList.remove(parametrs.errorClass);
  errorElement.textContent = "";
}
//Функция проверяет массив полей ввода на предмет корректности введеных данных и в зависимости от этого вызывает функции показать или скрыть ошибку
function checkInputValidity(popupForm, popupInput, parametrs) {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, parametrs);
  } else {
    hideInputError(popupForm, popupInput, parametrs);
  }
}
//Функция устанавливает слушителя событий полю ввода, измиеняет состояние кнопки и вызывает функцию проверки введенных данных
function setEventListeners(popupForm, parametrs) {
  const inputList = Array.from(popupForm.querySelectorAll(parametrs.inputSelector));
  const inputSubmitButton = popupForm.querySelector(parametrs.submitButtonSelector);
  toggleButtonState(inputList, inputSubmitButton, parametrs);
  inputList.forEach(function (popupInput) {
    popupInput.addEventListener("input", function () {
      checkInputValidity(popupForm, popupInput, parametrs);
      toggleButtonState(inputList, inputSubmitButton, parametrs);
    });
  });
}
//Функция проверяет корректность полей ввода
function hasInvalidInput(inputList) {
  return inputList.some(function (popupInput) {
    return !popupInput.validity.valid;
  });
}
//Функция стилизации кнопок submit
function toggleButtonState(inputList, inputSubmitButton, params) {
  if (hasInvalidInput(inputList)) {
    inputSubmitButton.classList.add(params.inactiveButtonClass);
    inputSubmitButton.setAttribute("disabled", true);
  } else {
    inputSubmitButton.classList.remove(params.inactiveButtonClass);
    inputSubmitButton.removeAttribute("disabled");
  }
}
//Функция находит формы в документе и вызывает функцию слушателя событий
const enableValidation = (parametrs) => {
  const formList = Array.from(document.querySelectorAll(parametrs.formSelector));
  formList.forEach(function (popupForm) {
    popupForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    setEventListeners(popupForm, parametrs);
  });
}
//Вызов функции включения валидации (с объектом в аргументе)
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-input-error_active",
});