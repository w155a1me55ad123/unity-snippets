const path = require("path"),
  fs = require("fs");

exports.promiseAllP = (items, block) => {
  var promises = [];
  items.forEach(function(item, index) {
    promises.push(
      (function(item, i) {
        return new Promise(function(resolve, reject) {
          return block.apply(this, [item, index, resolve, reject]);
        });
      })(item, index)
    );
  });
  return Promise.all(promises);
};

exports.readFiles = dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) return reject(err);
      this.promiseAllP(filenames, (filename, index, resolve, reject) => {
        fs.readFile(
          path.resolve(dirname, filename),
          "utf-8",
          (err, content) => {
            if (err) return reject(err);
            return resolve({
              filename: filename,
              contents: content
            });
          }
        );
      })
        .then(results => {
          return resolve(results);
        })
        .catch(error => {
          return reject(error);
        });
    });
  });
};
