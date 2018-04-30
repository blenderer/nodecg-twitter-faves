const Twit = require('twit')
const config = require('./twitter');

const T = new Twit({
  consumer_key:         config.TWITTER_API_KEY,
  consumer_secret:      config.TWITTER_API_SECRET,
  access_token:         config.TWITTER_ACCESS_TOKEN,
  access_token_secret:  config.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})



module.exports = function (nodecg) {
  const twitterFaves = nodecg.Replicant('twitterFaves', {defaultValue: [], persistent: false});
  const presentedTweet = nodecg.Replicant('presentedTweet', {defaultValue: null, persistent: true});


  var stream = T.stream('statuses/filter', { track: 'trump' })

  stream.on('tweet', function (tweet) {
    if (tweet.text[0] !== 'R' && tweet.text[1] !== 'T') {
      twitterFaves.value = twitterFaves.value.slice(0, 14);
      twitterFaves.value.unshift(tweet);
    }
  });

  nodecg.listenFor('presentTweet', (value) => {
    presentedTweet.value = value;
  });
};
