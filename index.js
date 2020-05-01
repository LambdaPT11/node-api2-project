// import the server to run
const server = require('./api/server.js');

// create the port to run server on
PORT = 5000;

// console log server is running on - dynamic
server.listen(PORT, () => {
    console.log(`** listening on ${PORT} **`)
});