const chalk = require('chalk');

const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

class WebSocket {
    connection(socket) {
        console.log(success("New websocket connection occured"));

        socket.on('disconnect', () => {
            console.log(warning("WebSocket connection disconnected"));
        });
    }
}

module.exports = new WebSocket();