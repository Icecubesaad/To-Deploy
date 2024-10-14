const categoryModel = require("../models/category");
const productModel = require("../models/products");

const search = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow access from all origins (or specify your domain)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Set allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const { query, category } = req.query;
  // Check if query is provided
  if (!query) {
    return res
      .status(400)
      .json({ message: 'Query parameter "query" is required' });
  }

  // Fix 'and' in the category if it exists
  let searchCategory = category;
  if (searchCategory && searchCategory.includes("and")) {
    searchCategory = searchCategory.replace("and", "&");
  }

  try {
    // Perform search on the productModel collection
    let results;
    if (!category) {
      results = await productModel
        .find({
          $or: [
            { title: { $regex: query, $options: "i" } }, // Case-insensitive search on 'title'
            { description: { $regex: query, $options: "i" } }, // Case-insensitive search on 'description'
          ],
        })
        .limit(10); // Limit results to 10
    } else {
      // when the category is provided
      results = await productModel
        .find({
          category: searchCategory,
          $or: [
            { title: { $regex: query, $options: "i" } }, // Case-insensitive search on 'title'
            { description: { $regex: query, $options: "i" } }, // Case-insensitive search on 'description'
          ],
        })
        .limit(10); // Limit results to 10
    }
    res.json(results);
  } catch (error) {
    // Handle any errors and log them
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to add the new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      productType,
      grade,
      purity,
      unitsOfMeasure,
      category,
      moq,
      mrp,
      listing,
      seller,
    } = req.body;
    // coming from cloudinary
    const imageURLs = [];
    req.files.map((e) => {
      imageURLs.push(e.path);
    });
    // creating new product
    const product = await productModel.create({
      title,
      description,
      productType,
      grade,
      purity: Number(purity),
      unitsOfMeasure,
      category,
      moq: Number(moq),
      mrp: Number(mrp),
      listing,
      images: imageURLs,
      seller,
    });

    if (product) {
      console.log("Product added successfully");
      res.status(200).json({ data: product, success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: error, success: true });
  }
};
// fetching the products by category
const getProductsByCategory = async (req, res) => {
  try {
    const {
      limit = 5,
      skip = 0,
      businessType,
      min,
      max,
      sortOrder = "asc",
    } = req.query;
    const { category } = req.params;
    console.log(sortOrder);
    // Convert min and max to numbers if they are provided
    const minPrice = min ? Number(min) : undefined;
    const maxPrice = max ? Number(max) : undefined;

    // Set the sorting order for price based on the query parameter
    const priceSortOption = sortOrder === "desc" ? -1 : 1;

    let products = [];
    let totalProducts = 0;

    // Fetch the main category's products
    totalProducts = await productModel.countDocuments({
      category: category,
      ...(minPrice || maxPrice
        ? {
            mrp: {
              ...(minPrice ? { $gte: minPrice } : {}),
              ...(maxPrice ? { $lte: maxPrice } : {}),
            },
          }
        : {}),
    });

    let mainCategoryProducts = await productModel
      .find({
        category: category,
        ...(minPrice || maxPrice
          ? {
              mrp: {
                ...(minPrice ? { $gte: minPrice } : {}),
                ...(maxPrice ? { $lte: maxPrice } : {}),
              },
            }
          : {}),
      })
      .sort({ mrp: priceSortOption }) // Sorting by price (mrp)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate({
        path: "seller",
        match: businessType ? { natureOfBusiness: businessType } : {},
      })
      .exec();

    // Filter out products that don't have the matching businessType after population
    if (businessType) {
      mainCategoryProducts = mainCategoryProducts.filter(
        (product) => product.seller,
      );
    }
    products = [...mainCategoryProducts];

    // Fetch all subcategories of this category
    let subcategories = await categoryModel
      .find({ parentCategory: category })
      .exec();

    // Loop through each subcategory and fetch its products
    for (const subcategory of subcategories) {
      let subcategoryProducts = await productModel
        .find({
          category: subcategory.name,
          ...(minPrice || maxPrice
            ? {
                mrp: {
                  ...(minPrice ? { $gte: minPrice } : {}),
                  ...(maxPrice ? { $lte: maxPrice } : {}),
                },
              }
            : {}),
        })
        .sort({ mrp: priceSortOption }) // Sorting by price (mrp)
        .limit(Number(limit))
        .skip(Number(skip))
        .populate({
          path: "seller",
          match: businessType ? { natureOfBusiness: businessType } : {},
        })
        .exec();

      if (businessType) {
        subcategoryProducts = subcategoryProducts.filter(
          (product) => product.seller,
        );
      }

      if (subcategoryProducts.length > 0) {
        products = [...products, ...subcategoryProducts];
        totalProducts += subcategoryProducts.length;
      }
    }

    if (products.length > 0) {
      res.status(200).json({
        data: products,
        success: true,
        totalProducts: totalProducts,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

// recommended products => sorting according to the sales made in last 30 days

const getRecommendedProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow access from all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Set allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Set allowed headers

  try {
    const { category } = req.query;

    // Calculate the date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let products = [];

    // Helper function to recursively fetch products from subcategories
    const fetchSubcategoryProducts = async (parentCategory) => {
      // Fetch all subcategories for the provided category
      const subcategories = await categoryModel.find({ parentCategory }).exec();

      // Loop through each subcategory and fetch its products
      for (const subcategory of subcategories) {
        console.log("finding now for : ", subcategory.name);

        // Fetch products for the current subcategory
        const subcategoryProducts = await productModel.aggregate([
          { $match: { category: subcategory.name } }, // Match the subcategory
          {
            $project: {
              title: 1,
              description: 1,
              category: 1,
              images: 1,
              mrp: 1,
              soldLast30Days: {
                $sum: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$sales",
                        as: "sale",
                        cond: { $gte: ["$$sale.date", thirtyDaysAgo] }, // Filter sales within the last 30 days
                      },
                    },
                    as: "sale",
                    in: "$$sale.quantity", // Sum the quantities of those sales
                  },
                },
              },
            },
          },
          { $sort: { soldLast30Days: -1 } },
          { $limit: 8 },
        ]);

        // Add subcategory products to the products array
        if (subcategoryProducts.length > 0) {
          console.log("we have products in subcategory: ", subcategory.name);
          products = [...products, ...subcategoryProducts];
        }

        // Recursively fetch products from sub-subcategories
        await fetchSubcategoryProducts(subcategory.name);
      }
    };

    if (category) {
      console.log(category);

      // Fetch the main category's products
      const mainCategoryProducts = await productModel.aggregate([
        { $match: { category } }, // Match the specific category
        {
          $project: {
            title: 1,
            description: 1,
            category: 1,
            images: 1,
            mrp: 1,
            soldLast30Days: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$sales",
                      as: "sale",
                      cond: { $gte: ["$$sale.date", thirtyDaysAgo] }, // Filter sales within the last 30 days
                    },
                  },
                  as: "sale",
                  in: "$$sale.quantity", // Sum the quantities of those sales
                },
              },
            },
          },
        },
        { $sort: { soldLast30Days: -1 } },
        { $limit: 8 },
      ]);

      // Add the main category's products
      products = [...mainCategoryProducts];

      // Fetch subcategories and their products recursively
      await fetchSubcategoryProducts(category);
    } else {
      // If no category is specified, fetch the top products regardless of category
      products = await productModel.aggregate([
        {
          $project: {
            title: 1,
            description: 1,
            category: 1,
            images: 1,
            mrp: 1,
            soldLast30Days: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$sales",
                      as: "sale",
                      cond: { $gte: ["$$sale.date", thirtyDaysAgo] }, // Filter sales within the last 30 days
                    },
                  },
                  as: "sale",
                  in: "$$sale.quantity", // Sum the quantities of those sales
                },
              },
            },
          },
        },
        { $sort: { soldLast30Days: -1 } },
        { $limit: 8 },
      ]);
    }

    res.status(200).json({ products, success: true });
  } catch (error) {
    console.error("Error fetching recommended products: ", error);
    res.status(500).json({
      message: "Error fetching recommended products",
      error,
      success: false,
    });
  }
};

// popular products => sorting according overAll sales

const getPopularProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const products = await productModel
      .find({ category })
      .sort({ sold: -1 })
      .limit(15);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular products", error });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findOne({
        _id: id,
      })
      .populate("seller")
      .exec();
    if (product) {
      res.status(200).json({ data: product, success: true });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

module.exports = {
  search,
  addProduct,
  getProductsByCategory,
  getPopularProducts,
  getRecommendedProduct,
  getSingleProduct,
};
