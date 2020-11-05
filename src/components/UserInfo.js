import { nameAuthor, aboutAuthor } from "../pages/index.js";

export class UserInfo {
  constructor({ profileTitle, profileAboutAuthor }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileAboutAuthor = document.querySelector(profileAboutAuthor);
  }
  getUserInfo() {
    return { nameAuthor, aboutAuthor };
  }
  setUserInfo({ nameAuthor, aboutAuthor }) {
    this._nameAuthor = nameAuthor.value;
    this._aboutAuthor = aboutAuthor.value;
    this._profileTitle.textContent = this._nameAuthor;
    this._profileAboutAuthor.textContent = this._aboutAuthor;
  }
}
