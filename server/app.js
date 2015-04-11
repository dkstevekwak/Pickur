var path = require('path');
var express = require('express');
var PolesModel = require('./models/poles-model');
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


app.get('/poles', function (req, res) {

    var modelParams = {};

    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

     PolesModel.find(modelParams, function (err, poles) {
        setTimeout(function () {
            res.send(poles);
        }, Math.random() * 1000);
    });

});

app.post('/poles', function(req,res,next){
  var newPole = new PolesModel();
  var body= req.body;

  newPole.question = body.question;
  newPole.category = body.category;
  newPole.answers = body.answers;

  PolesModel.create(newPole, function(err,savedPoll){
    if(err) return next(err); 
    res.json(savedPoll);
  });

  // PolesModel.create(body, function(err,card){
  //   if(err) return next(err); 
  //   res.json({
  //     question:card.question,
  //     category:card.category,
  //     answers:card.answers
  //   });    
  // })

})

app.put('/poles/:polesId', function(req,res,next){
  var polesId = req.params.polesId;
  var body = req.body;

  PolesModel.findById(polesId, function(err,pole){
    pole.question=body.question;
    pole.category=body.category;
    pole.answers=body.answers;
    pole.save(function(err){
      res.json(pole);
      });
  });
});    

app.get('/*', function (req, res) {
    res.sendFile(indexHtmlPath);
});

