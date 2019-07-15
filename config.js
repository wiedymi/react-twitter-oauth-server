const providers = ['twitter']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://availjs.herokuapp.com/${provider}/callback`
    : `https://localhost:8080/${provider}/callback`
})

const [twitterURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://availjs.netlify.com'
  : ['http://127.0.0.1:3000', 'http://localhost:3000']

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: twitterURL,
includeEmail: true,
userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
}
