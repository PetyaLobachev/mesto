export class UserInfo {
  constructor({ profileTitle, profileAboutAuthor }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileAboutAuthor = document.querySelector(profileAboutAuthor);
  }
  getUserInfo() {
    return {
      nameAuthor: this._profileTitle.textContent,
      aboutAuthor: this._profileAboutAuthor.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._profileTitle.textContent = name.value;
    this._profileAboutAuthor.textContent = about.value;
  }
}
