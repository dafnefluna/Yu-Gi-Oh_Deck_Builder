import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedCards: [Card]
        allDecks: [Deck] 
    }

    type Card {
        _id: ID
        name: String
        type: string
        description: String
        attack: Number
        defense: Number
        level: Number
        attribute: String
        race: String
        archetype: String
        image: String
    }

    type Deck {
        _id: ID
        playable: Boolean
        cards: [Card]
        type: String
        user: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Auth {
        token: ID!
        user: User
    }

# note: can I switch the key in queary to allcards and alldecks for the queary
    type Queary {
        allCards: [Card]
        allDecks: [Deck]
        deckById(id: ID!): Deck
    }
`
// todo: work with type queary and type mutation with Andrew