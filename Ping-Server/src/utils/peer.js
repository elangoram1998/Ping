const { PeerServer } = require('peer');
const { errorMsg, success, warning } = require('../utils/constants');

const peerServer = PeerServer({
    port: 5001,
    host:'/'
});

peerServer.on('connection', (client) => {
    console.log(success(`New peer connection ${client.getId()} occured`));
});

peerServer.on('disconnect', (client) => {
    console.log(warning(`Peer connection ${client.getId()} disconnected`));
});

peerServer.on('error', (client) => {
    console.error(errorMsg(`Peer connection ${client.message} errored out`));
});