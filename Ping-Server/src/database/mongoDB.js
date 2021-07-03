const mongoose = require('mongoose');
const config = require('config');
const { errorMsg, success, warning } = require('../utils/constants');


mongoose.connect(`mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.dbname')}`, {
//mongoose.connect(config.get('url'), {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log(success('MongoDB database has been connected...'));
});

mongoose.connection.on('error', () => {
    console.log(errorMsg('MongoDB has some database issue!!'));
});

mongoose.connection.on('disconnected', () => {
    console.log(warning('MongoDB database has been disconnected'));
});