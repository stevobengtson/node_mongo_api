const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find().limit(25)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(500).json());
});

router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => res.json(post))
    .catch((err) => res.status(500).json({ message: err }));
});

router.post('/', (req, res) => {
  const newPost = new Post(req.body);
  newPost.save()
    .then((post) => res.json(post))
    .catch((err) => res.status(500).json({ message: err }));
});

router.delete('/:postId', (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
    .then(post => {
      if (!post) {
        return res.status(404).send({
          message: "post not found with id " + req.params.postId
        });
      }
      res.send({ message: "post deleted successfully!" });
    }).catch(err => res.status(500).send({
        message: "Could not delete post with id " + req.params.postId
    }));
});

module.exports = router;