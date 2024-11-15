import { signToken, AuthenticationError } from '../utils/auth.js';
import User, { IUser } from '../models/user.js';
import Card, { ICard } from '../models/card.js';
import Deck, { IDeck } from '../models/deck.js';


// todo: finish resolvers and copied the add user and login from activity 28
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs {
    username: string;
    password: string;
}

interface UserArgs {
    username: string;
}

interface CardArg {
    cardId: string;
}

interface AddCardToDeckArg {
    deckId: string;
    cardId: string;
}

interface AddCardArg {
    input: {
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
}

interface DeckArg {
    deckId: string;
}

const resolvers = {
    Query: {
        user: async (_parent: any, { username }: UserArgs): Promise<IUser | null> => {
            return User.findOne({ username });
        },
        me: async (_parent: any, _args: any, context: any) => {
            // If the user is authenticated, find and return the user's information
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Could not authenticate user.');
        },
        allCards: async (): Promise<ICard[] | null> => {
            return Card.find({});
        },
        allDecks: async (): Promise<IDeck[] | null> => {
            return Deck.find({});
        },
        cardById: async (_parent: any, { cardId }: CardArg) => {
            return await Card.findOne({ _id: cardId });
        },
        deckById: async (_parent: any, { deckId }: DeckArg) => {
            return await Deck.findOne({ _id: deckId });
        },
    },
    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },

        login: async (_parent: any, { username, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ username });

            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
        addCardToUser: async(_parent: any, { input }:AddCardArg, context: any ) => {
            if (context.user) {
                const newCard = await Card.create({ ...input });
        
                await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedCards: newCard } }
                );
        
                return newCard;
              }
              throw AuthenticationError;
              ('You need to be logged in!');
        },
        // ToDo: add context for logged in user
        // addCardToDeck: async(_parent: any, {cardId, deckId}:AddCardToDeckArg, context: any) => {
        //         const cardToAdd = Card.findById(cardId);
                
        //         return Deck.findOneAndUpdate(
        //           { _id: deckId },
        //           {
        //             $addToSet: {
        //                 cards: cardToAdd,
        //             },
        //           },
        //           {
        //             new: true,
        //             runValidators: true,
        //           }
        //         );
        //       }

    }
}

export default resolvers;