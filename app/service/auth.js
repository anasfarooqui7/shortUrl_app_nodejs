// const sessionIdToUserMap = new Map(); for state maintain
const jwt = require("jsonwebtoken");
const secret = "farooqui@anas#123";

class AuthService {

    setUser(user){
      const payload = {
            _id: user.id,
            email: user.email,
            role:user.role
        };
        return jwt.sign(payload, secret);
    }

    // to get User from SessionID and this func we use to maintain the state
    getUser(token){
        if(!token) return null;
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
    
}

module.exports = AuthService;