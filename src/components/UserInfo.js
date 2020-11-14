export class UserInfo {
  constructor({ profileTitle, profileAboutAuthor, avatarAuthor}) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileAboutAuthor = document.querySelector(profileAboutAuthor);
    this._avatarAuthor = document.querySelector(avatarAuthor);
  }
  getUserInfo() {
    const data  = {
      name: this._profileTitle.textContent,
      about: this._profileAboutAuthor.textContent,
    };
    return data
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileAboutAuthor.textContent = data.about;
    this._avatarAuthor.src = data.avatar;
  }
}


// export class UserInfo {
//   constructor({ profileTitle, profileAboutAuthor }) {
//     this._profileTitle = document.querySelector(profileTitle);
//     this._profileAboutAuthor = document.querySelector(profileAboutAuthor);
//   }
//   getUserInfo() {
//     return {
//       nameAuthor: this._profileTitle.textContent,
//       aboutAuthor: this._profileAboutAuthor.textContent,
//     };
//   }
//   setUserInfo({ name, about }) {
//     this._profileTitle.textContent = name.value;
//     this._profileAboutAuthor.textContent = about.value;
//   }
// }