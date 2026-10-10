const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { startBot } = require('./bot');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// GANTI KE PORT 9090 AGAR TIDAK BENTROK DENGAN NGINX:
const PORT = 9090;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/status', (req, res) => res.json({ status: 'online' }));

server.listen(PORT, () => {
    console.log(`\n[ SERVER ] Dashboard aktif di http://localhost:9090`);
});

startBot(io);

