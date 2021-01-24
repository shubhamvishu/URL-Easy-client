const LocalStrategy = require('passport-local').Strategy ;
//const bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false,{ message: 'No user with this email found'});
        }
        try{
            //if(await bcrypt.compare(password, user.password)){
              if(password==user.password){  
                 return done(null, user);
            }
            else {
                return done(null, false, {message: 'Password did not match'});
            }
        }
        catch (e){
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'},authenticateUser));
    passport.serializeUser((user, done)   => {})
    passport.deserializeUser((user, done) => {})
}

module.exports = initialize;
