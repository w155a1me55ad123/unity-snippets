const express = require('express'),
  path = require("path");

const app = express();
const port = process.env.PORT || 5000; //make sure to include this port in client Packagon.json
console.log(port)
//Disable this condition to produce prod version localy
if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
  app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/hello', (req, res) => {
  console.log("hello");
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port)
});