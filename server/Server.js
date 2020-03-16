const express = require('express');

const server = express();

const postsRouter = require('./router/Posts-Router.js');

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Lambda API</h2>');
});

module.exports = server;
