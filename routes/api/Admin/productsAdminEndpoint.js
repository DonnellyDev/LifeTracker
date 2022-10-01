// router that handles req to /api/products
const  express = require('express');
const router = express.Router();
const productModel = require('../../../models/API-models/productModel')


// Configure router by adding handlers

//Get Handler for /api/admin/products
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
// Post Handler for /api/admin/products > INPUT : JSON object containing info about product
router.post('/',(req,res,next)=>{

    if(!req.body.productName){
        res.status(400).json({"Validation Error": "Name is a required field"});
    }
    else if(!req.body.currentPrice){
        res.status(400).json({"Validation Error": "Current Price is a required field"});
    }
    else {
        productModel.create({
            productName: req.body.productName,
            description:req.body.description,
            currentPrice:req.body.currentPrice,
            purchaseDate:req.body.purchaseDate,
            storeName:req.body.storeName,
            saleDate:req.body.saleDate,
            lastSalePrice:req.body.lastSalePrice
        }, (err, newProduct) => {
            if (err) {
                console.log(err);
                res.json({'ErrorMessage': 'Server Threw an exception'}).status(500);
            } else {
                res.json(newProduct).status(200)
            }
        })
    }});
// Put /products/:_id > Input: Json object containing about the product
// Validate same way
router.put('/:_id',(req,res,next)=>{
    if(!req.body.productName){
        res.status(400).json({"Validation Error": "Name is a required field"});
    }
    else if(!req.body.currentPrice){
        res.status(400).json({"Validation Error": "Current Price is a required field"});
    }
    else {
        productModel.findOneAndUpdate({
                _id:req.params._id}, //filter query
            {
                productName: req.body.productName,
                description:req.body.description,
                currentPrice:req.body.currentPrice,
                purchaseDate:req.body.purchaseDate,
                storeName:req.body.storeName,
                saleDate:req.body.saleDate,
                lastSalePrice:req.body.lastSalePrice
            },
            (err,updatedProduct)=>{
                if (err) {
                    console.log(err);
                    res.status(500).json({'ErrorMessage': 'Server Threw an exception'});
                } else {
                    res.status(200).json(updatedProduct);
                }
            })
    }
})
// Delete /api/products/:_id
router.delete('/:_id',(req, res, next) => {
    productModel.remove(
        {_id:req.params._id},
        (error) => {
            if(error){
                console.log(error);
                res.status(500).json({"ErrorMessage":"Server threw an exception"});
            }
            else {res.status(200).json({'success':"true"});}
        })
});
// Export the router for use
module.exports = router;












