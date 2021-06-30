import server from './Server';
import request from 'supertest';
import mongoose, { CallbackError } from 'mongoose';
const s = new server();
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongod = new MongoMemoryServer();
jest.useFakeTimers();
/**
 * Connect to the in-memory database.
 */
export async function connect(): Promise<void> {
    const uri = await mongod.getUri();
    //Disconnect real mongo database
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
}

/**
 *  close the connection and stop mongod.
 */
export async function closeDatabase(): Promise<void> {
    await mongoose.disconnect();
    await mongod.stop();
}
