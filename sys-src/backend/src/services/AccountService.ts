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
    //search user in database
    const account = await AccountModel.findOne({
        $or: [{ username: request.username }, { email: request.email }],
    });
    //throw error if user entry does not exist in database
    //or if typed password is not equal to users password in the database
    if (!account || !bcrypt.compareSync(request.password, account.passwordHash)) {
        throw 'Login failed';
    }

    // generate and save refresh token
    const refreshToken = generateRefreshToken(account, request.ip);
    await refreshToken.save();

    // generate jwt
    const accessToken = generateAccessToken(account);

    //return user data
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
    //throw error if user exists with the same username or email in the database
    if (
        await AccountModel.findOne({
            $or: [{ username: request.username }, { email: request.email }],
        })
    ) {
        throw 'Account already exists';
    }
    const account = new AccountModel(request);
    //Encrypt user password and save hashed password in database
    account.passwordHash = await bcrypt.hash(request.password, 10);
    await account.save();

    // generate and save refresh token
    const refreshToken = generateRefreshToken(account, request.ip);
    await refreshToken.save();

    // generate jwt
    const accessToken = generateAccessToken(account);

    //if success return user data
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
