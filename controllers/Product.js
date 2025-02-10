const Product = require('../models/Product');
const configureUpload = require('../middlewares/fileupload');
const multer = require('multer');
const sendEmail = require('../utils/sendEmail');   
// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create product with file upload
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, category, imageurl } = req.body;

    const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        imageurl
    });

    try {
        const newProduct = await product.save();
        const productHTML =   `<h1>New Product Added</h1><br>
                            <pre>
                              <h2>Product name : ${name}</h2><br>
                              <h2>Product description : ${description}</h2><br>
                              <h2>Product price : ${price}</h2><br>
                              <h2>Product category : ${category}</h2><br>
                              <h2>Product stock : ${stock}</h2><br>
                              <img src="http://localhost:3002${imageurl}" alt="product image" style="width: 200px; height: 200px;">
                              </pre>`;

          sendEmail('kamaraj.balakrishnan@zucisystems.com','New Product Added','A new product has been added to the store',productHTML).then((info)=>{
            if (info.accepted.length > 0 && info.rejected.length === 0) {
              console.log('Email sent successfully:', info.accepted);
              res.status(201).json(newProduct);
            }
          }).catch((err)=>console.log(err));
          
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.uploadFile = (req, res) => {
        const upload = configureUpload(['image/png', 'image/jpg', 'image/jpeg']);
        
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: "Max file size 2MB allowed!" });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            } else if (!req.file) {
                return res.status(400).json({ message: "File is required!" });
            }
    
            return res.status(200).json({
                message: "Image uploaded successfully!",
                file: req.file.filename,
                fileUrl: `/uploads/${req.file.filename}`
            });
        });
}

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

