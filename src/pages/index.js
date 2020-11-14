import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirmDeleteCard } from "../components/PopupConfirmDeleteCard.js";
import { Api } from "../components/Api.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const name = document.querySelector(".popup__form_author_name");
const about = document.querySelector(".popup__form_author_about");
//const deleteCardButton = document.querySelector('.card__delete')
const editButtonAvatar = document.querySelector(".profile__edit-avatar");

//--------------------------------------------------//
//Клавиши клавиатуры
export const esc = "Escape";
//--------------------------------------------------//

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

//const initialCards = []

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileAboutAuthor: ".profile__about-author",
  avatarAuthor: ".profile__image-author",
});

//Функция обработчик клика по карточке
let ownerId = "";

const popupWithFormDeleteCard = new PopupConfirmDeleteCard({
  popupSelector: ".popup__delete-card",
  closeButtonSelector: ".popup__close-button-delete-card",
});
popupWithFormDeleteCard.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "fa53dc10-0bed-404e-84a8-68518d7f0629",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    const userData = data;
    userInfo.setUserInfo(userData);
    ownerId = userData._id;
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((data) => {
    const cardsData = data;
    renderArrayCards.renderItems(cardsData);
  })
  .catch((err) => {
    // console.log(err);
  });

//--------------------------------------------------//
//Инициализация класса  для открытия и закрытия popup фотографии карточки
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup__open-card",
  closeButtonSelector: ".popup__close-button_open-card",
});
popupWithImage.setEventListeners();

const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: ".popup__update-avatar",
  closeButtonSelector: ".popup__close-button_edit-avatar",
  submitForm: (data) => {
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

editButtonAvatar.addEventListener("click", () => {
  popupWithFormEditAvatar.open();
});

popupWithFormEditAvatar.setEventListeners();

// api.putLikeCard(data)
// .feth((data) => {

// })
// .catch((err) =>{
//   console.log(err)
// })

// api.deleteLikeCard(data)
// .feth((data) => {

// })
// .catch((err) =>{
//   console.log(err)
// })

// const popupWithFormDeleteCard = new PopupWithForm({
//   popupSelector: ".popup__delete-card",
//   closeButtonSelector: ".popup__close-button",
//   submitForm: (data) => {
//     // api
//     //   .editDataProfile(data)
//     //   .then((data) => {
//     //     const setDataProfile = data;
//     //     userInfo.setUserInfo(setDataProfile);
//     //     popupWithFormEditProfile.close();
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });

//   },
// });

// deleteCardButton.addEventListener("click", () => {
//   popupWithFormDeleteCard.open();
// });

// popupWithFormDeleteCard.setEventListeners();

//Функция вывода карточек на экран

//Инициализация класса добавления новой карточки в разметку

//--------------------------------------------------//
//Инициализация класса с информацией об авторе
// const userInfo = new UserInfo({
//   profileTitle: ".profile__title",
//   profileAboutAuthor: ".profile__about-author",
// });
//Инициализация класса добавления информации об авторе на страницу
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup",
  closeButtonSelector: ".popup__close-button",
  submitForm: (data) => {
    api
      .editDataProfile(data)
      .then((data) => {
        const setDataProfile = data;
        userInfo.setUserInfo(setDataProfile);
        popupWithFormEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupWithFormAddNewCard = new PopupWithForm({
  popupSelector: ".popup__add-card",
  closeButtonSelector: ".popup__close-button_add-card",
  submitForm: (data) => {
    api
      .addNewCard(data)
      .then((res) => {
        handleRenderCard(res);
        popupWithFormAddNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

addButton.addEventListener("click", () => {
  popupWithFormAddNewCard.open();
});
popupWithFormAddNewCard.setEventListeners();

const handleRenderCard = (card) => {
  const itemCard = new Card(
    ownerId,
    card,
    setLike,
    deleteLike,
    handleCardClick,
    handleDeleteCard,
    ".template"
  );
  const cardElement = itemCard.createCard();
  renderArrayCards.addItemsOnContainer(cardElement);

  function handleCardClick(data) {
    popupWithImage.open(data);
  }

  function handleDeleteCard(dataId) {
    popupWithFormDeleteCard.open();
    popupWithFormDeleteCard.setSubmitCallback(() => {
      api
        .deleteCard(dataId._id)
        .then(() => {
          document.getElementById(dataId._id).remove();
          popupWithFormDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function setLike(dataId) {
    api
      .putLikeCard(dataId)
      .then(() => {
        //console.log("liked");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteLike(dataId) {
    api
      .deleteLikeCard(dataId)
      .then(() => {
        //console.log("disliked");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
};

const renderArrayCards = new Section(
  {
    handleRenderCard,
  },
  ".cards"
);

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  name.value = userData.name;
  about.value = userData.about;
  popupWithFormEditProfile.open();
});

popupWithFormEditProfile.setEventListeners();

//--------------------------------------------------//
//Инициализация класса для валидации формы EditProfile
const formValidatorEditProfile = new FormValidator(
  parametrs,
  parametrs.formSelector
);
formValidatorEditProfile.enableValidation();

//Инициализация класса для валидации формы AddCard
const formValidatorAddCard = new FormValidator(
  parametrs,
  parametrs.formSelectorAddCard
);
formValidatorAddCard.enableValidation();

const formValidatorEditAvatar = new FormValidator(
  parametrs,
  parametrs.formSelectorEditAvatar
);
formValidatorEditAvatar.enableValidation();

// const popupWithFormAddNewCard = new PopupWithForm({
//   popupSelector: ".popup__add-card",
//   closeButtonSelector: ".popup__close-button_add-card",
//   submitForm: (data) => {
//     api
//       .addNewCard(data)
//       .then((res) => {
//         const newCard = res;
//         const itemCard = new Card(
//           ownerId,
//           newCard,
//           handleCardClick,
//           handleDeleteCard,
//           ".template"
//         );
//         const cardElement = itemCard.createCard();
//         renderArrayCards.addNewCardOnContainer(cardElement);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
// });

// import "../pages/index.css";
// import { Card } from "../components/Card.js";
// import { FormValidator } from "../components/FormValidator.js";
// import { Section } from "../components/Section.js";
// import { PopupWithImage } from "../components/PopupWithImage.js";
// import { UserInfo } from "../components/UserInfo.js";
// import { PopupWithForm } from "../components/PopupWithForm.js";
// import { PopupConfirmDeleteCard } from "../components/PopupConfirmDeleteCard.js";
// import { Api } from "../components/Api.js";

// const profileEditButton = document.querySelector(".profile__edit-button");
// const addButton = document.querySelector(".profile__add-button");
// const name = document.querySelector(".popup__form_author_name");
// const about = document.querySelector(".popup__form_author_about");
// //const deleteCardButton = document.querySelector('.card__delete')
// const editButtonAvatar = document.querySelector(".profile__edit-avatar");

// //--------------------------------------------------//
// //Клавиши клавиатуры
// export const esc = "Escape";
// //--------------------------------------------------//

// // //Массив карточек, добавляется при загрузке страницы
// // const initialCards = [
// //   {
// //     cardName: "Архыз",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
// //   },
// //   {
// //     cardName: "Челябинская область",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
// //   },
// //   {
// //     cardName: "Иваново",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
// //   },
// //   {
// //     cardName: "Камчатка",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
// //   },
// //   {
// //     cardName: "Холмогорский район",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
// //   },
// //   {
// //     cardName: "Байкал",
// //     cardLink:
// //       "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
// //   },
// // ];

// //Объект с классами селекторов для валидации форм
// export const parametrs = {
//   formSelectorEditAvatar: ".popup__update-avatar",
//   formSelectorAddCard: ".popup__form_add-card",
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__form-input-error_active",
// };

// //Объект для заполнения профиля нового автора
// // const dataAuthor = {
// //   name: name,
// //   about: about,
// // };

// //const initialCards = []

// const userInfo = new UserInfo({
//   profileTitle: ".profile__title",
//   profileAboutAuthor: ".profile__about-author",
//   avatarAuthor: ".profile__image-author",
// });

// //Функция обработчик клика по карточке
// let ownerId = "";

// const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
//   headers: {
//     authorization: "fa53dc10-0bed-404e-84a8-68518d7f0629",
//     "Content-Type": "application/json",
//   },
// });

// api
//   .getUserInfo()
//   .then((data) => {
//     const userData = data;
//     userInfo.setUserInfo(userData);
//     ownerId = userData._id;
//     console.log(ownerId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// api
//   .getInitialCards()
//   .then((data) => {
//     const cardsData = data;

//     renderArrayCards.renderItems(cardsData);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const handleRenderCard = (card) => {
//   const itemCard = new Card(
//     ownerId,
//     card,
//     handleCardClick,
//     handleDeleteCard,
//     ".template"
//   );

//   const cardElement = itemCard.createCard();
//   renderArrayCards.addItemsOnContainer(cardElement);
// };

// const handleCardClick = (data) => {
//   popupWithImage.open(data);
// };

// const popupWithFormDeleteCard = new PopupConfirmDeleteCard({
//   popupSelector: ".popup__delete-card",
//   closeButtonSelector: ".popup__close-button-delete-card",
// });

// const handleDeleteCard = (data) => {
//   popupWithFormDeleteCard.open();
//   popupWithFormDeleteCard.setSubmitCallback(() => {
//     api
//       .deleteCard(data)
//       .then(() => {})
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// };

// popupWithFormDeleteCard.setEventListeners();

// const renderArrayCards = new Section(
//   {
//     handleRenderCard,
//   },
//   ".cards"
// );

// const popupWithFormEditAvatar = new PopupWithForm({
//   popupSelector: ".popup__update-avatar",
//   closeButtonSelector: ".popup__close-button_edit-avatar",
//   submitForm: (data) => {
//     api
//       .editAvatar(data)
//       .then((data) => {
//         const editAvatarProfile = data;
//         userInfo.setUserInfo(editAvatarProfile);
//         popupWithFormEditAvatar.close();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
// });

// editButtonAvatar.addEventListener("click", () => {
//   popupWithFormEditAvatar.open();
// });

// popupWithFormEditAvatar.setEventListeners();

// // api.putLikeCard(data)
// // .feth((data) => {

// // })
// // .catch((err) =>{
// //   console.log(err)
// // })

// // api.deleteLikeCard(data)
// // .feth((data) => {

// // })
// // .catch((err) =>{
// //   console.log(err)
// // })

// // const popupWithFormDeleteCard = new PopupWithForm({
// //   popupSelector: ".popup__delete-card",
// //   closeButtonSelector: ".popup__close-button",
// //   submitForm: (data) => {
// //     // api
// //     //   .editDataProfile(data)
// //     //   .then((data) => {
// //     //     const setDataProfile = data;
// //     //     userInfo.setUserInfo(setDataProfile);
// //     //     popupWithFormEditProfile.close();
// //     //   })
// //     //   .catch((err) => {
// //     //     console.log(err);
// //     //   });

// //   },
// // });

// // deleteCardButton.addEventListener("click", () => {
// //   popupWithFormDeleteCard.open();
// // });

// // popupWithFormDeleteCard.setEventListeners();

// //Функция вывода карточек на экран

// //Инициализация класса добавления новой карточки в разметку
// const popupWithFormAddNewCard = new PopupWithForm({
//   popupSelector: ".popup__add-card",
//   closeButtonSelector: ".popup__close-button_add-card",
//   submitForm: (data) => {
//     api
//       .addNewCard(data)
//       .then((res) => {
//         const newCard = res;
//         const itemCard = new Card(
//           ownerId,
//           newCard,
//           handleCardClick,
//           handleDeleteCard,
//           ".template"
//         );
//         const cardElement = itemCard.createCard();
//         renderArrayCards.addNewCardOnContainer(cardElement);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
// });

// addButton.addEventListener("click", () => {
//   popupWithFormAddNewCard.open();
// });
// popupWithFormAddNewCard.setEventListeners();

// //--------------------------------------------------//
// //Инициализация класса  для открытия и закрытия popup фотографии карточки
// const popupWithImage = new PopupWithImage({
//   popupSelector: ".popup__open-card",
//   closeButtonSelector: ".popup__close-button_open-card",
// });
// popupWithImage.setEventListeners();

// //--------------------------------------------------//
// //Инициализация класса с информацией об авторе
// // const userInfo = new UserInfo({
// //   profileTitle: ".profile__title",
// //   profileAboutAuthor: ".profile__about-author",
// // });
// //Инициализация класса добавления информации об авторе на страницу
// const popupWithFormEditProfile = new PopupWithForm({
//   popupSelector: ".popup",
//   closeButtonSelector: ".popup__close-button",
//   submitForm: (data) => {
//     api
//       .editDataProfile(data)
//       .then((data) => {
//         const setDataProfile = data;
//         userInfo.setUserInfo(setDataProfile);
//         popupWithFormEditProfile.close();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
// });

// profileEditButton.addEventListener("click", () => {
//   const userData = userInfo.getUserInfo();
//   name.value = userData.name;
//   about.value = userData.about;
//   popupWithFormEditProfile.open();
// });

// popupWithFormEditProfile.setEventListeners();

// //--------------------------------------------------//
// //Инициализация класса для валидации формы EditProfile
// const formValidatorEditProfile = new FormValidator(
//   parametrs,
//   parametrs.formSelector
// );
// formValidatorEditProfile.enableValidation();

// //Инициализация класса для валидации формы AddCard
// const formValidatorAddCard = new FormValidator(
//   parametrs,
//   parametrs.formSelectorAddCard
// );
// formValidatorAddCard.enableValidation();

// const formValidatorEditAvatar = new FormValidator(
//   parametrs,
//   parametrs.formSelectorEditAvatar
// );
// formValidatorEditAvatar.enableValidation();

// // const popupWithFormAddNewCard = new PopupWithForm({
// //   popupSelector: ".popup__add-card",
// //   closeButtonSelector: ".popup__close-button_add-card",
// //   submitForm: (data) => {
// //     api
// //       .addNewCard(data)
// //       .then((res) => {
// //         const newCard = res;
// //         const itemCard = new Card(
// //           ownerId,
// //           newCard,
// //           handleCardClick,
// //           handleDeleteCard,
// //           ".template"
// //         );
// //         const cardElement = itemCard.createCard();
// //         renderArrayCards.addNewCardOnContainer(cardElement);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   },
// // });
