import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
// import Card from './card.js';
// import Deck from './deck.js';

// note: mongoose automatically adds ID
export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    savedCards: Schema.Types.ObjectId[];
    allDecks?: Schema.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        savedCards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
        allDecks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Deck'
            }

        ],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;