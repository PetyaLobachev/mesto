export class Section {
  constructor({ data, renderer }, cardSelector) {
    this._initialCards = data;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  addItem(cardElement) {
    this._container.append(cardElement);
  }
  renderItems() {
    this._initialCards.forEach((card) => {
      this._renderer(card);
    });
  }
}



