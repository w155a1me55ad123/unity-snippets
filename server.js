const express = require('express'),
  path = require("path"),
  fs = require("fs");
const {
  readdirSync,
  statSync
} = require('fs')
const {
  join
} = require('path')
const app = express();
const port = process.env.PORT || 5000; //make sure to include this port in client Packagon.json
console.log(port)

//Disable this condition to produce prod version localy
if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
  app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/hello', (req, res) => {
  fs.readFile('snippets/demo/test.md', function(err, data) {
    if (err) return console.error(err);
    res.json({
      data: data.toString()
    });
  });
});

app.get("/api/:dir/all", (req, res) => {
  var data = [];
  readFiles("snippets" + '/' + req.params.dir)
    .then(files => {
      console.log("loaded ", files.length);
      files.forEach((item, index) => {
        data.push(item);
      });
      res.send(data)
    })
    .catch(error => {
      console.log(error);
    });


})

app.get("/Directories", (req, res) => {
  res.json({
    "dirs": getDirectories("snippets")
  })
})

function promiseAllP(items, block) {
  var promises = [];
  items.forEach(function(item, index) {
    promises.push(function(item, i) {
      return new Promise(function(resolve, reject) {
        return block.apply(this, [item, index, resolve, reject]);
      });
    }(item, index))
  });
  return Promise.all(promises);
}

function readFiles(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, function(err, filenames) {
      if (err) return reject(err);
      promiseAllP(filenames,
          (filename, index, resolve, reject) => {
            fs.readFile(path.resolve(dirname, filename), 'utf-8', function(err, content) {
              if (err) return reject(err);
              return resolve({
                filename: filename,
                contents: content
              });
            });
          })
        .then(results => {
          return resolve(results);
        })
        .catch(error => {
          return reject(error);
        });
    });
  });
}
getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port)
});