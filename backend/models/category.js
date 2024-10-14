const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image:{
    type:String,
    required:true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  parentCategory: {
    type: mongoose.Schema.Types.String,
    ref: 'Category', 
    default: null
  },
  subCategories: [{
    name:{
      type: mongoose.Schema.Types.String,
    default:null
    },
    image:{
      type:mongoose.Schema.Types.String,
      default:null
    }
  }]
});

// Generate slug before saving
categorySchema.pre('save', function (next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-');  // Convert category name to slug
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
