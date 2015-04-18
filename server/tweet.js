var twit = require('twitter');
var util = require('util');

var twitter = new twit({
  consumer_key: 'Cp3vOSeRjPEszIZoCJ5Hd8Jwa',
  cosumer_secret: 'HafULgs7Zp6g6RgYh9qSO0Ii6xFDbeaEjqRcfWdYsAeYDQlUFP',
  access_token_key: '3164977090-RcLHDRjDMsbEsTvpp4Z5NEjnATrkZrQMAhru2tE',
  access_token_secret: '46BqIH36HI1PIp045LLqiUXG87Ot2U7zWkOOmuIYcxHBr'
});

 twitter.get('/search/tweets.json', function(error, params, response) {
            if (error) throw error;
            console.log(response)
        }