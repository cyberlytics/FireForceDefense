// import mongoose, { CallbackError } from 'mongoose';
import request from 'supertest';
import server from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import type {CallbackError} from "mongoose";
import mongoose from 'mongoose';
const mongod = new MongoMemoryServer();
const s = new server();
jest.useFakeTimers();

function setupDB(): void {
    // Connect to Mongoose
    beforeAll(async (done) => {

        const uri = await mongod.getUri();
        await mongoose.disconnect();
        //connects to the in memory database for testing purposes
        await mongoose.connect(
            uri,
            {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
            (err: CallbackError) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
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
    }   );

        afterAll(async (done) => {
            await mongoose.disconnect();
            done();
        });


}


it('should setup database ', function () {});
export { setupDB };
