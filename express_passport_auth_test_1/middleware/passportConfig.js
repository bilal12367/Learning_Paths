
import passport from "passport";
import passportjwt, { ExtractJwt } from 'passport-jwt'
import { UserModel } from "../schema/User.js";
import UserNotFoundError from "../errors/UserNotFoundException.js";

const PassportConfig = (passport) => {
    const JwtStrategy = passportjwt.Strategy

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }

    const jwtStrategy = new JwtStrategy(
        jwtOptions,
        async (payload, done) => {
            if(await UserModel.exists({_id: payload.userId})) {
                return done(null, payload);
            } else {
                done(null, false)
            }
        }
    )

    passport.use(jwtStrategy);

}
export default PassportConfig