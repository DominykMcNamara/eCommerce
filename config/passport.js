const db = require ('../db/index')
const passport = require('passport')
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')
passport.use(new LocalStrategy(function verify(username, password, done) {
    
    db.query('SELECT * FROM user WHERE username = $1', [username], (err, row) => {
        if (err) { return done(err)}
        if (!row) { return done(null, false, { message: 'Incorrect username or password'})}

       bcrypt.compare(password, row.password, (err, result) => {
        if (err) { return done(err) }
        if (!result) { return done(null, false, { message: 'Incorrect username or password'})}
       })
       return done(null, user)
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