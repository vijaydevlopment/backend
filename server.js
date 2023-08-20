const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const app=express();
require('dotenv').config();
const userAuthRoute=require('./routes/users/userAuthRoute')
const productRouter =require('./routes/product/product')
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// db connection start
mongoose.connect(process.env.mongo_url,{ useUnifiedTopology: true })
.then((res)=>{
    console.log(`db connected successfully `);
}).catch((err)=>{
    console.log(err);
})
// db connection end
app.use('/uploads', express.static('uploads'));
app.use('/api', userAuthRoute)
app.use('/product',productRouter)
app.use('/', (req, res)=>{
  res.send('server is running ok')
})
app.listen(process.env.port,()=>{
    console.log('server is running at http://localhost:9090');
})