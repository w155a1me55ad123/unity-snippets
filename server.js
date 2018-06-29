const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  app = express(),
  ReadSnippets = require("./helpers/ReadSnippets"),
  storage = require("node-persist");

storage.init();
//if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/:dir/all", (req, res) => {
  var data = [];
  ReadSnippets.readFiles("snippets" + "/" + req.params.dir)
    .then(files => {
      files.forEach((item, index) => {
        data.push(item);
      });
      res.json({
        data
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/readmeFirst", (req, res) => {
  ReadSnippets.readFiles("snippets" + "/" + "GettingStarted")
    .then(files => {
      files.forEach((item, index) => {
        res.json({
          data: item
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/Directories", (req, res) => {
  res.json({
    dirs: getDirectories("snippets"),
    numberOfSnippets: getSnippetsNumber()
  });
});
app.get("/favs/:snippet/get", (req, res) => {
  storage.getItem(req.params.snippet).then(e => {
    if (typeof e == "undefined") {
      storage.setItem(req.params.snippet, 0).then(() => {
        res.json({
          favs: 0
        });
      });
    } else {
      res.json({
        favs: e
      });
    }
  });
});
app.get("/favs/:snippet/increment", (req, res) => {
  console.log(req.params.snippet);
  storage.getItem(req.params.snippet).then(e => {
    storage.setItem(req.params.snippet, e + 1).then(() => {
      storage
        .getItem(req.params.snippet)
        .then(e => console.log("new favs : " + e));
      res.json({
        completed: true
      });
    });
  });
});
getDirectories = path => {
  return fs.readdirSync(path).filter(file => {
    return fs.statSync(path + "/" + file).isDirectory();
  });
};

getSnippetsNumber = () => {
  let n = [];
  for (var i = 0; i < getDirectories("snippets").length; i++) {
    n.push(fs.readdirSync("snippets/" + getDirectories("snippets")[i]).length);
  }
  return n;
};
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on port 5000 ");
});
