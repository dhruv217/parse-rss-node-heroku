// server.js



// set up ======================================================================

// get all the tools we need

var express  = require('express');

var app      = express();

var port     = process.env.PORT || 8080;

var bodyParser   = require('body-parser');



// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 



app.set('view engine', 'ejs'); // set up ejs for templating
app.use('/static', express.static(__dirname + '/static'));




// routes ======================================================================

require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport



// launch ======================================================================

app.listen(port);

console.log('The magic happens on port ' + port);