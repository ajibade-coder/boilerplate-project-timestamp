// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', (req, res) => {
  let todays_date = new Date()
  let utc_info = todays_date.toUTCString();
  let unix_info = todays_date.getTime();
  res.json({"unix": unix_info,"utc": utc_info})
})


// date api endpoint
app.get('/api/:date', (req, res) => {

  let data = req.params.date
  let arg = Number(data)
  let date_data;
  let utc_info;
  let unix_info;
 

  if (arg) {
    date_data = new Date(arg);
    utc_info = date_data.toUTCString();
    unix_info = date_data.getTime()
    res.json({ unix: unix_info, utc: utc_info })
  } else {
    date_data = new Date(data)

    if (date_data != "Invalid Date" ) {
    utc_info = date_data.toUTCString(); 
    unix_info = date_data.getTime()

    res.json({ unix: unix_info, utc: utc_info })

    } else {
         res.json({ error : "Invalid Date" })
    }

   

  }
  
});

let m = new Date( 'Thu, 01 Jan 1970 00:00:00 GMT')
let x = m.getTime()
let y = m.toUTCString()
console.log(`unix : ${x}, utc: ${y}`)



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
