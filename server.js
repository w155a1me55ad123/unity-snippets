const express = require('express'),
  path = require("path"),
  fs = require("fs"),
  app = express(),
  ReadSnippets = require('./helpers/ReadSnippets');

//if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/:dir/all", (req, res) => {
  var data = [];
  ReadSnippets.readFiles("snippets" + '/' + req.params.dir)
    .then(files => {
      files.forEach((item, index) => {
        data.push(item);
      });
      res.json({
        data
      })
    })
    .catch(error => {
      console.log(error);
    });
})

app.get("/readmeFirst", (req, res) => {
  ReadSnippets.readFiles("snippets" + "/" + "GettingStarted").then(files => {
      files.forEach((item, index) => {
        res.json({
          data: item
        })
      });

    })
    .catch(error => {
      console.log(error);
    });
})

app.get("/Directories", (req, res) => {
  res.json({
    "dirs": getDirectories("snippets"),
    "numberOfSnippets": getSnippetsNumber()
  })

})
getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

getSnippetsNumber = () => {
  let n = []
  for (var i = 0; i < getDirectories("snippets").length; i++) {
    n.push(fs.readdirSync("snippets/" + getDirectories("snippets")[i]).length)
  }
  return n;
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port ' + process.env.PORT || 5000)
});