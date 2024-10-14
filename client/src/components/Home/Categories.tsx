"use client";
import React, { useState, useEffect } from "react";
import CategoriesCard from "../Cards/CategoriesCard";
import { CircularProgress } from "@mui/material";

interface CategoryI {
  name: string;
  image: string;
}

function Categories({
  categories,
  fetchCategories,
  loading,
}: {
  categories: { name: string; image: string }[];
  fetchCategories?: any;
  loading?: boolean;
}) {
  function getCategoryFromUrl() {
    if (typeof window !== "undefined") {
      // Get the current URL path
      const url = window.location.pathname;

      // Split the URL by "/" to get parts of the path
      const pathParts = url.split("/");

      // Get the last meaningful part (after the dynamic part, like PVC)
      let lastPart = pathParts[pathParts.length - 1];

      const category = decodeURIComponent(lastPart);

      return category;
    }
    return undefined; // Return undefined if window is not available
  }

  const [selectedCategory, setSelectedCategory] = useState<string>(
   "All Categories" // Provide a default value in case of undefined
  );

  // Update selectedCategory based on query parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side code that uses window
      const urlParams = new URLSearchParams(window.location.search);
      const queryCategory = urlParams.get("selectedCategory");

      if (queryCategory) {
        setSelectedCategory(decodeURIComponent(queryCategory));
      }
    }
  }, [selectedCategory]);

  return (
    <div className=" h-auto md:h-[200px] w-[90%]  mt-5 grid grid-cols-2 grid-rows-4 md:flex md:flex-row gap-8  items-center">
      {loading ? (
        <div className=" w-full flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        categories.map((category: CategoryI, index: number) => {
          return (
            <CategoriesCard
              key={`category-${index}`}
              title={category.name}
              image={category.image}
              fetchCategories={fetchCategories}
              selectedCategory={selectedCategory}
              setselectedCategory={setSelectedCategory}
            />
          );
        })
      )}
      {loading ? null : (
        <CategoriesCard
          key={`category-all`}
          title={"All Categories"}
          image={"/output-onlinepngtools.png"}
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setselectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
}

export default Categories;
