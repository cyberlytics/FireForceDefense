import server from '../Server';
import request from 'supertest';

import { RefreshTokenModel } from '../models/RefreshToken';
import mongoose, { CallbackError } from 'mongoose';
const s = new server();
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongod = new MongoMemoryServer();
jest.useFakeTimers();

beforeAll(async (done) => {
    const uri = await mongod.getUri();
    await mongoose.disconnect();
    //connects to the in memory database for testing purposes
    await mongoose.connect(
        uri,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        (err: CallbackError) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        },
    );
    // Seed the database with users
    await request(s.app).post('/accounts/register').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });
    await request(s.app).post('/accounts/register').send({
        username: 'dummy2',
        email: 'dummy2@gmail.com',
        password: '1234567',
        confirmPassword: '1234567',
    });
    done();
});

afterAll(async (done) => {
    await mongoose.disconnect();
    done();
});

it('Should login user', async (done) => {
    const res = await request(s.app).post('/accounts/login').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
    });
    expect(res.body.username);
    expect(res.body.email).toBeTruthy();
    expect(res.body.jwtToken).toBeTruthy();
    done();
});

it('Should refresh user token', async (done) => {
    await request(s.app).post('/accounts/register').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
    });

    const token = await RefreshTokenModel.findOne().populate('account');
    const res = await request(s.app)
        .post('/accounts/refresh-token')
        .send({})
        .set('Cookie', [`refreshToken=${token.token}`]);
    expect(res.body.username).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.jwtToken).toBeTruthy();
    done();
});

it('Should save user to database', async (done) => {
    const res = await request(s.app).post('/accounts/register').send({
        username: 'uell',
        email: 'tetzing@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });

    expect(res.body.username).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.jwtToken).toBeTruthy();
    done();
});

it('Should revoke token', async (done) => {
    await request(s.app).post('/accounts/register').send({
        username: 'dummy3',
        email: 'dummy3@gmail.com',
        password: '1233456',
    });
    const token = await RefreshTokenModel.findOne().populate('account');

    await request(s.app)
        .post('/accounts/refresh-token')
        .send({})
        .set('Cookie', [`refreshToken=${token.token}`]);

    const res = await request(s.app).post('/accounts/revoke-token').send({
        token: token.replacedByToken,
    });
    expect(res.body.message).toBe('Token successfully revoked');

    done();
});
