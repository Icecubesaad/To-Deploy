"use client";
import Banner from "@/components/products/Banner";
import Brands from "@/components/Home/Brands";
import Categories from "@/components/Home/Categories";
import Filter from "@/components/products/Filter";
import Options from "@/components/products/Options";
import ProductsList from "@/components/products/ProductsList";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilterMobile from "@/components/products/filterMobile";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const [productsAPIMessage, setproductsAPIMessage] = useState("");
  const params = useParams();
  const id = params?.id || [];
  let category = decodeURIComponent(id[id.length - 1] || "").replace(
    "%20",
    " ",
  );
  if (id[id.length - 1] === "All%20Categories") {
    category = decodeURIComponent(id[id.length - 2] || "").replace("%20", " ");
  }

  const [categoryDesc, setcategoryDesc] = useState("");
  const [products, setproducts] = useState([]);
  const [totalProducts, settotalProducts] = useState(20);
  const [categoriesLoading, setcategoriesLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [productsLoading, setproductsLoading] = useState(true);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [hasQuery, sethasQuery] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 701,
  );
  const [SortingOrder, setSortingOrder] = useState("asc");

  const fetchCategories = async () => {
    try {
      setcategoriesLoading(true);
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);

        const businessType = urlParams.get("businessType");
        const selectedCategory = urlParams.get("selectedCategory");
        const minPrice = urlParams.get("minPrice");
        const maxPrice = urlParams.get("maxPrice");

        // Check if we have any relevant query parameters
        const hasQueryParams =
          businessType || selectedCategory || minPrice || maxPrice;

        if (hasQueryParams) {
          // If query parameters exist, fetch filtered products
          fetchFilteredProducts(
            selectedCategory,
            businessType,
            minPrice,
            maxPrice,
          );
        } else {
          // Otherwise, fetch products normally
          fetchProducts("All");
        }
      }

      // Fetch categories data
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getCategories/${category}`,
        {
          method: "GET",
        },
      );
      const response = await request.json();
      if (response) {
        setcategoryDesc(response.description);
        setcategories(response.subCategories);
      } else {
        setcategories([]);
        setcategoryDesc(response.description);
      }
    } catch (error) {
      router.push("/404");
      setproductsAPIMessage("Internal server error");
      console.log(error);
    } finally {
      setcategoriesLoading(false);
    }
  };

  const fetchProducts = async (categoryParam = "All") => {
    try {
      sethasQuery(false);

      setproductsLoading(true);
      const categoryToFetch =
        categoryParam === "All" ? category : categoryParam;
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getProductsByCategory/${categoryToFetch}?sortOrder=${SortingOrder}`,
        {
          method: "GET",
        },
      );
      const response = await request.json();
      if (response.success) {
        setproducts(response.data);
        settotalProducts(response.totalProducts);
      } else {
        setproductsAPIMessage("no products found of this category");
      }
    } catch (error) {
      setproductsAPIMessage("no products found of this category");
      console.log(error);
    } finally {
      setproductsLoading(false);
    }
  };

  const fetchFilteredProducts = async (
    categoryParam,
    businessType,
    minPrice,
    maxPrice,
  ) => {
    try {
      setproductsLoading(true);

      // Extract query parameters from the URL
      const urlParams = new URLSearchParams(window.location.search);

      // Build the categoryToFetch
      const categoryToFetch =
        categoryParam === "All" ? category : categoryParam;

      // Create the query string with both URL parameters and function parameters
      const query = new URLSearchParams({
        ...(businessType && { businessType }),
        ...(minPrice && { min: minPrice }),
        ...(maxPrice && { max: maxPrice }),
      }).toString();
      console.log(query);
      // Fetch the filtered products
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getProductsByCategory/${categoryToFetch}?${query}&sortOrder=${SortingOrder}`,
        { method: "GET" },
      );

      const response = await request.json();
      if (response.success) {
        setFilteredProducts(response.data);
        settotalProducts(response.totalProducts);
        sethasQuery(true);
      } else {
        setproductsAPIMessage("no products found of this category");
        sethasQuery(true);
        setproducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      setproductsAPIMessage("no products found of this category");
      console.log(error);
      sethasQuery(true);
    } finally {
      setproductsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [SortingOrder]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const clearFilters = () => {
    sethasQuery(false);
    window.location.href = `/products/${category}/All Categories`;
  };
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <title>{category}</title>
      <meta name="description" content={categoryDesc} />
      <Banner title={category} desc={categoryDesc} />
      <Options />
      <div className="w-[90%] flex-start mt-5">
        <h1 className="text-[#404145] macan text-3xl font-[500]">
          Explore By Categories
        </h1>
      </div>
      {categories && categories.length > 0 && (
        <Categories
          categories={categories}
          fetchCategories={fetchCategories}
          loading={categoriesLoading}
        />
      )}
      {windowWidth < 700 ? (
        <FilterMobile
          categories={categories}
          fetchProducts={fetchFilteredProducts}
        />
      ) : null}
      {productsLoading ? (
        <div className="flex w-full justify-center items-center">
          <CircularProgress />
        </div>
      ) : products.length >= 1 || FilteredProducts.length >= 1 ? (
        <div className="w-[90%] md:mt-10 flex flex-row gap-5">
          <div className="md:flex hidden w-[30%]">
            <Filter
              categories={categories}
              fetchProducts={fetchFilteredProducts}
            />
          </div>
          <div className="w-full">
            <ProductsList
              setOrder={setSortingOrder}
              Order={SortingOrder}
              fetchProducts={hasQuery ? fetchFilteredProducts : fetchProducts}
              products={hasQuery ? FilteredProducts : products}
              totalProducts={totalProducts}
              productLoading={productsLoading}
            />
          </div>
        </div>
      ) : (
        <div className="w-[90%] md:mt-10 flex items-center flex-col gap-5">
          <Image
            src="/noProducts.png"
            alt="no products"
            height={350}
            width={350}
          />
          <h1 className="macan font-[700] text-2xl text-center">
            {productsAPIMessage}
          </h1>
          {hasQuery ? (
            <button
              onClick={clearFilters}
              className=" w-[150px] pt-2 pb-2 flex justify-center items-center macan font-[500] border-[1px] border-transparent rounded-xl bg-[#013A12] text-white"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      )}
      <Brands product={true} />
    </div>
  );
}

export default Page;
