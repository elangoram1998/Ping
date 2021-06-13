const chalk = require('chalk');

const errorMsg = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

module.exports = {
    success,
    warning,
    errorMsg
}
