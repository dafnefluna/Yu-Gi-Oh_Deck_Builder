import { Schema, model, Document } from 'mongoose';
import Card from './card.js';

// Define an interface for the Thought document
interface IDeck extends Document {
name: string;
playable: boolean;
cards: Array<typeof Card>;
type: string;
user: Schema.Types.ObjectId;
}

const deckSchema = new Schema<IDeck>(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        playable:{
            type: Boolean,
            required: true,
        },
        cards: [Card],
        type:{
            type: String,
            required: true,
            enum:['main', 'side', 'extra']
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
)

const Deck = model<IDeck>('Deck', deckSchema);

export default Deck;
