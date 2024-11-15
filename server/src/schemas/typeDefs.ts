import gql from 'graphql-tag';

// the typedefs are replacing our routes and the resolver is our controllers
// note: when we get to the end in type User, think about removing password for security purposes if nothing break
// the arrays are referring the types in


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
        apiId: Number
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

    input CardInput{
        apiId: Number
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

    input DeckInput {
        playable: Boolean
        cards?: [Card]
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
        # deleteCard()
        # deleteDeck()

    }
`
export default typeDefs;
// todo: work with type queary and type mutation with Andrew