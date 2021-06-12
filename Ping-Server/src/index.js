const express = require('express');
const cors = require('cors');
const config = require('config');
const http = require('http');
const socketio = require('socket.io');
const chalk = require('chalk');

require('./database/mongoDB');
const WebSocket = require('./utils/WebSocket');
const authRouter = require('./routes/authRoute');
const messageRouter = require('./routes/messageRoute');

const app = express();
app.use(express.json());
app.use(cors({
    origin: config.get('cors.origin')
}));
const server = http.createServer(app);
const success = chalk.underline.green.bold;

global.io = socketio(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

io.on('connection', WebSocket.connection);
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

const PORT = process.env.PORT || config.get('server.port');

server.listen(PORT, () => {
    console.log(success(`<=== Application is running on port: ${PORT} ===>`));
});
