var path = require('path');
var express = require('express');
var PollModel = require('./models/poll-model');
var nodeSass   = require('node-sass-middleware');
var bodyParser = require('body-parser');


var app = express(); // Create an express app!
module.exports = app; // Export it so it can be require('')'d

// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../public');
var destPath = path.join(__dirname, '../public')
var sourcePath = path.join(__dirname, '../assets');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../index.html');

var sassMiddleware = nodeSass({
  src: sourcePath,
  dest: destPath,
  debug: true
});
app.use(sassMiddleware);
// The path of our index.html file. ([ROOT]/index.html)

// http://nodejs.org/docs/latest/api/globals.html#globals_dirname
// for more information about __dirname

// http://nodejs.org/api/path.html#path_path_join_path1_path2
// for more information about path.join

// When our server gets a request and the url matches
// something in our public folder, serve up that file
// e.g. angular.js, style.css
app.use(express.static(publicPath));
app.use('/bower_components', express.static(bowerPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// If we're hitting our home page, serve up our index.html file!


app.get('/poll', function (req, res) {

    var modelParams = {};

    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

     PollModel.find(modelParams, function (err, poles) {
        setTimeout(function () {
            res.send(poles);
        }, Math.random() * 1000);
    });

});

app.post('/poll', function(req,res,next){
  var newPole = new PollModel();
  var body= req.body;

  newPole.question = body.question;
  newPole.category = body.category;
  newPole.answers = body.answers;

  PollModel.create(newPole, function(err,savedPoll){
    if(err) return next(err); 
    res.json(savedPoll);
  });

  // PollModel.create(body, function(err,card){
  //   if(err) return next(err); 
  //   res.json({
  //     question:card.question,
  //     category:card.category,
  //     answers:card.answers
  //   });    
  // })

})

app.put('/poll/:pollId', function(req,res,next){
  var pollId = req.params.pollId;
  var body = req.body;

  PollModel.findById(pollId, function(err,poll){
    poll.question=body.question;
    poll.category=body.category;
    poll.answers=body.answers;
    poll.save(function(err){
      res.json(poll);
      });
  });
});    

app.get('/*', function (req, res) {
    res.sendFile(indexHtmlPath);
});

