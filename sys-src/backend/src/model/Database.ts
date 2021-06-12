import mongoose from 'mongoose';
import { AccountModel } from "./Account";
import { RefreshTokenModel } from "./RefreshToken";

require('dotenv').config();

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

const configUri = `
mongodb+srv://admin:${process.env.DB_KEY}@ffd.ux1aa.mongodb.net/${process.env.DB_TYPE}?retryWrites=true&w=majority
`;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || configUri, options, (err) => {
    if (err) throw err;
});

mongoose
    .connect(process.env.MONGODB_URI || configUri, options)
    .then(() => {
        console.log('Connected to database ');
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

export { AccountModel, RefreshTokenModel };
