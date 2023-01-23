const db = require("../db/index");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
passport.use(
  new LocalStrategy(function verify(username, password, done) {
   console.log(username)
    db.query(
      'SELECT * FROM users WHERE username = $1',
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
        console.log(row.rows[0].username)
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
  db.query('SELECT * FROM users WHERE id = $1', [id], (user) => {
    return done(null, id);
  });
});
