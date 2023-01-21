const db = require("../db/index");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
passport.use(
  new LocalStrategy(function verify(username, password, done) {
   
    db.query(
      'SELECT * FROM "User" WHERE username = $1',
      [username],
      (err, row) => {
        if (err) {
          return done(err);
        }
        if (!row) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        bcrypt.compare(password, row.rows[0].password, (err, result) => {
          if (err) {
            return done(err);
          }
          if (!result) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
        });
        console.log('Welcome!')
        return done(null, row.rows[0]);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  console.log(user)
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM "User" WHERE id = $1', [id], (user) => {
    return done(null, id);
  });
});
