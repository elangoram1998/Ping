const chalk = require('chalk');

const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

module.exports = {
    success,
    warning,
    error
}
