import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { AccountModel, RefreshTokenModel } from '../Database';
import type { Types } from 'mongoose';
import type AccountDoc from 'Account';

async function login(request: {
    username: string;
    email: string;
    password: string;
    ip: string;
}): Promise<{ id: Types.ObjectId; username: string; email: string; jwtToken: string; refreshToken: string }> {
    const account = await AccountModel.findOne({
        $or: [{ username: request.username }, { email: request.email }],
    });

    if (!account || !bcrypt.compareSync(request.password, account.passwordHash)) {
        throw 'Login failed';
    }

    // generate and save refresh token
    const refreshToken = generateRefreshToken(account, request.ip);
    await refreshToken.save();

    // generate jwt
    const accessToken = generateAccessToken(account);

    return {
        id: account.id,
        username: account.username,
        email: account.email,
        jwtToken: accessToken,
        refreshToken: refreshToken.token,
    };
}

async function register(request: {
    username: string;
    email: string;
    password: string;
    ip: string;
}): Promise<{ id: Types.ObjectId; username: string; email: string; jwtToken: string; refreshToken: string }> {
    if (
        await AccountModel.findOne({
            $and: [{ username: request.username }, { email: request.email }],
        })
    ) {
        throw 'Account already exists';
    }
    const account = new AccountModel(request);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(request.password, salt, function (err, hash) {
            // Store hash in DB.
            account.passwordHash = hash;
        });
    });

    await account.save();

    // generate and save refresh token
    const refreshToken = generateRefreshToken(account, request.ip);
    await refreshToken.save();

    // generate jwt
    const accessToken = generateAccessToken(account);

    return {
        id: account.id,
        username: account.username,
        email: account.email,
        jwtToken: accessToken,
        refreshToken: refreshToken.token,
    };
}

async function refreshToken(request: {
    ip: string;
    token: string;
}): Promise<{ id: Types.ObjectId; username: string; email: string; jwtToken: string; refreshToken: string }> {
    const refreshToken = await getRefreshToken(request.token);
    const { account } = refreshToken;

    // renew refresh token
    const newRefreshToken = generateRefreshToken(account, request.ip);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = request.ip;
    refreshToken.replacedByToken = newRefreshToken.token;

    // save new refresh token
    await refreshToken.save();
    await newRefreshToken.save();

    // return account details with tokens
    return {
        id: account.id,
        username: account.username,
        email: account.email,
        jwtToken: generateAccessToken(account),
        refreshToken: newRefreshToken.token,
    };
}

function generateAccessToken(account: AccountDoc) {
    return jwt.sign({ id: account.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

async function revokeToken(request: { token: string; ip: string }): Promise<void> {
    const refreshToken = await getRefreshToken(request.token);

    // revoke token
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = request.ip;

    await refreshToken.save();
}

async function getRefreshToken(token: string) {
    const refreshToken = await RefreshTokenModel.findOne({ token: token }).populate('account');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid Refresh Token!';
    return refreshToken;
}

function generateRefreshToken(account: AccountDoc, ip: string) {
    // refresh token expires after 24 hours
    const expireyDelta = 24 * 60 * 60 * 1000;
    return new RefreshTokenModel({
        account: account.id,
        token: crypto.randomBytes(40).toString('hex'),
        expires: new Date(Date.now() + expireyDelta),
        createdByIp: ip,
    });
}

export { register, login, refreshToken, revokeToken };
