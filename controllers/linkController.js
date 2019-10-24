const d = require('../data/contactcentre.json');

exports.link_noid_get = function (req, res) {

   // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
   // No messing here, the user is manipulating the URL so bump them off
   res.redirect('/question/page/0')
}

exports.link_get = function (req, res) {

   // What is the ID from the querystring?
   var queryID = req.params.id;

   // DEBUG
   console.log('Link Get')
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

   // DEBUG
   console.log(pageData);
   console.log('Length: '+ pageData.length)

   // Has anything come back?
   if (pageData.length > 0) {

       // If we have got here, they aren't questions
       // Next logical page display is a links page
       if (pageData[0].type === 'link') {
           // Link page
           return res.render('link/page', {pageData});
       }     

       // If we have got here, then something's gone really wrong so push the user back to the start
       return res.redirect('/question/page/0');


   } else {
       // If we have got here, then something's wrong so push the user back to the start
       return res.redirect('/question/page/0');
   }
}