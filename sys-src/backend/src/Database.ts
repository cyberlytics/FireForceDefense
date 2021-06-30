import mongoose from 'mongoose';
import { AccountModel } from './models/Account';
import { RefreshTokenModel } from './models/RefreshToken';
import 'universal-dotenv/register';

mongoose.Promise = global.Promise;

const mongodbUri = `
mongodb+srv://admin:${process.env.DB_KEY}@${process.env.DB_URL}/${process.env.DB}?retryWrites=true&w=majority
`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
//Connect to database
mongoose
    .connect(mongodbUri, options)
    .then(() => {
        console.log('Connected to database.');
    })
    .catch((err) => {
        console.error(`Error connecting to database. \n${err}`);
    });

export { AccountModel, RefreshTokenModel };
