const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const UserModel = require("../model/UserModel");
const JwtStrategy = require("passport-jwt").Strategy;

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await UserModel.findOne({ _id: payload.id });
      done(null, user);
    }
  )
);
