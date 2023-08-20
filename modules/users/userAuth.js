const mongoose=require('mongoose')

const UserData=new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  otp:{
    type:String
  }
})
const userData=mongoose.model('userData', UserData)
module.exports=userData;