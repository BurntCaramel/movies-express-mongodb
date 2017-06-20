const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwtSecret = 'SECRET!'
const jwtAlgorithm = 'HS256'

function signTokenHandler(req, res) {
  const user = req.user
  const token = jwt.sign({ email: user.email }, jwtSecret, { algorithm: jwtAlgorithm, subject: user._id.toString() })
  res.json({ token })
}

// Logging in with username/password
passport.use(
  User.createStrategy()
)

// JWT
passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm],
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader()
    },
    (jwtPayload, done) => {
      const userID = jwtPayload.sub
      User.findById(userID)
        .then(user => {
          if (user) {
            done(null, user)
          }
          else {
            done(null, false)
          }
        })
        .catch(error => {
          done(new Error(`User not found with ID: ${userID}`), false)
        })
    }
  )
)

function registerMiddleware(req, res, next) {
  const user = new User({ email: req.body.email })
  User.register(user, req.body.password, (error) => {
    if (error) {
      next(error)
      return
    }

    req.user = user
    next()
  })
}

module.exports = {
  signTokenHandler,
  authenticateSignIn: passport.authenticate('local', { session: false }),
  authenticateJWT: passport.authenticate('jwt', { session: false }),
  initialize: passport.initialize(),
  register: registerMiddleware
}