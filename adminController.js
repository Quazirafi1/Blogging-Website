const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .then(posts=> {
           res.render('admin/posts/index', {posts: posts});
        });
    },

    submitPosts: (req, res) => {
        //form validation remaining
        const commentsAllowed= req.body.allowComments ? true:false;

        const newPost= new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category
        });

        newPost.save().then(post =>{
            console.log(post);
            req.flash('success-message', 'post created successfully.');
            res.redirect('/admin/posts');
        });


    },

    createPosts: (req, res) => {
        Category.find().then(cats => {
            res.render('admin/posts/create', {categories: cats});
        });

    },

    editPost: (req, res) => {
        const id = req.params.id;

        Post.findById(id).then(post => {
            res.render('admin/posts/edit', {post: post});
        });

    },

    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
               req.flash('success-message', 'the post ${deletedPost.title} has been deleted.');
               res.redirect('/admin/posts');
            });
    },

    //all category methods

    getCategories: (req, res) => {
        Category.find().then(cats => {
           res.render('admin/category/index', {categories: cats});
        });
    },
    createCategories: (req, res) => {
        var categoryName = req.body.name;
        //console.log(categoryName);
        if(categoryName)
        {
            const newCategory = new Category({
                title: categoryName
            });
            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }
    }

};