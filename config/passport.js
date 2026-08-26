const passport = require("passport");
const { validatePassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;
const models = require("../models/index");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await models.User.findByUsername(username);

      if (!user) {
        return done(null, false);
      }

      const match = await validatePassword(password, user.password);

      if (!match) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
