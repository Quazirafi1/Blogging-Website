module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    getPosts: (req, res) => {
        res.send('all posts');
    },

    submitPosts: (req, res) => {
        res.send('sub posts');
    },

    createPosts: (req, res) => {
        res.render('admin/posts/create');
    }
};