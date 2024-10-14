const categoryModel = require("../models/category")

// route to post the category
const postCategory = async(req,res)=>{
    try {
        const {name,description,parentCategory,subCategories,image}=req.body
        const newCategory = await categoryModel.create({
            name,description,parentCategory,subCategories,slug:name,image
        })
        if(newCategory){
            res.status(200).json({data:newCategory,success:true})
        }
    } catch (error) {
        res.status(500).json({error,success:false})
    }
}

// getting the categories
const getCategories = async(req,res)=>{
    try {
        const {category} = req.params
        const categories = await categoryModel.findOne({name:category})
        if(categories){
            res.status(200).json({subCategories:categories.subCategories,description:categories.description,success:true})
        }
        else{
            res.status(200).json({success:false})
        }
    } catch (error) {
        res.status(500).json({error,success:false})
    }
}

// get all the categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        
        if (categories.length > 0) {
            res.status(200).json({ subCategories:categories, success: true });
        } else {
            res.status(404).json({ message: 'No categories found', success: false });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message, success: false });
    }
}

module.exports = {
    postCategory,
    getCategories,
    getAllCategories
}