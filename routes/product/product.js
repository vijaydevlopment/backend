const express = require('express');
const multer = require('multer');
const path = require('path');
const {createProduct, getPoroduct} = require('../../controller/product/product');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, uniqueSuffix + extension);
    },
  });
  
  const upload = multer({ storage: storage });
const router = express.Router();

router.post('/create-product',upload.single('prdBanner'), createProduct)
router.get('/get-product', getPoroduct)

module.exports=router