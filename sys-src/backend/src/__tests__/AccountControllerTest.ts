import server from '../Server';
import request from 'supertest';

import { RefreshTokenModel } from '../models/RefreshToken';

const s = new server();

jest.useFakeTimers();
import { connect, closeDatabase } from '../databaseHandler';

//Connect to in memory database and seed fake user data
beforeAll(async (done) => {
    await connect();
    done();
});
//Disconnect to in memory database
afterAll(async (done) => {
    await closeDatabase();
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
