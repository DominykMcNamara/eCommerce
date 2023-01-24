const passport = require("passport");
const LocalStrategy = require("passport-local");

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log(username)
      try {
        const user = await AuthServiceInstance.login({
          email: username,
          password,
        });
        console.log(user)
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null,  {id} );
  });

  return passport;
};
