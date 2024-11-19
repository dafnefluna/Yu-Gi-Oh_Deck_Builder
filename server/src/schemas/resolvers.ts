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
        apiId: number
        name: string
        type: string
        description: string
        attack: number
        defense: number
        level: number
        attribute: string
        race: string
        archetype: string
        image: string
    }
}

interface DeckArg {
    deckId: string;
}

interface AddDeckArg {
    input: {
        name: string
        playable: boolean
        cards?: [string]
        type: string
        user: string
    }
}

interface DeleteCardFromDeckArg {
    deckId: string
    cardId: string
}

interface updateDeckArg {
    deckId: string
    input: {
        name: string
        playable: boolean
        type: string
    }
}

const resolvers = {
    Query: {
        user: async (_parent: any, { username }: UserArgs): Promise<IUser | null> => {
            return User.findOne({ username }).populate("savedCards").populate("allDecks");
        },
        me: async (_parent: any, _args: any, context: any) => {
            // If the user is authenticated, find and return the user's information
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedCards").populate("allDecks");
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Could not authenticate user.');
        },
        allCards: async (): Promise<ICard[] | null> => {
            return Card.find({});
        },
        allDecks: async (): Promise<IDeck[] | null> => {
            return Deck.find({}).populate("cards");
        },
        cardById: async (_parent: any, { cardId }: CardArg) => {
            return await Card.findOne({ _id: cardId });
        },
        deckById: async (_parent: any, { deckId }: DeckArg) => {
            return await Deck.findOne({ _id: deckId }).populate("cards");
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

        addCardToUser: async (_parent: any, { input }: AddCardArg, context: any) => {
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

// note: we switched to $push from $addtoset to have duplicates cards in their deck. For v2 we should consider add to set when we figure out the authenticating the card that exist irl
        addCardToDeck: async (_parent: any, { cardId, deckId }: AddCardToDeckArg, context: any) => {
            if (context.user) {
                const cardToAdd = Card.findById(cardId);

                await Deck.findOneAndUpdate(
                    { _id: deckId },
                    { $push: { cards: cardToAdd, } },
                    { new: true, runValidators: true }
                );
                return cardToAdd;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

        createDeck: async (_parent: any, { input }: AddDeckArg, context: any) => {
            if (context.user) {
                const createNewDeck = Deck.create({ ...input });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { allDecks: createNewDeck } }
                );
                return createNewDeck;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

        deleteCardFromDeck: async (_parent: any, { deckId, cardId }: DeleteCardFromDeckArg, context: any) => {
            if (context.user) {
                return Deck.findOneAndUpdate(
                    { _id: deckId },
                    {
                        $pull: { cards: { _id: cardId } }
                    },
                    { new: true });
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

        updateDeckName: async (_parent: any, { deckId, input }: updateDeckArg, context: any) => {
            if (context.user) {
                return Deck.findOneAndUpdate(
                    { _id: deckId },
                    { name: input.name, playable: input.playable, type: input.type },
                    { new: true });
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },
    }
}

export default resolvers;