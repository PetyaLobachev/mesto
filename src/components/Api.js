export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
  editDataProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
  deleteCard(dataId) {
    return fetch(`${this._baseUrl}/cards/${dataId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((cardId) => {
        return cardId;
      });
  }
  putLikeCard(dataId) {
    return fetch(`${this._baseUrl}/cards/likes/${dataId._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((dataId) => {
        return dataId;
      });
  }
  deleteLikeCard(dataId) {
    return fetch(`${this._baseUrl}/cards/likes/${dataId._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((dataId) => {
        return dataId;
      });
  }
}
