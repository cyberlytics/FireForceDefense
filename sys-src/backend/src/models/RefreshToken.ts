import { Schema, model } from 'mongoose';
import type RefreshTokenDoc from 'RefreshToken';

const RefreshTokenSchema = new Schema<RefreshTokenDoc>({
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String,
});

RefreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

RefreshTokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

export const RefreshTokenModel = model<RefreshTokenDoc>('RefreshToken', RefreshTokenSchema);
