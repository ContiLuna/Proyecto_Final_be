const passportJWT = require("passport-jwt");
const User = require("../models/UserSchema");

const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const config = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: process.env.JWT_ALGORTIHM
}

const jwtStrategy = new JwtStrategy(config, async (payload, done) =>{
try {
    const user = await User.findById(payload.sub);
    if(!user){
        return done(null, false)
    }
    done(null, user)
} catch (error) {
    done(error, false)
}
})

module.exports = jwtStrategy;