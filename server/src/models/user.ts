import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import Card from './card.js';
import Deck from './deck.js';

// note: mongoose automatically adds ID
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    savedCards: Array<typeof Card>;
    allDecks?: Array<typeof Deck>;
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
        savedCards: [Card],
        allDecks: [Deck],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;