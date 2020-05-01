// import express
const express = require('express');
// import the posts router
const postsRouter = require('../api/router/posts-router.js');
// create the server
const server = express();



// middleware tells server how to use json
server.use(express.json());
// use the posts router
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('hello rythm')
});

// export the server
module.exports = server;
