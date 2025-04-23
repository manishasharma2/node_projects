const jwt = require('jsonwebtoken')
const secret = 'Mona@3112'

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email : user.email,
        role: user.role,
    }
        , secret);
}// this function will create tokens

function getUser(token){
    if(!token) return null;
    
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        return null;       
    }
}

module.exports = {getUser,setUser}