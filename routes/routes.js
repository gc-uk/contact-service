const express = require('express')
const router = express.Router();

var homeController = require('../controllers/homeController.js')
var questionController = require('../controllers/questionController.js')
var linkController = require('../controllers/linkController.js')
var formController = require('../controllers/formController.js')

// Home and basic service pages
router.get('/', homeController.home_get);
router.get('/accessibility', homeController.accessibility_get);
router.get('/feedback', homeController.feedback_get);
router.get('/help', homeController.help_get);
router.get('/feedback-thanks', homeController.feedback_thanks_get);

// POSTS
router.post('/feedback', homeController.feedback_post);

// Question Pages
// These are the pages which handle questions
router.get('/question/page', questionController.question_noid_get);
router.get('/question/page/:id', questionController.question_get);
router.post('/question/page', questionController.question_post);

// Link Pages
// These are the pages which handle links
router.get('/link/page', linkController.link_noid_get);
router.get('/link/page/:id', linkController.link_get);

// Form Pages
// These are the pages which handle forms
router.get('/form/page', formController.form_noid_get);
router.get('/form/page/:id', formController.form_get);
router.get('/form/complete', formController.form_complete_get);

// Repeat this for the forms
router.get('/form/gen/info-details', formController.info_details_get);
router.post('/form/gen/info-details', formController.info_details_post);

router.get('/form/:id', formController.form_ID_get);




module.exports = router