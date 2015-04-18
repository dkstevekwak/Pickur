var twit = require('twitter');
var util = require('util');

var twitter = new twit({
  consumer_key: '7gyJglLOugx3A1SHs0m8fyjEZ',
  cosumer_secret: 'Axb2WySUsJ2NQ5ys5A21vbioMFUohAUY6NiqOzgsywXnInq9fi',
  access_token_key: '3164977090-RcLHDRjDMsbEsTvpp4Z5NEjnATrkZrQMAhru2tE',
  access_token_secret: '46BqIH36HI1PIp045LLqiUXG87Ot2U7zWkOOmuIYcxHBr'
})


 twitter.get('/search/tweets.json', function(response) {
            
            console.log(response)
        })