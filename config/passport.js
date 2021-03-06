const PassportJWT = require('passport-jwt');
const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;
const secret = process.env.SECRET;

const UserModel = require('../models/UserModel');

// Options for passport-jwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};


// Create a function for authentication each express request
const initPassportStrategy = (passport) => {
    const theJwtStrategy = new JwtStrategy(opts, (jwtPayload, done)=>{
        UserModel
        .findById(jwtPayload.id)
        .then((theUser)=>{
            if(theUser) {
                return done(null, theUser);
            }
            else {
                return done(null, false);
            }
        })
        .catch((err)=>{
            console.log('error', err);
            return done(null, null);
        })
    });

    passport.use(theJwtStrategy)
}

module.exports = initPassportStrategy;

