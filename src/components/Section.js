export class Section {
  constructor({ handleRenderCard }, cardSelector) {
    this._handleRenderCard = handleRenderCard;
    this._container = document.querySelector(cardSelector);
  }
  addItemsOnContainer(cardElement, position) {
    if (position === "append") {
      this._container.append(cardElement);
    } else if (position === "prepend") {
      this._container.prepend(cardElement);
    }
  }
  renderItems(cardsData) {
    cardsData.forEach((card) => {
      this._handleRenderCard(card);
    });
  }
}
