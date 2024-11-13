import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
// note: import card model 
// note: import deck model

// note: mongoose automatically adds ID
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    savedCards: Schema.Types.ObjectId[];
    decks: Schema.Types.ObjectId[];
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
            }
        ],
        decks: [
            {
                type: Schema.Types.ObjectId,
            }
        ],
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

const User = model<IUser>('User', userSchema);

export default User;