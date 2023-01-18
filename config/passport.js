const db = require ('../db/index')
const passport = require('passport')
const LocalStrategy = require('passport-local');
var crypto = require('crypto');

passport.use(new LocalStrategy(function verify(username, password, done) {
    db.query('SELECT * FROM user WHERE username = $1', [username], (err, row) => {
        if (err) { return done(err)}
        if (!row) { return done(null, false, { message: 'Incorrect username or password'})}

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) { return done(err)}
            if(!crypto.timingSafeEqual(row.password, hashedPassword)) {
                return done(null, false, { message: 'Incorrect username or password.' })
            }
            return done(null, row)
        })
    })
}))

passport.serializeUser((user, done) => {
   return done(null, { id: user.id, username: user.username })
})

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM user WHERE id = $1', [id], (user) => {
    return done(null, user)
})
})