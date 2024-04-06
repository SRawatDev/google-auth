const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: "",
            clientSecret: "",
            callbackURL: 'http://localhost:5000/auth/google/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            // Get the user data from Google 
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value,
              email: profile.emails[0].value
            };

            console.log("=========================",newUser)
            done(null, newUser);
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});