const express = require("express");
const router = express.Router();
const { getProductsByCategory, getPopularProducts, getRecommendedProduct, getSingleProduct, search } = require("../../controllers/products");
const { getSellerInformation } = require("../../controllers/seller");
const { getCategories, getAllCategories } = require("../../controllers/categories");

// Define the routes using the 'router' instance
router.get("/getRecommendedProduct", getRecommendedProduct);
router.get("/getPopularProduct/:category", getPopularProducts);
router.get("/getSellerInformation/:id", getSellerInformation);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getProductsByCategory/:category", getProductsByCategory);
router.get("/getCategories/:category", getCategories);
router.get("/getAllCategories",getAllCategories)
router.get('/search',search)
// Export the 'router' instance instead of 'Router'
module.exports = router;
