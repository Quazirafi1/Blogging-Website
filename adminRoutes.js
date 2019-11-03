const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");

router.all('/*',isUserAuthenticated, (req, res, next) => {
    
    req.app.locals.layout = 'admin';
    
    next();
});

/* DEFAULT ADMIN INDEX*/

router.route('/')
    .get(adminController.index);


/* admin endpoints */

router.route('/posts')
    .get(adminController.getPosts);


    


router.route('/posts/create')
    .get(adminController.getCreatePostPage)
    .post(adminController.submitCreatePostPage);


router.route('/posts/edit/:id')
    .get(adminController.getEditPostPage)
    .put(adminController.submitEditPostPage);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);


/* ADMIN CATEGORY ROUTES*/

router.route('/category')
    .get(adminController.getCategories);


router.route('/category/create')
    .post(adminController.createCategories);


router.route('/category/edit/:id')
    .get(adminController.getEditCategoriesPage)
    .post(adminController.submitEditCategoriesPage);


/* admin comment routes */
router.route('/comment')
    .get(adminController.getComments);

module.exports = router;

