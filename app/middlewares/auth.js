const Auth_userSession = require('../service/auth.js');

class restrictToLoggin {
    checkForAuthentication(req, res, next){
        const tokenCookies = req.cookies?.token;
        req.user = null;
        // check authorization and also check if the token is start with Bearer or not
        if(!tokenCookies){
            return next();
        }

        // get token
        const token = tokenCookies;

        const user = new Auth_userSession;
        const loginUser = user.getUser(token);

        req.user = loginUser;
        return next();
    }

    // to check role wise
    restrictTo(roles = []) {
        return function (req, res, next) {
            // Check if the user is authenticated
            if (!req.user) {
                return res.redirect("/login");
            }

            // Check if the logged-in user's role is allowed
            if (!roles.includes(req.user.role)) {
                return res.status(403).end("Unauthorized");
            }

            // If everything is fine, proceed to the next middleware or route handler
            next();
        };
    }
}

module.exports = restrictToLoggin;