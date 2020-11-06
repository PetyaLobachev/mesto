export class Section {
  constructor({ data, handleRenderCard }, cardSelector) {
    this._renderedItems = data;
    this._handleRenderCard = handleRenderCard;
    this._container = document.querySelector(cardSelector);
  }
  addItemsOnContainer(cardElement) {
    this._container.append(cardElement);
  }
  addNewCardOnContainer(cardElement) {
    this._container.prepend(cardElement);
  }
  renderItems() {
    this._renderedItems.forEach((card) => {
      this._handleRenderCard(card);
    });
  }
}
