export class Section {
  constructor({ data, renderer }, cardSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  addItemsOnContainer(cardElement) {
    this._container.append(cardElement);
  }

  renderItems() {
    this._renderedItems.forEach((card) => {
      this._renderer(card);
    });
  }
}
