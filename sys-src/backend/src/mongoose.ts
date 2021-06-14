import mongoose from 'mongoose';

let database: mongoose.Connection;

export const connect = () => {
    const url = 'mongodb://localhost:27017/';
    const options = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(url, options, (err) => {
        if (err) throw err;
    });

    database = mongoose.connection;

    database.once('open', async () => {
        console.log('Connected to database: ' + url);
    });
    database.on('error', () => {
        console.log('Error connecting to database');
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect(() => {});
};
