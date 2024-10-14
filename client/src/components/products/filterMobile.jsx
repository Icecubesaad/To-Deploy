"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

function FilterMobile({ categories, setQuery, fetchProducts }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBusinessType, setSelectedBusinessType] = useState(""); // Single string for business type
  const [selectedCategory, setSelectedCategory] = useState(""); // Single string for category
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [error, setError] = useState(null);

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

    const queryParams = new URLSearchParams();

    queryParams.set("businessType", selectedBusinessType || "All");
    queryParams.set("selectedCategory", selectedCategory || "All");
    queryParams.set("minPrice", priceRange.min);
    queryParams.set("maxPrice", priceRange.max);

    router.push(`?${queryParams.toString()}`, { scroll: false });

    fetchProducts(
      selectedCategory || "All",
      selectedBusinessType,
      priceRange.min,
      priceRange.max
    );

    // Close the filter
    closeFilter();
  };

  const handleBusinessTypeChange = (type) => {
    setSelectedBusinessType((prev) => (prev === type ? "" : type));
  };

 

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  function openFilter() {
    const sidebar = document.getElementById("filter");
    if (sidebar) {
      sidebar.classList.add("active");
      sidebar.style.animation = "openSidebar 500ms forwards";
    }
  }

  function closeFilter() {
    const sidebar = document.getElementById("filter");
    if (sidebar) {
      sidebar.classList.remove("active");
      sidebar.style.animation = "closeSidebar 500ms forwards";
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-[90%] flex items-center gap-5 justify-end">
        <button
          className="bg-[#013A12] p-3 border-[1px] border-transparent rounded-lg"
          onClick={openFilter}
        >
          <TuneIcon sx={{ fontSize: 40, color: "white" }} />
        </button>
      </div>
      <div id="filter" className="w-full h-screen bg-[#013A12] mobile-sidebar p-10">
        <button onClick={closeFilter} className="w-full flex justify-end">
          <CloseIcon sx={{ color: "white", fontSize: 40 }} />
        </button>
        <div className="w-full overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            {/* Price Range */}
            <div className="w-[90%] mt-5">
              <div className="flex flex-row justify-between w-full items-center">
                <h1 className="text-start w-full text-xl text-white font-bold">Price Range</h1>
                <div className="text-white">
                  <HorizontalRuleIcon />
                </div>
              </div>
              <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
              <div className="flex justify-between gap-5 mt-5">
                <input
                  type="number"
                  className="w-[45%] p-2"
                  placeholder="Min Price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                />
                <input
                  type="number"
                  className="w-[45%] p-2"
                  placeholder="Max Price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Business Type */}
            <div className="w-[90%] mt-5">
              <div className="flex flex-row justify-between w-full items-center">
                <h1 className="text-start w-full text-xl text-white font-bold">Business Type</h1>
                <div className="text-white">
                  <HorizontalRuleIcon />
                </div>
              </div>
              <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
              <div className="mt-3 flex flex-col gap-3">
                {["Manufacturer", "Exporter", "Wholesaler", "Retailer"].map((type) => (
                  <div key={type} className="flex flex-row gap-2">
                    <input
                      type="radio"
                      id={type}
                      name="businessType"
                      checked={selectedBusinessType === type}
                      onChange={() => handleBusinessTypeChange(type)}
                    />
                    <label htmlFor={type} className="text-white">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="w-[90%] mt-5">
              <div className="flex flex-row justify-between w-full items-center">
                <h1 className="text-start w-full text-xl text-white font-bold">Categories</h1>
                <div className="text-white">
                  <HorizontalRuleIcon />
                </div>
              </div>
              <div className="w-full h-px bg-[#DBDBDB] mt-3"></div>
              <div className="mt-3 flex flex-col gap-3">
                {(showMoreCategories ? categories : categories.slice(0, 5)).map((category) => (
                  <div key={category.name} className="flex flex-row gap-2">
                    <input
                      type="radio"
                      id={category.name}
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    <label htmlFor={category.name} className="text-white">{category.name}</label>
                  </div>
                ))}
                {!showMoreCategories && categories.length > 5 && (
                  <button
                    type="button"
                    className="text-white mt-2"
                    onClick={() => setShowMoreCategories(true)}
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-[90%] mt-5">
              <button
                type="submit"
                className="w-full bg-[#01C977] p-3 rounded-lg text-white font-bold"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterMobile;
