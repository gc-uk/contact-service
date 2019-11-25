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

router.get('/form/gen/info-contact', formController.info_contact_get);
router.post('/form/gen/info-contact', formController.info_contact_post);

router.get('/form/adr', formController.adr_get);
router.post('/form/adr', formController.adr_post);
router.get('/form/gen', formController.gen_get);
router.post('/form/gen', formController.gen_post);
router.get('/form/se', formController.se_get);
router.post('/form/se', formController.se_post);
router.get('/form/sg', formController.sg_get);
router.post('/form/sg', formController.sg_post);
router.get('/form/sr', formController.sr_get);
router.post('/form/sr', formController.sr_post);
router.get('/form/w', formController.w_get);
router.post('/form/w', formController.w_post);

router.get('/form/:id', formController.form_ID_get);

router.get('/form/gen/complete', formController.complete);



module.exports = router