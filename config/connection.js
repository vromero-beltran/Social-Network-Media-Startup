const { connent, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URI ||'mongodb://localhost:27017/social-network';

    connent(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    module.exports = connection;