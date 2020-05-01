// import express
const express = require('express');
// create the router with express
const router = express.Router();

// import the db into the router
const db = require('../../data/db.js');

// plain get for post router with async / await
router.get('/', async (req, res) => {try {
    const data = await db.find();
    res.status(201).json(data);
} catch(err) {
    res.status(400).json({ err: 'I can not get that info '});
}
});

// does not give the correct error
router.get('/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then(post => {
        post ? res.status(201).json(post) : res.status(404).json({ msg: 'no post by that id' })
    })
    .catch(err => {
        res.status(500).json({ msg: 'Post server error'})
    })
});

router.post('/', (req, res) => {
    const { title, contents } = req.body
    !title || !contents ? res.status(400).json({ msg: 'missing info'}) :
    db.insert(req.body)
    .then(post => {
        res.status(201).json(req.body)
    })
    .catch(err => {
        res.status(500).json({ msg: 'server did not save' })
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then(post => {
        post ? db.remove(id).then(deleted => {res.status(200).json({ msg: 'deleted'})}) 
        : res.status(404).json({msg: 'id not found'})
    })
    .catch(err => {
        res.status(500).json({msg: 'did not remove'})
    })
});

// patch modifies some data, where put modifies all data
router.put('/:id', (req,res) => {
    const { title, contents } = req.body
    const id = req.params.id

    !title || !contents
        ? res.status(400).json({ msg: 'you need info' })
        : db.update(id, req.body)
        .then(post => {
            post ? res.status(200).json(req.body) : res.status(404).json({ msg: 'something went wrong'})
        })
        .catch(err => {
            res.status(500).json({ msg: 'did not save' })
        })
});

// comments part
router.post('/:id/comments', (req, res) => {
    const { text } = req.body
    const post_id = req.params.id

    !text ? res.status(400).json({ msg: 'provide a comment'})
    : db.findById(post_id)
        .then(post => {
            if(!post) {
                res.status(404).json({msg: 'check the id'})
            }else{
                let newComment = {
                    text: text,
                    post_id: post_id,
                }
                db.insertComment(newComment)
                    .then(({id}) => {
                        db.findCommentById(id).then(comment => {
                            res.status(201).json(comment)
                        })
                    })
                    .catch(err => {
                        res.status(500).json({msg: 'error on server.'})
                    })
            }
        })
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    db.findPostComments(id)
        .then(data => {
            data.length >= 1 ? res.status(200).json(data) : res.status(404).json({msg: 'error with info'})
        })
        .catch(err => {
            res.status(500).json({err: 'server error'})
        })
})

// export the posts router
module.exports = router;