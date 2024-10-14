"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const Filter = ({ categories, fetchProducts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBusinessType, setSelectedBusinessType] = useState(""); // Single string for business type
  const [selectedCategory, setSelectedCategory] = useState(""); // Single string for category
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill fields from the URL query params
  useEffect(() => {
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const category = searchParams.get("selectedCategory") || "";
    const businessType = searchParams.get("businessType") || "";

    setPriceRange({ min: minPrice, max: maxPrice });
    setSelectedBusinessType(businessType || ""); // Default to empty string if no business type
    setSelectedCategory(category || ""); // Default to empty string if no category
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const minPrice = parseFloat(priceRange.min);
    const maxPrice = parseFloat(priceRange.max);

    if (minPrice && maxPrice && minPrice >= maxPrice) {
      setError("Min should be less than Max");
      return;
    }

    setError(null);

    const queryParams = new URLSearchParams(searchParams);

    // Update queryParams with businessType and category
    queryParams.set("businessType", selectedBusinessType); // Use "All" if no business type
    queryParams.set("selectedCategory", selectedCategory || "All"); // Use "All" if no category
    queryParams.set("minPrice", priceRange.min);
    queryParams.set("maxPrice", priceRange.max);

    router.push(`?${queryParams.toString()}`, { scroll: false });

    // Pass "All" if no business type or category is selected
    fetchProducts(
      selectedCategory || "All",
      selectedBusinessType,
      priceRange.min,
      priceRange.max,
    );
  };

  // Handle business type selection
  const handleBusinessTypeChange = (type) => {
    setSelectedBusinessType((prev) => (prev === type ? "" : type));
  };

  // Handle category selection change
  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit}>
        {/* Categories */}
        <div className="w-[90%] mt-5">
          <div className="flex flex-row justify-between w-full items-center">
            <h1 className="text-start w-full text-xl md:text-[#404145] text-white font-bold">
              Categories
            </h1>
            <div className="md:text-black text-white">
              <HorizontalRuleIcon />
            </div>
          </div>
          <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
          <div className="mt-3 flex flex-col gap-3">
            {(showMoreCategories ? categories : categories.slice(0, 5)).map(
              (category) => (
                <div key={category.name} className="flex flex-row gap-2">
                  <input
                    type="radio"
                    checked={selectedCategory === category.name}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  <label className="md:text-[#404145] text-white">
                    {category.name}
                  </label>
                </div>
              )
            )}
            {categories.length > 5 && (
              <button
                type="button"
                className="text-[#148444] text-left"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                {showMoreCategories ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>

        {/* Price Range */}

        <div className="w-[90%] mt-5">
        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="text-start w-full text-xl md:text-[#404145] text-white helve font-[700]">
            Price
          </h1>
          <div className="md:text-black text-white">
            <HorizontalRuleIcon />
          </div>
        </div>
        <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
        <div className="flex flex-row items-center mt-5 md:justify-start justify-between">
          <div className="w-[100px] flex h-[50px] gap-2 items-center justify-center bg-white md:bg-[#D9D9D9] border-[1px] border-transparent rounded-lg">
            <span className="text-black">
              $
              <input
                step="0.01"
                className="w-[60px] bg-white md:bg-transparent text-base bg-transparent outline-none"
                inputMode="decimal"
                type="number"
                placeholder="0.00"
                value={priceRange.min}
                onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }              />
            </span>
          </div>
          <p className="md:text-black text-white">--</p>
          <div className="w-[100px] flex h-[50px] gap-2 items-center justify-center bg-white md:bg-[#D9D9D9] border-[1px] border-transparent rounded-lg">
            <span className="text-black">
              $
              <input
                step="0.01"
                className="w-[60px] text-base bg-white md:bg-transparent outline-none"
                inputMode="decimal"
                type="number"
                placeholder="0.00"
                value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }              />
            </span>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

        {/* Stock Availability */}
        
        

        {/* Business Type */}
        <div className="w-[90%] mt-5">
          <div className="flex flex-row justify-between w-full items-center">
            <h1 className="text-start w-full text-xl md:text-[#404145] text-white font-bold">
              Business Type
            </h1>
            <div className="md:text-black text-white">
              <HorizontalRuleIcon />
            </div>
          </div>
          <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
          <div className="mt-3 flex flex-col gap-3">
            {["Manufacturer", "Exporter", "Wholesaler", "Retailer"].map(
              (type) => (
                <div key={type} className="flex flex-row gap-2">
                  <input
                    type="radio"
                    checked={selectedBusinessType === type}
                    onChange={() => handleBusinessTypeChange(type)}
                  />
                  <label className="md:text-[#404145] text-white">{type}</label>
                </div>
              )
            )}
          </div>
        </div>

      

        {/* Submit Button */}
        <div className="w-full flex justify-start mt-5">
          <button
            type="submit"
            className="bg-[#148444] border-[1px] border-transparent rounded-xl w-[90%] h-[50px] text-white text-[700]"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;