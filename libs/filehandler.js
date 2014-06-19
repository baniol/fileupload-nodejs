var File = require('../models/file');

function fileHandler () {

}

fileHandler.prototype.save = function (fileInfo) {
  console.log(fileInfo);
};

module.exports = new fileHandler();
