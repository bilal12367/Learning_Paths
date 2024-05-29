const passportJwt = require('passport-jwt')
const User = require('../schemas/User')

const passportConfig = (passport) => {
    const JwtStrategy = passportJwt.Strategy

    const jwtOptions = {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }

    const jwtStrategy = new JwtStrategy(
        jwtOptions,
        async (payload, done) => {
            if(await User.exists({_id: payload.userId})) {
                return done(null, payload);
            } else {
                done(null, false)
            }
        }
    )

    passport.use(jwtStrategy);

}

module.exports = passportConfig