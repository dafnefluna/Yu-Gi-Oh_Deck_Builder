import { Schema, model, Document } from 'mongoose';

// todo: add question marks for consideration of the spell/trap/ non monster cards
// Define an interface for the Thought document
export interface ICard extends Document {
apiId: number;
name: string;
type: string;
description: string;
attack?: number;
defense?: number;
level?: number;
attribute?: string;
race?: string;
archetype?: string;
image?: string;
}

const cardSchema = new Schema<ICard>(
    {
        apiId:{
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        attack:{
            type: Number,
            required: false,
        },
        defense:{
            type: Number,
            required: false,
        },
        level:{
            type: Number,
            required: false,
        },
        attribute:{
            type: String,
            required: false,
        },
        race:{
            type: String,
            required: false,
        },
        archetype:{
            type: String,
            required: false,
        },
        image:{
            type: String,
            required: false,
        },
    },
)

const Card = model<ICard>('Card', cardSchema);

export default Card;
