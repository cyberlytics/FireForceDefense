import mongoose from 'mongoose';
import { AccountModel } from './models/Account';
import { RefreshTokenModel } from './models/RefreshToken';

mongoose.Promise = global.Promise;

const mongodbUri = `
mongodb+srv://admin:${process.env.DB_KEY}@ffd.ux1aa.mongodb.net/${process.env.DB}?retryWrites=true&w=majority
`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose
    .connect(mongodbUri, options)
    .then(() => {
        console.log('Connected to database.');
    })
    .catch((err) => {
        console.error(`Error connecting to database. \n${err}`);
    });

export { AccountModel, RefreshTokenModel };
