var path = require('path');
var express = require('express');
var PollModel = require('./models/poll-model');
var nodeSass   = require('node-sass-middleware');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var app = express(); // Create an express app!
module.exports = app; // Export it so it can be require('')'d
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../public');
var destPath = path.join(__dirname, '../public')
var sourcePath = path.join(__dirname, '../assets');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../index.html');
var categoryHtmlPath = path.join(__dirname, '../public/templates/category.html');

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


app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'tongiscool'
  // cookie: {
  //   secure: true
  // }
}));

// starts passport
app.use(passport.initialize());
// link up to our express sessions on req
app.use(passport.session());

// telling passport how to attach a user to a session
passport.serializeUser(function(user, done) {
  console.log('serializing', user);
    done(null, user._id);
});
// telling passport how to get an actual user from the session
passport.deserializeUser(function(id, done) {
    PollModel.User.findById(id, function(err, user) {
      console.log('deserializing', user);
        done(err, user);
    });
});

// authenticate with the facebook strategy
// ...yet to be defined
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/#/profile',
    failureRedirect : ''
  }));


  var fbconfig = require('./config.json').facebook;

  // don't forget to install passport-facebook
  var FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(
      new FacebookStrategy(fbconfig,
      function(token, refreshToken, profile, done) {
        // find a user based on the email in the profile
        // found:
        //    call done with the found user
        // not found:
        //    create a user and then `done` with them
        // don't forget about error handling
        // don't forget to update with profile data and token
      console.log('profile', profile);
        PollModel.User.findOne({'facebook.id': profile.id}, function (err, user) {
          if (err) done(err);
          else if (user) done(null, user);
          else {
            PollModel.User.create({
              facebook: {
                id: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                gender: profile.gender,
                token: token,
                email: profile.emails[0].value
              }
            }, function (err, created) {
              if (err) done(err);
              else done(null, created);
            });
          }
        });
      })
  );




app.get('/poll', function (req, res) {  //requests polls

   var modelParams = {};

   if (req.query.category) {
       modelParams.category = req.query.category;
   }

    PollModel.Poll.find(modelParams, function (err, poles) {
       // setTimeout(function () {
           res.send(poles);
       // }, Math.random() * 1000);
   });

});



app.post('/poll', function(req,res,next){
 var newPoll = new PollModel.Poll();

 var body= req.body;

 newPoll.question = body.question;
 newPoll.category = body.category;
 newPoll.answers = body.answers;

 PollModel.Poll.create(newPoll, function(err,savedPoll){
   if(err) return next(err); 
   res.json(savedPoll);
 });
});
 app.post('/newUser', function(req,res,next){
  var newUser = new PollModel.User();

   var body= req.body;


   newUser.password = body.password;
   newUser.firstname= body.firstname;
   newUser.lastname= body.lastname;
   newUser.gender= body.gender;
   newUser.email= body.email;
   newUser.bday= body.bday;

 PollModel.User.create(newUser, function(err,savedUser){
   if(err) return next(err); 
   req.session._id = savedUser._id;
   res.sendStatus(200);
 });
});

 app.post('/login', function(req,res,next){
   var body= req.body;
   PollModel.User.findOne({email:body.email,password:body.password}, function(err,foundUser){
    if(err) return next(err);
    else if(!foundUser) res.sendStatus(401);
    else {
      req.session._id=foundUser._id;
      res.sendStatus(200);
    }

   })
 })

app.get('/logout', function(req,res,next){
   req.session.destroy(function(err){
    if(err) next(err);
    res.sendStatus(200);
   })
 })

app.get('/getuser', function(req,res,next){
   PollModel.User.findById(req.session._id, function(err,user){
    
    res.send(user);
   })
 })

// google image API GET request
app.get('/getimage', function(req,res,next){
  var searchWord = req.query.searchWord;
  request('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&q='+searchWord)
    .then(function(response){
      var parsed =JSON.parse(response[0].body);
      res.json(parsed)
    })
})

app.get('/getvideo', function(req,res,next){
  var queryParams = {
      q: req.query.searchWord,
      part: 'snippet',
      order: 'relevance',
      type: 'video',
      videoEmbeddable: 'true',
      key: 'AIzaSyB2RZQLoox_EP5f1X9vHv000R8VTx5R8Tg',
      maxResults: 8
    };

    request({ url: 'https://www.googleapis.com/youtube/v3/search', qs: queryParams })
    .then(function(response) {
      var filteredSongs = filterYoutubeResults(response[0].body);
      console.log(filteredSongs)
      res.send(filteredSongs);
    }).catch(function(err) {
      next(err);
    });
})

function filterYoutubeResults(youtubeResults) {
  return JSON.parse(youtubeResults).items
      .map(function(video) {
        return { videoId: video.id.videoId };
      });
}
 // PollModel.Poll.create(body, function(err,card){
 //   if(err) return next(err); 
 //   res.json({
 //     question:card.question,
 //     category:card.category,
 //     answers:card.answers
 //   });    
 // })



// app.post('/pollsubmit/:pollId', function(req, res, next){ //route for updating poll submissions
//    var pollId = req.params.pollId;
//    var body = req.body;


//    PollModel.Poll.findById(pollId, function(err,poll){
//        poll.responses.push(body.choice);
//        poll.save(function(err){
//            res.json(poll);
//        });
//    });

// })

app.put('/poll/:pollId', function(req,res,next){ //update polls
 var pollId = req.params.pollId;
 var body = req.body;

 PollModel.Poll.findById(pollId, function(err,poll){
  if(!req.session._id) res.sendStatus(401);
  else{
    console.log(body)
   poll.question=body.question;
   poll.category=body.category;
   poll.answers=body.answers;
   poll.responses.push(body.answer);
   poll.save(function(err){
     console.log("left", poll.results.left);
     console.log("right", poll.results.right);
     res.json(poll);

     });
   }
 });
});    


app.get('/*', function (req, res) {
   res.sendFile(indexHtmlPath);
});

// app.get('/poll/category/Fashion', function (req, res) {
//    res.sendFile(categoryHtmlPath);
// });

