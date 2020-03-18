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

// .post("/api/posts")
router.post('/', (req, res) => {
  const postInfo = req.body;
  const { title, contents } = req.body;

  if (title === '' || null) {
    res.status(400).json({ msg: 'Please provide title and contents for the post.' });
  } else if (contents === '' || null) {
    res.status(400).json({ msg: 'Please provide title and contents for the post.' });
  } else {
    Posts
      .insert(postInfo)
      .then(() => {
        res.status(201).json(postInfo);
      });
  }
});

// .post("/api/posts/:id/comments")
// error - not working
router.post('/:id/comments', (req, res) => {
  // eslint-disable-next-line camelcase
  const { post_id, text } = req.body;

  if (text === '') {
    res.status(400).json({ msg: 'Please provide text for the comment.' });
  }

  Posts.insertComment(req.body)
    .then((comment) => {
      // eslint-disable-next-line camelcase
      if (post_id) {
        res.status(201).json(comment);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: 'There was an error while saving the comment to the database' });
    });
});

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

//  .get("/api/posts/:id")
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: 'The post information could not be retrieved.' });
    });
});

// get(api/posts/)
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    });
});

// Delete - .delete('/api/posts/)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then((post) => {
      if (post) {
        Posts.remove(id)
          .then((deleted) => {
            if (deleted) {
              console.log(deleted);
              res.status(204).json(post);
            } else {
              res.status(500).json({
                error: 'The post could not be removed',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: 'The post could not be removed',
            });
          });
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      }
    });
});

// PUT - .put(/api/posts)
router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id, title, contents } = changes;

  if (!(title && contents)) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  } else {
    Posts.update(id, changes)
      .then((post) => {
        // eslint-disable-next-line no-unused-expressions
        post
          ? res.status(200).json(post)
          : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      })
      .catch((err) => {
        res.status(500).json({
          error: 'The post information could not be modified.',
        });
      });
  }
});

module.exports = router;
