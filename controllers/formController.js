const d = require('../data/contactcentre.json');

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

      return res.redirect('/form/' + view);
   }

   // Got here, somethings gone very wrong
   return res.redirect('/question/page/0');

}

exports.form_complete_get = function (req, res) {

   // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
   // No messing here, the user is manipulating the URL so bump them off
   res.redirect('/form/complete')
}