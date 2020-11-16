export class Section {
  constructor({ handleRenderCard }, cardSelector) {
    this._handleRenderCard = handleRenderCard;
    this._container = document.querySelector(cardSelector);
  }
  addItemsOnContainer(cardElement) {
      this._container.prepend(cardElement);
    }
  
  renderItems(cardsData) {
    cardsData.reverse().forEach((card) => {
      this._handleRenderCard(card);
    });
  }
}