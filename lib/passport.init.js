const passport = require('passport')
const fs = require('fs')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const getTwitterFollowers = require('get-twitter-followers')
const { 
  TWITTER_CONFIG
} = require('../config')

module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))
  
  // The callback that is invoked when an OAuth provider sends back user 
  // information. Normally, you would save the user to the database 
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => { 
	let token = {
		consumer_key:        'wavHx57Fil2dXwV89YklPGMAU',
		consumer_secret:     '196Z0j8cRescAteufeb3IrY7bzUEw0ltJd7cMJ11t7mdcXzkvE',
		access_token:        accessToken,
		access_token_key:    accessToken,
		access_token_secret: refreshToken
	}

	getTwitterFollowers(token, profile.username).then(follower => {
	let data = {
		access: accessToken,
		refresh: refreshToken,
		prof: profile,
		followers: follower
	}
	
	cb(null, data);
	})
	}

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))

}
