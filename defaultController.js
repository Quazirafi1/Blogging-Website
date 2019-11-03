const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Comment = require('../models/CommentModel').Comment;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
const About = require('../models/AboutModel').About;


module.exports = {

    index: async (req, res) => {

        const posts = await Post.find();
        const categories = await Category.find();
        res.render('default/index', {posts: posts, categories: categories});
    },

    /* LOGIN ROUTES */
    loginGet: (req, res) => {
        res.render('default/login', {message: req.flash('error')});
    },


    loginPost: (req, res) => {

    },

    /* REGISTER ROUTES*/

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({message: 'Password field is mandatory'});
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.findOne({email: req.body.email}).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    },

    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .populate({path: 'comments', populate: {path: 'user', model: 'user'}})
            .then(post => {
            if(!post){
                res.status(404).json({message: 'Post not found'});
            }
            else {
                res.render('default/singlePost', {post: post, comments: post.comments});
            }
        })
    },

    submitComment: (req, res) => {
        if(req.user){
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    user: req.user.id,
                    body: req.body.comment_body
                });

                post.comments.push(newComment);
                post.save().then(savedPost => {
                    newComment.save().then(savedComment => {
                        req.flash('success-message', 'Comment has been submitted for review');
                        res.redirect(`/post/${post._id}`);
                    });
                });
            })
        }

        else{
            req.flash('error-message', 'Please Login To Comment');
            res.redirect('/login');
        }
    },

    /* about route */
    getAbout: async (req, res) => {

        const posts = await About.find();
        console.log(posts);
        res.render('default/about', {posts: posts});
    }

};

