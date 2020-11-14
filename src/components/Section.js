export class Section {
  constructor({ handleRenderCard }, cardSelector) {
    this._handleRenderCard = handleRenderCard;
    this._container = document.querySelector(cardSelector);
  }
  addItemsOnContainer(cardElement, position = 'end') {
    if (position = 'start')
    {
      this._container.prepend(cardElement);
    }
    else {
    this._container.append(cardElement);
    }
  }
  
  renderItems(cardsData) {
    cardsData.forEach((card) => {
      this._handleRenderCard(card);
    });
  }
}
