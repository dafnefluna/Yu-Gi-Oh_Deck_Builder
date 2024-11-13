export const searchYuGiOhCard = (query: string) => {
    return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query}`);
  };
