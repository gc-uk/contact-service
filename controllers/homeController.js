const utils = require('../utils.js');


exports.home_get = function (req, res) {

        // If the root homepage is requested, redirect to the first question page, getting an questions with a parent of 0
        // We always have a top level set of questions with parent ID's of 0
        res.redirect('/question/page/0');
}


exports.accessibility_get = function (req, res) {
        res.render("accessibility");
}

exports.feedback_get = function (req, res) {
        res.render("feedback");
}

exports.help_get = function (req, res) {
        res.render("help");
}

exports.feedback_post = function (req, res) {

        if (req.session.data['telephone'] === "") {
                // No bot submission
                // Send feedback through Notify
                // Add code for  notify feedback here
                return res.redirect("/feedback-thanks");
        }

        // No submission as a bot has completed the hidden field
        // Just redirect the user
        res.redirect("/feedback");

}

exports.feedback_thanks_get = function (req, res) {

        res.render("feedback-thanks");
}
