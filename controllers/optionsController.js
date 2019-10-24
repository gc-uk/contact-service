var err = false;

exports.form_get = function (req, res) {
    res.render("options/form");
}

exports.complete_get = function (req, res) {
    res.render("options/complete");
}

exports.form_post = function (req, res) {

    var NotifyClient = require('notifications-node-client').NotifyClient,
        notify = new NotifyClient(process.env.NotifyKey);

    err = false;
    var err_first_name = false;
    var err_last_name = false;
    var err_email = false;
    var err_detail = false;
    var err_reply = false;


    if (req.body['first-name'] === "") {
        err = true;
        err_first_name = true;
    }

    if (req.body['last-name'] === "") {
        err = true;
        err_last_name = true;
    }


    if (req.body['email'] === "") {
        err = true;
        err_email = true;
    }

    if (req.body['detail'] === "") {
        err = true;
        err_detail = true;
    }

    if (req.body['response-needed'] === undefined) {
        err = true;
        err_reply = true;
    }

    if (err) {
        res.render('options/form', {
            err,
            err_first_name,
            err_last_name,
            err_email,
            err_detail,
            err_reply
        })
    } else {

var tel = "Not provided";

if(req.body['telephone-number'] !== ''){
    tel = req.body['telephone-number'];
}

        notify
        .sendEmail(process.env.templateid, process.env.recipient, {
            personalisation: {
                'first-name': req.body['first-name'],
                'last-name': req.body['last-name'],
                'email': req.body['email'],
                'telephone-number': tel,
                'detail': req.body['detail'],
                'response-needed': req.body['response-needed']
            }
        })
        .then(response => console.log("Sent"))
        .catch(err => console.error("errored"))

        res.render("options/complete");
    }
}