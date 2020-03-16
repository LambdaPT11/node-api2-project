// index file for the server.


// server is built in server js and needs to be imported.
const server = require('./server/Server.js');

// setting up the port for the server to listen on.
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`\n** Server running on http://localhost:${PORT} **\n`);
});
