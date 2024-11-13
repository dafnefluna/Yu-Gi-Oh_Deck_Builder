import { Schema, model, Document } from 'mongoose';

// Define an interface for the Thought document
interface ICard extends Document {
id: number;
name: string;
type: string;
description: string;
attack: number;
defense: number;
level: number;
attribute: string;
race: string;
archetype: string;
image: string;
}

const cardSchema = new Schema<ICard>(
    {
        id:{
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
        },
        defense:{
            type: Number,
        },
        level:{
            type: Number,
        },
        attribute:{
            type: String,
        },
        race:{
            type: String,
        },
        archetype:{
            type: String,
        },
        image:{
            type: String,
        },
    },
)

const Card = model<ICard>('Card', cardSchema);

export default Card;
