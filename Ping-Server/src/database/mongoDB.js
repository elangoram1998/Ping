const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

mongoose.connect(`mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.dbname')}`, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log(success('MongoDB database has been connected...'));
});

mongoose.connection.on('error', () => {
    console.log(error('MongoDB has some database issue!!'));
});

mongoose.connection.on('disconnected', () => {
    console.log(warning('MongoDB database has been disconnected'));
});