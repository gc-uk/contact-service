const d = require('../data/contactcentre.json');
var err = false;

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
      return res.redirect('/question/page/0');
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

      console.log( req.session["formref"])

      return res.redirect('/form/gen/info-details');
   }

   // Got here, somethings gone very wrong
   return res.redirect('/question/page/0');

}

exports.form_complete_get = function (req, res) {

   // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
   // No messing here, the user is manipulating the URL so bump them off
   res.redirect('/form/complete')
}

exports.info_details_get = function (req, res) {
   // console.log('info details get')
   res.render("form/gen/info-details");
}

exports.info_details_post = function (req, res) {
   console.log('info details post')

   err = false;
   var err_first_name = false;
   var err_last_name = false;
   // Create a variable for each form input to check

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
   // Create a variable for each form input to check

   if (req.body['response'] === "") {
      err = true;
      err_response = true;
   }

   // Repeat this for all the form inputs you want to check.
   // These is only checking if there is a value.


   // Render the form or redirect 
console.log( req.session["formref"])
   if (err) {

      // Form is in error

      res.render('form/gen/info-contact', {
         err,
         err_response
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page

   

      res.redirect('/form/' +  req.session["formref"])

   }
}

exports.adr_get = function (req, res) {
   // console.log('adr form get')
   res.render("form/adr");
}

exports.adr_post = function (req, res) {
   console.log('adr form post')

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

      res.render('form/adr', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

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

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

   }
}

exports.se_get = function (req, res) {
   // console.log('se form get')
   res.render("form/se");
}

exports.se_post = function (req, res) {
   console.log('se form post')

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

      res.render('form/se', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

   }
}

exports.sg_get = function (req, res) {
   // console.log('sg form get')
   res.render("form/sg");
}

exports.sg_post = function (req, res) {
   console.log('sg form post')

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

      res.render('form/sg', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

   }
}

exports.sr_get = function (req, res) {
   // console.log('sr form get')
   res.render("form/sr");
}

exports.sr_post = function (req, res) {
   console.log('sr form post')

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

      res.render('form/sr', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

   }
}

exports.w_get = function (req, res) {
   // console.log('w form get')
   res.render("form/w");
}

exports.w_post = function (req, res) {
   console.log('w form post')

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

      res.render('form/w', {
         err,
         err_more_detail,
         // add all the other variables from the checks you'll add above.
      })
   } else {

      // Form isn't in error, redirect to next page
      res.redirect('/form/gen/continue')

   }
}
