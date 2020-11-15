export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addButton = document.querySelector(".profile__add-button");
export const name = document.querySelector(".popup__form_author_name");
export const about = document.querySelector(".popup__form_author_about");
export const editButtonAvatar = document.querySelector(".profile__edit-avatar");

//Клавиши клавиатуры
export const esc = "Escape";

//Объект с классами селекторов для валидации форм
export const parametrs = {
  formSelectorEditAvatar: ".popup__update-avatar",
  formSelectorAddCard: ".popup__form_add-card",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-input-error_active",
};
