const crypto = require('crypto')
const db = require('../config/Prisma')
const LocalStrategy = require("passport-local");

const strategy =  new LocalStrategy(function verify(username, password, err, cb) {
    const user = db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false, { message: "Incorrect username or password." });
    }
    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      function (hashedPassword) {
        if (err) {
          return cb(err);
        }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return cb(null, user);
      }
    );
  })

  module.exports = strategy