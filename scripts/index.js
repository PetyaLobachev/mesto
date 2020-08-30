// Edit Button - кнопка вызова всплывающего окна
const profileEditButton = document.querySelector('.profile__edit-button')
//Popup - всплывающее окно
const popup = document.querySelector('.popup')
const popupCloseButton = popup.querySelector('.popup__close-button')


//Функция - для открывания popup
const popupToggle = function () {
  popup.classList.toggle('popup_opened')
}
//Подключаем слушатель для переменной profileEditButton (кнопка с классом .profile__edit-button)
profileEditButton.addEventListener('click', popupToggle)
//Подключаем слушатель для переменной popupCloseButton (кнопка с классом .popup__close-button)
popupCloseButton.addEventListener('click', popupToggle)





const popupForm = popup.querySelector('.popup__form')
const inputSubmitButton = popup.querySelector('.popup__submit-button')
const nameAuthor = popupForm.querySelector('.popup__form-name-author')
const aboutAuthor = popupForm.querySelector('.popup__form-about-author')
const profileTitle = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__about')

const formSubmitHandler = function (evt) {
  evt.preventDefault()
  profileTitle.textContent = nameAuthor.value 
  profileAbout.textContent = profileAbout.value 
}
  popupForm.addEventListener('submit', formSubmitHandler)
