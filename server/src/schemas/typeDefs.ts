import gql from 'graphql-tag';

// the typedefs are replacing our routes and the resolver is our controllers
// note: when we get to the end in type User, think about removing password for security purposes if nothing break
// the arrays are referring the types in
// todo: double check the cardId/deckId vs _id in the backend ask TA 11/17
// testing /
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
        type: String
        description: String
        attack: Int
        defense: Int
        level: Int
        attribute: String
        race: String
        archetype: String
        image: String
    }

    input CardInput{
        name: String
        type: String
        description: String
        atk: Int
        def: Int
        level: Int
        attribute: String
        race: String
        archetype: String
        image: String
    }

    type Deck {
        _id: ID
        name: String
        playable: Boolean
        cards: [Card]
        type: String
        user: String!
    }

    input DeckInput {
        name: String
        playable: Boolean
        cards: [String]
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

# do we use card id instead _id in the quearies in the front end
    type Query {
        allCards: [Card]
        allDecks: [Deck]
        cardById(cardId: ID!): Card
        deckById(deckId: ID!): Deck
        # userById(userId: ID!): User
        user(username: String!): User
        me: User
    }

    type Mutation {
        #this is the cruds not reading
        addUser(input: UserInput!): Auth
        login(username: String!, password: String!): Auth
        addCardToUser(input: CardInput): Card
        addCardToDeck(deckId: String!, cardId: String!): Deck
        createDeck(input: DeckInput): Deck
        # deleteCardFromUser(cardId: String!): Card
        deleteCardFromDeck(deckId: ID!, cardId: ID!): Deck
        # deleteDeck(deckId: String!): Deck
        updateDeckName(deckId: String!, input: DeckInput): Deck
        deleteCardFromUser(cardId: ID!): User
        deleteCard(cardId: ID!): Card
        deleteDeck(deckId: ID!):Deck
    }
`
export default typeDefs;
