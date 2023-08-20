const ProductData=require('../../modules/products/product')

exports.createProduct = async (req, res) => {
    try {
      const { productName, description, price, discount } = req.body;
      const prdBanner = req.file.path; // Path to the uploaded image
  
      const newProduct = new ProductData({
        productName,
        description,
        price,
        prdBanner,
        discount,
      });
  
      const savedProduct = await newProduct.save();
      res.json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
   
  exports.getPoroduct= async (req, res)=>{
    try {
        const data= await ProductData.find();
        res.status(201).json({
            status:"product got",
            data:data
        })
    } catch (error) {
      console.log(error);  
    }
  }