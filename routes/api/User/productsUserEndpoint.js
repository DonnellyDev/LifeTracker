// router that handles req to /api/products
const express = require('express');
const router = express.Router();
const productModel = require('../../../models/API-models/productModel');


// Configure router by adding handlers



//Get Handler for /api/products

router.get('/',((req, res, next) => {
    productModel.find((err, products) => {
        if (err) {
            res.json('Error!').status(500);
        } else {
            res.json(products).status(200);
        }
    });
})
);
router.get('/?productName',((req, res, next) => {
    productModel.find({productName:req.query.productName},(err,product)=>{
        if(err){
            res.status(500).json(`Error `);
        }
        else{
            res.status(200).json(product);
        }

    });
}));

// Export the router for use
module.exports = router;












