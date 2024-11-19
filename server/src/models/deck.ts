import { Schema, model, Document } from 'mongoose';

// Define an interface for the Thought document
export interface IDeck extends Document {
    name: string;
    playable: boolean;
    cards?: Schema.Types.ObjectId[];
    type: string;
    user: Schema.Types.ObjectId;
}

// note to ask: do we change cards? into an array of schema.types.... 11/17

const deckSchema = new Schema<IDeck>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        playable: {
            type: Boolean,
            required: true,
        },
        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card'}],
        type: {
            type: String,
            required: true,
            enum: ['main', 'side', 'extra', 'draft']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
)

const Deck = model('Deck', deckSchema);

export default Deck;
