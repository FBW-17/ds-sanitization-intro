const express = require('express');
const app = express();
const {check, body, validationResult} = require("express-validator")

// middleware to process / parse received FORM DATA
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// provide the user with a registration form
app.get('/register', (req, res) => {

    let strErrors = ""

    // check if we received errors
    // create a string which contains an HTML list of all errors
    // and show it above the form, so the user gets some feedback 
    if(req.query.errors) {
        let errors = JSON.parse(req.query.errors)
        // console.log(errors)
        strErrors = "<ul>" + errors.map(error => {
            return `<li>${error.param} field invalid: ${error.msg}</li>`
        }).join("") + "</ul>"
    }

    let strForm = `
        <h1>Register</h1>
        <div>${strErrors}</div>
        <form action="/register" method="POST">
            <label for="email">Email:</label><br />
            <input type="text" id="email" name="email" />
            <br />
            <label for="password">Password:</label><br />
            <input type="password" id="password" name="password" />
            <br />
            <label for="aboutMe">About Me:</label><br />
            <textarea rows="5" id="aboutMe" name="aboutMe"></textarea>
            <br />
            <label for="news">Newsletter:</label>
            <input type="checkbox" id="news" name="news" value="1" />
            <br />
            <button type="submit">Register</button>
        </form>
        <br /><br /><br />
        <a href="/register">Reset</a>
    `
    res.send(strForm)
})

// chain of validation checks
// exactly one special character should follow. It can be any of these: +-*/$
// should end by at least one number or more
const validation = [
    body("email", "Not a valid email, please use format: 'email@hoster.domain'")
        .trim() // trim off any whitespace left and right
        .normalizeEmail()
        .isEmail(),
    // body("password", "Password must start with minimum 4 chars, followed by a special char of the following *+-/$, followed by minimum one number")
    //     .matches(/^[A-z]{4,}[*+\-/$]\d+$/), // regex for matching the password field
    body("aboutMe").trim(), // trim off any whitespace left and right
    body("news").toBoolean() // converts a checked news checkbox sent to true, non-checked to false
]

// the register POST route
// => processes the registration
// we now have outsourced all validation checks from our logic
// and have a more clear separation of concerns now
app.post('/register', validation, (req, res) => {
    
    console.log(req.body)

    const errors = validationResult(req)

    // if there are errors
    // => redirect the user back to the form with the errors to the query string
    if(!errors.isEmpty()) {
        return res.redirect('/register?errors=' + JSON.stringify(errors.array()))
    }

    res.send(req.body)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.