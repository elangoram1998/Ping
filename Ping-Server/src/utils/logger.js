const { success, warning } = require('./constants');

const logger = (message) => {
    console.info(`${success('INFO')}: ${message}`);
}

module.exports = logger;