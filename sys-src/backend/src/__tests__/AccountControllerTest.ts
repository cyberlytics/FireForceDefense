import server from '../Server';
import request from 'supertest';

import { setupDB } from './databaseTestSetup';

const s = new server();

setupDB();
it('Should login user', async (done) => {
    const res = await request(s.app).post('/accounts/login').send({
        username: 'dummy1',
        email: 'dummy1@gmail.com',
        password: '123456',
    });

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
