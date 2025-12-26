const User = require('../models/usersModel');
const { setUser, getUser } = require('../services/Auth');
const transporter = require('../services/NodeMailer');
const bcrypt = require('bcryptjs')
require('dotenv/config')

// Temporary storage
const tempStorage = {}
// delete temp storage after 10 minutes
function deleteTempStorage(store, key) {
    setTimeout(() => {
        console.log(`deleted`)
        delete store[key]
    }, 10 * 60 * 1000)
}
// otp generation function
function generateOTP() {
    const otp = Math.floor(Math.random() * 900000 + 100000)
    return otp
}

async function handleSignup(req, res) {
    try {
        const { name, email, password } = req.body
        const user = await User.find({ email })
        if (user.email) {
            return res.status(409).json({ err: "user already exists" })
        }
        // Hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        let OTP = generateOTP()
        console.log(OTP)
        // storing name and hashed password
        tempStorage[email] = {
            name,
            hashedPassword,
            OTP
        }
        deleteTempStorage(tempStorage, email)
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP for Signup",
            text: `your OTP is ${OTP} valid for 10 minutes.\nplease Do not share it with anyone`, // plain‑text body
        });
        console.log("Message sent:", info.messageId);

        return res.status(200).json({ message: `otp sent successfully on ${email}`, email: email })
    }
    catch (err) {
        console.log(err)
    }
}
async function verifySignupOtp(req, res) {
    try {
        const { name, email, otp } = req.body
        console.log(req.body)
        console.log(tempStorage[email])
        if (!otp) {
            return res.status(403).json({ err: "otp is required" })
        }
        if (!tempStorage[email]) {
            return res.status(403).json({ err: "OTP expired or invalid email" })
        }
        if (Number(otp) !== tempStorage[email].OTP) {
            return res.status(403).json({ err: `invalid otp` })
        }
        // save user to database
        const user = await User.create({
            email: email,
            name: name,
            password: tempStorage[email].hashedPassword
        })
        // empty temporary storage after being used
        delete tempStorage[email]
        const token = setUser(user)
        console.log(token)
        return res.status(200).json({ token:token, message: 'signup successfull' })
    } catch (err) {
        console.log(err);
    }
}
async function handleLogin(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const user = await User.findOne({ email })
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ err: `invalid email or passoword` })
        }
        const token = setUser(user)
    return res.status(200).json({ token: token,role:user.role, message: 'login successfully' })
} catch (err) {

}
}
async function handleForgetPassword(req, res) {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ err: "email not found" })
    }
    let OTP = generateOTP()
    console.log(OTP)
    tempStorage[email] = { OTP }
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for forget password",
        text: `your OTP is ${OTP} valid for 10 minutes.\nplease Do not share it with anyone`, // plain‑text body
    });
    console.log("Message sent:", info.messageId);
    return res.status(200).json({ message: `Otp sent on email:${email}` })
}

async function verifyForgetOtp(req, res) {
    const { email, otp } = req.body

    if (otp !== tempStorage[email].OTP) {
        return res.json({ err: "invalid otp" })
    }
    if (!tempStorage[email].OTP) {
        return res.json({ err: "OTP expired" })
    }
    return res.status(200).json({ message: "OTP verified" })
}
async function handleProfile(req,res){
    try {
        const user = await User.findById(req.user._id)
        return res.status(200).json({name:user.name,email:user.email,address:user.address,role:user.role,id:user._id,phone:user.phone})
    } catch (err) {
        
    }
}
async function addAddress(req,res){
    try {
        const {phone,...address} = req.body
        console.log('phone',phone)
        console.log('address',address)
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push:{
                    phone:phone,
                    address:address}
            },
            {new:true}
        )
        console.log(user)
        return res.status(200).json({name:user.name,address:user.address,id:user_id,phone:user.phone})
    } catch (err) {
        
    }
}
async function deleteAddress(req,res){
    try {
        const addressid = req.params.id
        console.log(addressid)
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull :{address:{_id : addressid}}
            },
            {new:true}
        )
        console.log(user.address)
        return res.status(200).json({name:user.name,address:user.address,id:user_id})
        
    } catch (err) {
        
    }
}
async function updateAddress(req,res){
    try {
        const addressid = req.params.id
        console.log(addressid)
        console.log(req.body)

        const user = await User.findOneAndUpdate(
            {
                _id:req.user._id,
                'address._id' :addressid
            },
            {
                $set :{"address.$":req.body}
            },
            {new:true}
        )
        console.log(user.address)
        return res.status(200).json({name:user.name,address:user.address,id:user_id})
        
    } catch (err) {
        
    }
}

module.exports = { handleSignup, verifySignupOtp, handleLogin, handleForgetPassword, verifyForgetOtp,handleProfile,addAddress,deleteAddress,updateAddress }