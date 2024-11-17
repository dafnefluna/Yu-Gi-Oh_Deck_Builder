import { Schema, model, Document } from 'mongoose';

// Define an interface for the Thought document
export interface IDeck extends Document {
    name: string;
    playable: boolean;
    cards?: Schema.Types.ObjectId;
    type: string;
    user: Schema.Types.ObjectId;
}

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
