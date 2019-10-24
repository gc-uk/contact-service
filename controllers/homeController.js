const utils = require('../utils.js');


exports.home_get = function (req, res) {

        // If the root homepage is requested, redirect to the first question page, getting an questions with a parent of 0
        // We always have a top level set of questions with parent ID's of 0
        res.redirect('/question/page/0');
}

exports.page_get = function (req, res) {

        console.log(req.session)

        // Get the questions config
        var options = require('../data/questionroute.json');

        //,Set a default for the top level question set
        var parentID = "0";

        // Get the question set from the querystring if it exists
        if (req.query['r'] !== undefined) {
                parentID = req.query['r'];
        }

        // Query the config for the question
        var questions = options.options.filter(function (value) {
                return value.parent === parentID;
        });



        if (questions.length === 0) {
                return res.redirect('/');
        }


        // If it exists, display the page with the options, if there is a form ref present, redirect to the form
        // This is a bit of a hack check
        if (questions.length !== 0 && questions[0].form === undefined) {
                return res.render("page", {
                        questions,
                        parentID
                });
        }

        if (questions.length === 1 && questions[0].form === "true") {
                var formID = questions[0].id;
                return res.render("form", {
                        formID
                });
        }



}
exports.page_post = function (req, res) {
        var err = false;

        console.log(req.session.data['refID']);

        if (req.session.data['r'] === undefined) {
                err = true;
        }

        console.log('In error: ' + err);

        if (err) {
                return res.render("page", {
                        err
                });
        } else {
                return res.redirect("/");
        }
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
