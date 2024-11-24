import { Schema, model, Document } from 'mongoose';

// todo: add question marks for consideration of the spell/trap/ non monster cards
// Define an interface for the Thought document
export interface ICard extends Document {
name: string;
type: string;
description: string;
atk?: number;
def?: number;
level?: number;
attribute?: string;
race?: string;
archetype?: string;
image?: string;
}

const cardSchema = new Schema<ICard>(
    {
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
        atk:{
            type: Number,
            required: false,
        },
        def:{
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
