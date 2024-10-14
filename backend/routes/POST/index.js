const express = require("express")
const { search, addProduct } = require("../../controllers/products")
const { storage } = require('../../storage/storage');
const multer = require('multer');
const { postCategory } = require("../../controllers/categories");
const {     nodeMailer } = require("../../controllers/email");
const { updateSeller } = require("../../controllers/seller");
const uploadArray=multer({storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5 MB limit per file
        files: 4 // Maximum number of files allowed
      }})
const router = express.Router()
router.post("/search",search)
router.post("/addProduct",uploadArray.array("images"),addProduct)
router.post("/postCategories",postCategory)
router.post("/emailQuery",nodeMailer)
router.post("/updateSeller",updateSeller)
module.exports = router
