import server from '../Server';
import request from 'supertest';
import { setupDB } from './databaseTestSetup';
import {AccountModel} from "../models/Account";
import {RefreshTokenModel} from "../models/RefreshToken";
const s = new server();

setupDB();
it('Should login user', async (done) => {
    const res = await request(s.app).post('/accounts/login').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
    });
    console.log(res.body);
    expect(res.body.username)
    expect(res.body.email).toBeTruthy();
    expect(res.body.jwtToken).toBeTruthy();
    done();
});

it('refresh token', async (done) => {
    const resUser = await request(s.app).post('/accounts/register').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
    });

    const token = await RefreshTokenModel.findOne().populate('account');
    console.log(token)
    const res = await request(s.app).post('/accounts/refresh-token').send({

    }).set("Cookie", [`refreshToken=${token.token}`]);
console.log(res.body)
    done();
});

it('Should save user to database', async (done) => {
    const res = await request(s.app).post('/accounts/register').send({
        username: 'uell',
        email: 'tetzing@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });
    console.log(res.body)
    expect(res.body.username).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.jwtToken).toBeTruthy();
    done();
});
