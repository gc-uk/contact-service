const express = require('express')
const router = express.Router();

var homeController = require('../controllers/homeController.js')
var optionsController = require('../controllers/optionsController.js')

// TOP LEVEL
// GETS
router.get('/', homeController.home_get);

router.get('/page/', homeController.page_get);
router.get('/page/:parentId', homeController.page_get);
router.get('/accessibility', homeController.accessibility_get);
router.get('/feedback', homeController.feedback_get);
router.get('/help', homeController.help_get);
router.get('/feedback-thanks', homeController.feedback_thanks_get);

// POSTS
router.post('/feedback', homeController.feedback_post);
router.post('/', homeController.home_post);
router.post('/page/', homeController.page_post);

// OPTIONS
// GETS
router.get('/form', homeController.form_get);
router.get('/complete', homeController.complete_get);

// POSTS
router.post('/form', homeController.form_post);

module.exports = router