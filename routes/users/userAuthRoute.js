const express=require('express');
const router=express.Router()

const {creatUser, verifyOTP,signIn}=require('../../controller/users/userAuthController')

router.post('/register-user', creatUser)
router.post('/verify-otp',verifyOTP)
router.post('/sign-in', signIn)

module.exports=router