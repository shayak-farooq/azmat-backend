const { getUser } = require("../services/Auth")

function isAuthorized(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).json({err:"No authorization token"})
    }
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(401).json({err:"Not Authorized"})
    }
    const user = getUser(token)
    if (!user){
        return res.status(401).json({err:"Not Authorized"})
    }
    req.user = user
    console.log('middleware',user)
    next()
}
function isAdmin(req,res,next){
    const role = req.user.role
    if(role !== 'ADMIN'){
        return res.status(401).json({err:"Not Authorized"})
    }
    next()

}

module.exports = {isAdmin,isAuthorized}