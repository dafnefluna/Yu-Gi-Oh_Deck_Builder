import { gql } from '@apollo/client';

// todo: ask if we have to define all the attributes in both user and me 
// note: mindful that we may need to change _id to cardId and deckId 11/17

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
        _id
        username
        email
        savedCards [{
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
            }]
        allDecks [{
            _id
            name
            playable
            cards
            type
        }]
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
        _id
        username
        email
        savedCards [{
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
            }]
        allDecks [{
            _id
            name
            playable
            cards
            type
        }]
        }
    }`;

export const QUERY_GETALLCARDS =  gql `
    query AllCards {
  allCards {
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

export const QUERY_GETALLDECKS = gql `
query AllDecks {
  allDecks {
    _id
    name
    playable
    cards {
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
    type
  }
}
`;

export const  QUERY_GETSINGLECARD = gql `
   query CardById($cardId: ID!) {
  cardById(cardId: $cardId) {
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

export const QUERY_GETSINGLEDECK = gql `
query DeckById($deckId: ID!) {
  deckById(deckId: $deckId) {
    _id
    name
    playable
    cards {
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
    type
  }
}
`;