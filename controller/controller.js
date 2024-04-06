const passport = require('passport');
const { Translate } = require('@google-cloud/translate');
// Google authentication route

const authenticateGoogle = (req, res, next) => {

    return passport.authenticate('google', {
        scope: ['email', 'profile'],
    })(req, res, next);
}

// Google authentication callback route
const authenticateGoogleCallback = (req, res, next) => {
    console.log("------------------", req.profile)

    return passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure',
    })(req, res, next);
}

// Failure route
const googleAuthFailure = (req, res) => {
    res.send('Something went wrong!');
}
// Protected route
const protectedRoute = (req, res) => {
    let name = req.user.displayName;
    res.send(`Hello ${name}`);
}
// Logout route
const logout = (req, res) => {
    req.session.destroy();
    console.log(req.session.destroy())
    res.send('See you again!');
}
const home = (req, res) => {
    res.sendFile('index.html');

}


const translator = async (request, response) => {
    try {
        const jsonText = request.body()
        const translate = new Translate();
        // The target language.
        const target = 'es';
        const data = await translate.translate(jsonText, target)
        // .then((response) => {
        //     const translatedJsonText = response[0].translation;
        //     console.log(translatedJsonText);
        // });
        return response.status(200).json(
            {
                data: data,
                status: true
            }
        )

    } catch (error) {
        return response.status(500).json(
            {
                message: error.message,
                status: false
            }
        )

    }
}


module.exports = { logout, protectedRoute, googleAuthFailure, authenticateGoogle, authenticateGoogleCallback, home, translator }