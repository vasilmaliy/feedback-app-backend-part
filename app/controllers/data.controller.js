const db = require("../models");
const Post = db.post;
const Vote = db.vote;

exports.getFeedback = (req, res) => {

    Post.findOne({
        where: {
            id: req.query.postId
        }
    }).then( post =>{
        let numberOfVotes = 0;

        Vote.findAndCountAll({
            where: {
                postId: req.query.postId
            }
        }).then(result => {
            numberOfVotes = result.count;
            res.status(200).send({ post, numberOfVotes });
        });
    }).catch(err => {
       res.status(500).send({ message: err.message})
    });
}

exports.getFeedbacks = (req, res) => {
    Post.findAll().then( result => {
        posts = result;
        return res.status(200).send({ posts });
      }
    ).catch(err => {
       res.status(500).send({ message: err.message})
    });
}


exports.vote = (req, res) => {
    Vote.create({
        userId: req.body.userId,
        postId: req.body.postId
    }).then( vote => {
        res.status(200).send({ vote: true });
    }).catch( err => {
        res.status(500).send({message: err.message});
    });
}

exports.unVote = (req, res) => {
    Vote.destroy({where: {
            userId: req.query.userId,
            postId: req.query.postId
    }}).then( vote => {
        res.status(200).send({ vote: false });
    }).catch( err => {
        res.status(500).send({message: err.message});
    });
}

exports.getIfUserVote = (req, res) => {
    // console.log(req.query.userId)
    Vote.findOne({
        where: {
            userId: req.query.userId,
            postId: req.query.postId
        }
    }).then(result => {
        votedFor = !!result;

        res.status(200).send({votedFor});
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });;
}