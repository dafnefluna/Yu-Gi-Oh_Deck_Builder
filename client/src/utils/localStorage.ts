export const getSavedCardIds = () => {
    const savedCardIds = localStorage.getItem('saved_cards')
      ? JSON.parse(localStorage.getItem('saved_cards')!)
      : [];
  
    return savedCardIds;
  };
  
  export const saveCardIds = (cardIdArr: string[]) => {
    if (cardIdArr.length) {
      localStorage.setItem('saved_cards', JSON.stringify(cardIdArr));
    } else {
      localStorage.removeItem('saved_cards');
    }
  };
  
  export const removeCardId = (cardId: string) => {
    const savedCardIds = localStorage.getItem('saved_cards')
      ? JSON.parse(localStorage.getItem('saved_cards')!)
      : null;
  
    if (!savedCardIds) {
      return false;
    }
  
    const updatedSavedCardIds = savedCardIds?.filter((savedCardId: string) => savedCardId !== cardId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedCardIds));
  
    return true;
  };
  