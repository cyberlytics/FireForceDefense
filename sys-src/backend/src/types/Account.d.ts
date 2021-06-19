import type { Document } from 'mongoose';

export default interface AccountDoc extends Document {
    username: string;
    email: string;
    passwordHash: string;
    resetToken: ResetToken;
    created: Date;
    updated: Date;
}
