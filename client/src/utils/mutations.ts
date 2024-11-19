import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

// todo: where is theUserInput coming from? 11/17
export const ADD_USER = gql`
    mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

// todo: do we add the _id or not. Maybe not bc its the solution the problem
export const SAVE_NEW_CARD = gql `
    mutation addCardToUser($input: CardInput!) {
        saveNewCard(input: $input) {
            _id
            apiId
            name
            type
            description
            attack
            defense
            level
            attribute
            race
            archetype
            image
        }
    }
`;

export const ADD_CARD_TO_DECK = gql `
    mutation addCardToDeck ($deckId: string!, $cardId: string!) {
        addCardToDeck(deckId: $deckId, cardId: $cardId) {
            name
            playable
            cards
            type
        }
    }
`;

export const CREATE_NEW_DECK = gql `
    mutation createDeck ($input: DeckInput!) {
        createNewDeck(input: $input)  {
            _id
            name
            playable
            cards
            type
        }
    }
`;

export const REMOVE_CARD_FROM_DECK = gql `
    mutation deleteCardFromDeck ($deckId: String!, $cardId: String!) {
        removeCardFromDeck (deckId: $deckId, cardId: $cardId) {
            name
            playable
            cards
            type
        }
    }
`;

export const UPDATE_DECK_DETAILS = gql `
    mutation updateDeckName ($deckId: String!, $input: DeckInput!) {
        updateDeckDetails (deckId: $deckId, input: $input) {
            name
            playable
            cards
            type
        }
    }
`;

export const searchYuGiOhCard = (cardProperty: string, cardInfo: string) => {
    return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${cardProperty}=${cardInfo}`);
};
