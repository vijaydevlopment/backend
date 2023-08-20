const mongoose=require('mongoose')

const Product=new mongoose.Schema({
  productName:{
    type:String
  },
  description:{
    type:String
  },
  price:{
    type:String
  },
  prdBanner:{
    type:String
  },
  discount:{
    type:String,
    default:false
  }
})

const ProductData=mongoose.model('ProductData', Product)
module.exports=ProductData