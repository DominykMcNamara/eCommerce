const passport = require("passport");
const strategy = require("../utils/strategy");

passport.use(strategy);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

const authenticate = (next) => {
  passport.authenticate("local", {
    failureRedirect: "/",
    failureMessage: true,
  });
  next()
};
const authenticateSession = passport.authenticate("session");
module.exports = { authenticate, authenticateSession };
