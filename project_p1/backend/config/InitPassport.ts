import passport, { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from "passport-jwt";
import UserRepository from "../schema/UserRepository";
import { User } from "../util/types/AuthTypes";


const init_Passport = (passport: PassportStatic) => {
    var opts: StrategyOptionsWithoutRequest = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string,
        // algorithms: ["RS512","HS256"],
    }
    passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
        console.log("JWT Payload: ", jwtPayload);
        const userId = jwtPayload?._id;
        const requestUser: User | null = await UserRepository.findById(userId);
        if (requestUser) {
            return done(null, requestUser);
        } else {
            return done("User not found from jwt strategy", null)
        }
    }))

}

export default init_Passport