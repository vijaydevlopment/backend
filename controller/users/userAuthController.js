const userData =require('../../modules/users/userAuth')
const nodemailer=require('nodemailer')
const crypto=require('crypto')
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service (e.g., Gmail, Outlook, etc.)
    auth: {
      user:process.env.user_email, // Replace with your email address
      pass:process.env.user_pass, // Replace with your email password
    },
  });
  
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
exports.creatUser= async (req, res)=>{
    const { name, email } = req.body;
    
    const existingUser = await  userData.findOne({email});
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const otp = generateRandomNumber(10000, 99999).toString();
    // const otp = crypto.randomBytes(5).toString('hex');
    const data=await userData.create({name, email, otp})
    const mailOptions = {
        from:'niraj.inquiry@gmail.com',
        to: email,
        subject: 'Registration OTP',
        text: `Your OTP is: ${otp}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
          console.error('Error sending OTP:', error);
          return res.status(500).json({ error: 'Failed to send OTP' });
        }else{
            res.json({ message: 'OTP sent' });
        }
        
        
      });
      res.status(200).json({
        status:"user created",
        data:data
      })
}

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    
    try {
      const user = await userData.findOne({ email });
     console.log({user});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.otp === otp) {
        // OTP matches, perform any further actions
        // For example, you can update the user's verification status or log them in
        // You should replace this with your actual logic
  
        return res.status(201).json({ message: 'OTP verified successfully' });
      } else {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.signIn = async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingUser = await userData.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not registered' });
      }
  
      const otp = generateRandomNumber(10000, 99999).toString();
      // const otp = crypto.randomBytes(5).toString('hex');
      existingUser.otp = otp;
      await existingUser.save();
  
      const mailOptions = {
        from: 'niraj.inquiry@gmail.com',
        to: email,
        subject: 'Sign-In OTP',
        text: `Your Sign-In OTP is: ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending OTP:', error);
          return res.status(500).json({ error: 'Failed to send OTP' });
        } else {
          res.json({ message: 'OTP sent for sign-in' });
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  


  