import server from '../Server';
import request from 'supertest';

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

it('Set score', async (done) => {
    const resSetUser = await request(s.app).post('/game/score').send({
        username: 'MaxMuster',
        level: 'lvl001',
        stars: 3,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });
    expect(resSetUser.body.message).toBe('New data inserted');
    expect(resSetUser.body.scoreData).toBeTruthy();

    const resGetUser = await request(s.app).post('/game/score').send({
        username: 'MaxMuster',
        level: 'lvl001',
        stars: 3,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });
    expect(resGetUser.body.message).toBe('Old data updated');
    expect(resGetUser.body.scoreData).toBeTruthy();
    done();
});

it('Get scoreboard', async (done) => {
    await request(s.app).post('/game/score').send({
        username: 'TimMuster',
        level: 'lvl002',
        stars: 2,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });

    const res = await request(s.app).get('/game/scoreboard?level=lvl002');
    expect(res.body).toBeTruthy();
    done();
});

it('Get score by username', async (done) => {
    await request(s.app).post('/game/score').send({
        username: 'TimMuster',
        level: 'lvl002',
        stars: 2,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });

    const resUserScore = await request(s.app).get('/game/score/TimMuster');
    expect(resUserScore.body.username).toBe('TimMuster');
    done();
});
