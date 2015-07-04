var bluebird = require('bluebird');
var mongoose = require('mongoose');
var Poll = require('./server/models/poll-model').Poll;
var faker = require('faker');

var polls = [
    {
        question: 'Blue or Gold Dress?',
        category: 'fashion',
        answers: [
            { text: 'Blue', image: "http://cbsnews2.cbsistatic.com/hub/i/r/2015/02/27/bd5f63ce-8616-4c21-84d8-edd04b5a2ef0/thumbnail/620x350/20aa1c79b7d3ab16d20a621e51c48041/black-blue-white-gold-dress.jpg", count: 5 },
            { text: 'Gold', image: "http://cbsnews2.cbsistatic.com/hub/i/r/2015/02/27/bd5f63ce-8616-4c21-84d8-edd04b5a2ef0/thumbnail/620x350/20aa1c79b7d3ab16d20a621e51c48041/black-blue-white-gold-dress.jpg", count: 2}
        ]
    },
    {
        question: 'Carry or Support',
        category: 'entertainment',
        answers: [
            { text: 'Carry', image: "http://cdn.dota2.com/apps/dota2/images/heroes/juggernaut_vert.jpg", count: 5 },
            { text: 'Support', image: "http://cdn.dota2.com/apps/dota2/images/heroes/crystal_maiden_vert.jpg", count: 2}
        ]
    }
];






mongoose.connect('mongodb://localhost/pickur');

var wipeDB = function () {

    var models = [Poll];

    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return bluebird.resolve();

};

var seed = function (num) {
    for (var i = 0; i < num; i++){
        polls.push({
            question: 'Left or Right',
            category: faker.random.array_element(['fashion', 'entertainment', 'sports', 'food']),
            answers: [
                { text: 'Left', image: faker.image.image(), count: faker.random.number(100) },
                { text: 'Right', image: faker.image.image(), count: faker.random.number(100)} ]
        })
    }


    Poll.create(polls, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Database seeded!');
        process.kill(0);
    });

};

mongoose.connection.once('open', function () {
    wipeDB().then(seed(10));
    //seed();
});