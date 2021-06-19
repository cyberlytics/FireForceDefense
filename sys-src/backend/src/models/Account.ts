import { AnyObject, Document, Schema, model } from 'mongoose';
import type AccountDoc from 'Account';

const AccountSchema = new Schema<AccountDoc>({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    resetToken: {
        token: String,
        expires: Date,
    },
    created: { type: Date, default: Date.now },
    updated: Date,
});

AccountSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: Document, ret: AnyObject) {
        // remove _id and password before serialization
        delete ret._id;
        delete ret.passwordHash;
    },
});

export const AccountModel = model<AccountDoc>('Account', AccountSchema);
