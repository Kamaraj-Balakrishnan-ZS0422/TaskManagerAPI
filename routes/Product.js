const express = require('express');
const router = express.Router();

const {
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        uploadFile,
        deleteProduct} = require('../controllers/Product');

router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.post('/',createProduct);
router.post('/uploadfile',uploadFile);
router.patch('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;
