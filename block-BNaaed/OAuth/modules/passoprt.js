var passport = require("passport");

var GithubStrategy = require("passport-github").Strategy

var User = require("../models/User")

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret :process.env.SECRET_ID,
    callbackURL:"/auth/github/callback"
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile)

    var userInfo ={
        name : profile.displayName,
        email :profile._json.email,
        username: profile.username,
        photo: profile._json.avatar_url,
    }

    User.findOne({email:profile._json.email}, (err, user)=>{
        if(err) return done(err)
        if(!user){
            console.log(userInfo)
            User.create(user, (err, addedUser)=>{
                if(err) return done(err)
                return done(null, addedUser);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});