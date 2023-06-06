const express = require('express');
const app = express();

const axios = require('axios');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// render the main page
app.get('/', (req, res) => {
    res.render('index');
})


// render the result page
app.get('/result', (req, res) => {
    const title = req.query.title;
    const content = req.query.content;
    let cleanTitle = ""
    let cleanContent = ""
    
    // Record the error(s) of the form data
    const errors = [];
    
    if (!title) { // Empty input
        errors.push(" No title is found");
    } 
    if ( !content ){
        errors.push(" The content of the article is needed");
    }

    if (errors.length > 0) {
        // If there are errors, display them to the user and redisplay the form
        res.render('error', { errors });
    } else {
        // sanitize data
        cleanTitle = DOMPurify.sanitize(title);
        cleanContent = DOMPurify.sanitize(content);

        res.render('result', { cleanTitle, cleanContent });
    }

  
    
    
})

app.listen(3000);

