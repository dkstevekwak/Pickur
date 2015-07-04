var bluebird = require('bluebird');
var mongoose = require('mongoose');
var Poll = require('./server/models/poll-model').Poll;
var User = require('./server/models/poll-model').User;
var faker = require('faker');

var polls = [
    {
        question: 'Blue or Gold Dress?',
        category: 'fashion',
        answers: [
            { text: 'Blue', image: "http://cbsnews2.cbsistatic.com/hub/i/r/2015/02/27/bd5f63ce-8616-4c21-84d8-edd04b5a2ef0/thumbnail/620x350/20aa1c79b7d3ab16d20a621e51c48041/black-blue-white-gold-dress.jpg", count: 0 },
            { text: 'Gold', image: "http://cbsnews2.cbsistatic.com/hub/i/r/2015/02/27/bd5f63ce-8616-4c21-84d8-edd04b5a2ef0/thumbnail/620x350/20aa1c79b7d3ab16d20a621e51c48041/black-blue-white-gold-dress.jpg", count: 0}
        ],
        responseA: [],
        responseB: []
    },
    {
        question: 'Carry or Support',
        category: 'entertainment',
        answers: [
            { text: 'Carry', image: "http://cdn.dota2.com/apps/dota2/images/heroes/juggernaut_vert.jpg", count: 0 },
            { text: 'Support', image: "http://cdn.dota2.com/apps/dota2/images/heroes/crystal_maiden_vert.jpg", count: 0}
        ],
        responseA: [],
        responseB: []
    }
];
var users = [
  {
    firstname: 'Alex',
    lastname: 'Wang',
    gender: 'male',
    email: 'alex@test.com',
    password: 'test',
    bday: new Date("1985-06-23")
  },
  {
    firstname: 'Steve',
    lastname: 'Kwak',
    gender: 'male',
    email: 'steve@test.com',
    password: 'test',
    bday: new Date("1989-01-01")
  }
]

mongoose.connect('mongodb://localhost/pickur');

var wipeDB = function () {

    var models = [User, Poll];
    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return bluebird.resolve();
};

var seedPoll = function (num, userArr) {
    polls[0].creator = userArr[0];
    polls[1].creator = userArr[1];

    var generatePolls = function(num, userArr){
      for (var i = 0; i < num; i++){
        polls.push({
          question: 'Left or Right',
          category: faker.random.array_element(['fashion', 'entertainment', 'sports', 'food']),
          answers: [
            { text: 'Left', image: faker.image.image(), count: 0 },
            { text: 'Right', image: faker.image.image(), count: 0 } ],
          responseA: [],
          responseB: [],
          creator: faker.random.array_element(userArr)
        })
      }
    };
    var addPollData = function(userArr){
      polls.forEach(function(poll){
        userArr.forEach(function(user){
          if (faker.random.number(100) < 50) {
            poll.responseA.push(user._id);
            poll.answers[0].count++;
          } else {
            poll.responseB.push(user._id);
            poll.answers[1].count++;
          }
        })
      })
    }

    generatePolls(num, userArr);
    addPollData(userArr);



    return Poll.create(polls, function (err, pollList) {
        if (err) {
            console.error(err);
        }
        console.log('Polls seeded!');
        return pollList;
    });

};

var seedUsers = function(num){
  var youngest = new Date("2000-07-01");
  var oldest = new Date("1930-01-01");

  for (var i = 0; i < num; i++){
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      gender: faker.random.array_element(['male', 'female']),
      email: faker.internet.email(),
      bday: faker.date.between(oldest, youngest),
      password: faker.internet.password()
    })
  }

  return User.create(users, function(err, userList){
    if (err) {
      console.error(err);
    }
    console.log('Users seeded!');
    return userList;
  })
}
var killDb = function(){
  console.log('database seeded')
  process.kill(0);
}

mongoose.connection.once('open', function () {
    wipeDB().then(function(){
      return seedUsers(100)
    }).then(function(userList){
      return seedPoll(12, userList);
    }).then(killDb).catch(function(err){
      console.log(err);
    });
});