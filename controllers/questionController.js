const d = require('../data/contactcentre.json');

exports.question_noid_get = function (req, res) {

    // No ID has been passed into the querystring, as this is a question page, push the user back to the start - 0.
    res.redirect('/question/page/0')
}

exports.question_get = function (req, res) {

    // What is the ID from the querystring?
    var queryID = req.params.id;

    // DEBUG
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

    console.log("Parent: " + pageData[0].parent)
    if (pageData[0].parent === 2) {
        req.session.data["licensingpage"] = 'true';
        console.log("licensing page:")
        console.log(req.session.data["licensingpage"])
    }

    console.log("Parent: " + pageData[0].parent)
    if (pageData[0].parent === 4) {
        req.session.data["generalpage"] = 'true';
        console.log("general page:")
        console.log(req.session.data["generalpage"])
    }


    // DEBUG
    // console.log(pageData);

    // Has anything come back?
    if (pageData.length > 0) {

        //Are they questions?
        if (pageData[0].type === 'question') {
            // Question page
          
            return res.render('question/page', {
                pageData
            });
        }

        // If we have got here, they aren't questions
        // Next logical page display is a links page
        if (pageData[0].type === 'link') {
            // Link page
            return res.redirect('/link/page/' + parent);
        }

        // If we have got here, they aren't links
        // Next logical page display is a form page
        if (pageData[0].type === 'form') {
            // Link page
            return res.redirect('/form/page/' + parent);
        }

        // If we have got here, then something's gone really wrong so push the user back to the start
        return res.redirect('/question/page/0');


    } else {
        // If we have got here, then something's wrong so push the user back to the start
        return res.redirect('/question/page/0');
    }
}

exports.question_post = function (req, res) {

    // What is the selected question id?

    // DEBUG
    // console.log(req.session.data);

    var queryID = req.params.id;




    // Redirect to the question page with the ID of the selected item
    res.redirect('/question/page/' + req.session.data['question']);

}