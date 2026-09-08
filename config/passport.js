const passport = require("passport");
const { validatePassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;
const models = require("../models/index");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

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

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await models.User.findById({ id: jwt_payload.user.id });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);
