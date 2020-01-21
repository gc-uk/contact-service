const d = require('../data/contactcentre.json');
var err = false;
require('dotenv').config()

var NotifyClient = require('notifications-node-client').NotifyClient
var notify = new NotifyClient(process.env.notifyapikey)

exports.form_noid_get = function (req, res) {

   // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
   // No messing here, the user is manipulating the URL so bump them off
   res.redirect('/question/page/0')
}

exports.form_ID_get = function (req, res) {

   // What is the ID of the form being requested?
   var queryID = req.params.id;

   // DEBUG
   console.log('Form entry get');
   console.log(queryID);

   // If there is no page ID, then push back to the start

   if (queryID === undefined) {
      return res.redirect('/question/page/0');
   }

   // Is there a form for the given ID

   // Query the data set using the ID
   var pageData = d.options.filter(function (value) {
      return value.value === queryID;
   });

   // There should only be 1 form for a parent ID
   if (pageData.length === 1) {
      // No form, redirect to first page
      return res.render('form/' + queryID);
   }

   //Somethings gone wrong...
   return res.redirect('/question/page/0')
}


exports.form_get = function (req, res) {

   // What is the ID of the form being requested?
   var queryID = req.params.id;

   // DEBUG
   console.log('Form get');
   console.log(queryID);

   // If there is no page ID, then push back to the start

   if (queryID === undefined) {
      return res.redirect('/question/page/0');
   }

   // We have an ID - we don't know if it's valid though... 

   // Our JSON ID's are integers, can we convert the querystring into an integer?
   var parent = parseInt(queryID)

   // Query the data set using the ID
   var pageData = d.options.filter(function (value) {
      return value.parent === parent;
   });

   console.log('Page Data START');
   console.log(pageData);
   console.log(pageData.length);
   console.log('Page Data END');

   // There should only be 1 form for a parent ID
   if (pageData.length === 0) {
      // No form, redirect to first page
      return res.redirect('/form/gen');
   }

   if (pageData.length > 1) {
      // More than 1 form, redirect to first page
      return res.redirect('/question/page/0');
   }

   if (pageData.length === 1) {
      // 1 form what form are we showing them?

      // Form ID
      var view = pageData[0].value;

      req.session["formref"] = view;
      console.log('*************************************************form ref: ')

      console.log(req.session["formref"])

      return res.redirect('/form/gen/info-details');
   }

   // Got here, somethings gone very wrong
   return res.redirect('/question/page/0');

}

exports.form_complete_get = function (req, res) {


   // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
   // No messing here, the user is manipulating the URL so bump them off
   res.render('/form/complete')
}

exports.info_details_get = function (req, res) {
   // console.log('info details get')
   res.render("form/gen/info-details");
}

exports.info_details_post = function (req, res) {
   console.log('info details post')

   err = false;
   var err_contacted = false;
   var err_first_name = false;
   var err_last_name = false;
   // Create a variable for each form input to check

   if (req.body['contacted'] === undefined) {
      err = true;
      err_contacted = true;
   }

   if (req.body['first-name'] === "") {
      err = true;
      err_first_name = true;
   }

   if (req.body['last-name'] === "") {
      err = true;
      err_last_name = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/gen/info-details', {
         err,
         err_contacted,
         err_first_name,
         err_last_name
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/info-contact')

   }
}

exports.info_contact_get = function (req, res) {
   // console.log('info details get')
   res.render("form/gen/info-contact");

}

exports.info_contact_post = function (req, res) {
   console.log('info contact post')

   err = false;
   var err_response = false;
   var err_contact_by_email = false;
   var err_contact_by_phone = false;
   // Create a variable for each form input to check

   if (req.body['response'] === undefined) {
      err = true;
      err_response = true;
   }

   if (req.body['response'] === 'email') {
      console.log(req.body)
      if (req.body['contact-by-email'] === "") {
         err = true;
         err_contact_by_email = true;
      }
   }

   if (req.body['response'] === 'phone') {
      console.log(req.body)
      if (req.body['contact-by-phone'] === "") {
         err = true;
         err_contact_by_phone = true;
      }
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.


   // Render the form or redirect 
   console.log("Form contact - Form ref: " + req.session["formref"] )
   if (err) {

      // Form is in error

      res.render('form/gen/info-contact', {
         err,
         err_response,
         err_contact_by_email,
         err_contact_by_phone
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page

   console.log("Licensing: " + req.session.data["licensingpage"] )

   if (req.session.data["licensingpage"] === 'true') {
      return res.redirect('/form/conrep')
   }

      if (req.session["formref"] === undefined) {
         return res.redirect('/form/gen')
      }


      return res.redirect('/form/' + req.session["formref"])

   }
}

exports.adr_get = function (req, res) {
   // console.log('adr form get')
   res.render("form/adr");
}

exports.adr_post = function (req, res) {
   console.log('adr form post')

   err = false;
   var err_adr_name = false;
   var err_concern = false;
   var err_more_detail = false;

   // Create a variable for each form input to check

   if (req.body['adr-name'] === undefined) {
      err = true;
      err_adr_name = true;
   }

   if (req.body['concern'] === undefined) {
      err = true;
      err_concern = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/adr', {
         err,
         err_adr_name,
         err_concern,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      notify
         .sendEmail(process.env.formadr, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'adrname': req.session.data['adr-name'],
               'concern': req.session.data['concern'],
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')
   }
}

exports.conrep_get = function (req, res) {
   // console.log('conrep form get')
   res.render("form/conrep");
}

exports.conrep_post = function (req, res) {
   console.log('conrep form post')

   err = false;
   var err_complaint = false;
   var err_operator_name
   var err_more_detail = false;

   // Create a variable for each form input to check

   if (req.body['complained-to-operator'] === undefined) {
      err = true;
      err_complaint = true;
   }

   if (req.body['operator-name'] === "") {
      err = true;
      err_operator_name = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/conrep', {
         err,
         err_complaint,
         err_operator_name,
         err_more_detail,

         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      notify
         .sendEmail(process.env.formconrep, process.env.licensingrecipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'complained': ((req.session.data['complained'] === undefined) ? 'Not answered' : req.session.data['complained']),
               'operator': req.session.data['operator-name'],
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')

   }
}

exports.gen_get = function (req, res) {
   // console.log('gen form get')
   res.render("form/gen");
}

exports.gen_post = function (req, res) {
   console.log('gen form post')

   err = false;
   var err_more_detail = false;
   // Create a variable for each form input to check

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/gen', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      //Where is this email going to?

      notify
         .sendEmail(process.env.formgen, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

         req.session.data = {};

         console.log(req.session.data);

      res.redirect('/form/gen/complete')

   }
}

exports.se_get = function (req, res) {
   // console.log('se form get')
   res.render("form/se");
}

exports.se_post = function (req, res) {
   console.log('se form post')

   err = false;
   var err_operator_name = false;
   var err_self_exclusion = false;
   var err_more_detail = false;

   // Create a variable for each form input to check

   if (req.body['operator-name'] === "") {
      err = true;
      err_operator_name = true;
   }

   if (req.body['self-exclusion'] === undefined) {
      err = true;
      err_self_exclusion = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/se', {
         err,
         err_operator_name,
         err_self_exclusion,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      notify
         .sendEmail(process.env.formse, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'operator-name': req.session.data['operator-name'],
               'gamblingid': req.session.data['user-name'],
               'selfExclusion': req.session.data['self-exclusion'],
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')


   }
}

exports.sg_get = function (req, res) {
   // console.log('sg form get')
   res.render("form/sg");
}

exports.sg_post = function (req, res) {
   console.log('sg form post')

   err = false;
   var err_complaint = false;
   var err_operator_name = false;
   var err_gambling_tool = false;
   var err_more_detail = false;

   // Create a variable for each form input to check

   if (req.body['complained-to-operator'] === undefined) {
      err = true;
      err_complaint = true;
   }

   if (req.body['operator-name'] === "") {
      err = true;
      err_operator_name = true;
   }

   if (req.body['gambling-tool'] === undefined) {
      err = true;
      err_gambling_tool = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/sg', {
         err,
         err_complaint,
         err_operator_name,
         err_gambling_tool,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      notify
         .sendEmail(process.env.formsg, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'complained': ((req.session.data['complained'] === undefined) ? 'Not answered' : req.session.data['complained']),
               'gamblingTool': req.session.data['gambling-tool'],
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')

   }
}

exports.sr_get = function (req, res) {
   // console.log('sr form get')
   res.render("form/sr");
}

exports.sr_post = function (req, res) {
   console.log('sr form post')

   err = false;
   var err_complaint = false;
   var err_operator_name = false;
   var err_more_detail = false;
   // Create a variable for each form input to check

   if (req.body['complained-to-operator'] === undefined) {
      err = true;
      err_complaint = true;
   }

   if (req.body['operator-name'] === "") {
      err = true;
      err_operator_name = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/sr', {
         err,
         err_complaint,
         err_operator_name,
         err_more_detail,

         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      var openedDate = req.session.data['account-opened-day'] + '/' + req.session.data['account-opened-month'] + '/' + req.session.data['account-opened-year']

      notify
         .sendEmail(process.env.formsr, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'complained': ((req.session.data['complained'] === undefined) ? 'Not answered' : req.session.data['complained']),
               'operator': req.session.data['operator-name'],
               'gamblingid': req.session.data['user-name'],
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')
   }
}

exports.w_get = function (req, res) {
   console.log(process.env.NotifyKey)
   res.render("form/w");
}

exports.w_post = function (req, res) {
   console.log('w form post')

   err = false;
   var err_complaint = false;
   var err_operator_name = false;
   var err_complaint_date = false;
   var err_more_detail = false;
   // Create a variable for each form input to check

   if (req.body['complained-to-operator'] === undefined) {
      err = true;
      err_complaint = true;
   }

   if (req.body['operator-name'] === "") {
      err = true;
      err_operator_name = true;
   }

   if (req.body['complaint-date-day'] === "" | req.body['complaint-date-month'] === "" | req.body['complaint-date-year'] === "") {
      err = true;
      err_complaint_date = true;
   }

   if (req.body['more-detail'] === "") {
      err = true;
      err_more_detail = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.

   // Render the form or redirect 

   if (err) {

      // Form is in error

      res.render('form/w', {
         err,
         err_complaint,
         err_operator_name,
         err_complaint_date,
         err_more_detail,

         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, send via Notify to the inbox

      var fullDate = req.session.data['complaint-date-day'] + '/' + req.session.data['complaint-date-month'] + '/' + req.session.data['complaint-date-year']

      notify
         .sendEmail(process.env.formw, process.env.recipient, {
            personalisation: {
               'firstname': req.session.data['first-name'],
               'lastname': req.session.data['last-name'],
               'previouscontact': ((req.session.data['contacted'] === undefined) ? 'Not answered' : req.session.data['contacted']),
               'contactMethod': req.session.data['response'],
               'email': ((req.session.data['contact-by-email'] === "") ? 'Not provided' : req.session.data['contact-by-email']),
               'telephone': ((req.session.data['contact-by-phone'] === "") ? 'Not provided' : req.session.data['contact-by-phone']),
               'complained': ((req.session.data['complained-to-operator'] === undefined) ? 'Not answered' : req.session.data['complained-to-operator']),
               'operator': req.session.data['operator-name'],
               'gamblingid': req.session.data['user-name'],
               'date': fullDate,
               'summary': req.session.data['more-detail']
            }
         })
         .then(response => console.log("Sent"))
         .catch(err => console.error("errored: " + err))

      res.redirect('/form/gen/complete')
   }
}

exports.complete = function (req, res) {
   res.render("form/gen/complete");
}