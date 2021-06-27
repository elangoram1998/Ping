const express = require('express');
const cors = require('cors');
const config = require('config');
const http = require('http');
const socketio = require('socket.io');

require('./database/mongoDB');
require('./utils/peer');
const { errorMsg, success } = require('./utils/constants');
const HttpStatusCode = require('./utils/httpStatusCode');
const WebSocket = require('./utils/WebSocket');
const authRouter = require('./routes/authRoute');
const homeRouter = require('./routes/homeRoute');
const messageRouter = require('./routes/messageRoute');

const app = express();
app.use(express.json());
app.use(cors({
    origin: config.get('cors.origin')
}));
const server = http.createServer(app);

global.io = socketio(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

io.on('connection', WebSocket.connection);
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/home', homeRouter);

app.get('*', (req, res, next) => {
    let error = new Error('Page Not Found');
    error.statusCode = HttpStatusCode.NOT_FOUND;
    next(error);
});

app.use((error, req, res, next) => {
    console.error(errorMsg(`ERROR: ${error.toString()}`));
    return res.status(error.statusCode).json({
        error: error.toString()
    });
});

const PORT = process.env.PORT || config.get('server.port');

server.listen(PORT, () => {
    console.log(success(`<=== Application is running on port: ${PORT} ===>`));
});
