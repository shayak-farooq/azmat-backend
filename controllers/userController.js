const User = require('../models/usersModel')
async function handleSignup(req,res) {
    try{
        const{name,userName,email,password,phone} = req.body
        console.log(name,userName,email,password,phone)
        await User.create({
            name:name,
            userName:userName,
            email:email,
            password:password,
            phone:phone
        })
        res.end("user Created Successfully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {handleSignup}