var path = require('path');
var express = require('express');
var FlashCardModel = require('./models/flash-card-model');
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


app.get('/cards', function (req, res) {

    var modelParams = {};

    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

     FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, Math.random() * 1000);
    });

});

app.post('/cards', function(req,res,next){
  var newCard = new FlashCardModel();
  var body= req.body;

  newCard.question = body.question;
  newCard.category = body.category;
  newCard.answers = body.answers;

  console.log(newCard);
  FlashCardModel.create(newCard, function(err,savedCard){
    if(err) return next(err); 
    res.json(savedCard);
  });

  // FlashCardModel.create(body, function(err,card){
  //   if(err) return next(err); 
  //   res.json({
  //     question:card.question,
  //     category:card.category,
  //     answers:card.answers
  //   });    
  // })

})

app.put('/cards/:flashCardId', function(req,res,next){
  var flashCardId = req.params.flashCardId;
  var body = req.body;

  FlashCardModel.findById(flashCardId, function(err,card){
    card.question=body.question;
    card.category=body.category;
    card.answers=body.answers;
    console.log(card);
    card.save(function(err){
      res.json(card);
      });
  });
});    

app.get('/*', function (req, res) {
    res.sendFile(indexHtmlPath);
});

