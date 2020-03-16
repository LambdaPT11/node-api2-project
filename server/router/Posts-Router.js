// This router is for posts
// /api/posts

// needs express
const express = require('express');
// uppercase R and invoke Router
const router = express.Router();

// Need the database. It is in a db3 file that can not be read.
// Use functions provided in db. Do not know what the db is called.
// Believe I need to import those db functions that manipulate the db.
// will call that import Posts
const Posts = require('../../data/db.js');

// When the client makes a GET request to /api/posts
// If there's an error in retrieving the posts from the database:
// cancel the request.
//   respond with HTTP status code 500.
//   return the following JSON object: { error: "The posts information could not be retrieved." }

//   .get("/api/posts")
router.get('/', (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ msg: 'The posts information could not be retrieved.', err });
    });
});
// This does return an array of post objects
// error checking works if fail in db.js


module.exports = router;
