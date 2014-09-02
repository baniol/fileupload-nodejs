'use strict';

var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
//var cookieParser  = require('cookie-parser');
var bodyParser      = require('body-parser');

var upload          = require('jquery-file-upload-middleware');

process.on('uncaughtException', function(err) {
    console.log('Threw Exception: ', err);
});

var uploadSettings = {
  acceptFileTypes: "(\.|\/)(gif|jpe?g|png|mp3|wmv|mp4|pls)$",
  maxFileSize: 10000000 // 10M
};

var dirs = require('./config').directors;

var app = express();

app.use('/upload/location', upload.fileHandler({
    tmpDir: __dirname + dirs.temp,
    uploadDir: __dirname + dirs.location,
    uploadUrl: dirs.location_url,
    acceptFileTypes: new RegExp(uploadSettings.acceptFileTypes, 'i'),
    maxFileSize: uploadSettings.maxFileSize,
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
    //imageTypes: /\.(gif|jpe?g|png)$/i
}));

// Actions on upload events
upload.on('end', function (fileInfo) {
    console.log(fileInfo);
});

upload.on('delete', function (fileName) {
    console.log(fileName);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('upload', { title: 'Blueimp fileuploader' });
});

app.get('/upload/settings', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(200, JSON.stringify(uploadSettings));
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

