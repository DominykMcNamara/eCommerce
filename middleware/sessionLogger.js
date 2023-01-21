const sessionLogger = ((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
  });

  module.exports = sessionLogger