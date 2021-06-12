import type { Document } from 'mongoose';
import type AccountDoc from 'Account';

export default interface RefreshTokenDoc extends Document {
    account: AccountDoc;
    token: string;
    expires: Date | number;
    created: Date | number;
    createdByIp: string;
    revoked: Date | number;
    revokedByIp: string;
    replacedByToken: string;
    isExpired: boolean;
    isActive: boolean;
}
