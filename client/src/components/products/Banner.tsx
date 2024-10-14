'use client'
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import CustomBreadcrumbs from "../Seller/customBreadCrumbs";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
function Banner({ title, desc }: { title: string; desc: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  // Debounce function to delay the API request
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Fetch search results
  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true); // Show loading animation
      const response = await axios.get(
        `http://localhost:5000/api/get/search?query=${query}&category=${title.replace('&','and')}`
      );
      setResults(response.data);
      setHasResults(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Effect to trigger search when typing stops
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setHasResults(false);
      return;
    }
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="w-[90%] bg-[#013A12] pt-5 pb-5 mb:pt-0 mb:pb-0 md:h-[500px] border-[1px] rounded-2xl border-transparent flex flex-col items-center">
      <div className="pt-5">
        <CustomBreadcrumbs />
      </div>
      <div className="w-[90%] md:w-[60%] h-full flex justify-center flex-col items-center gap-5">
        <p className="macan text-center font-[500] mt-5 md:mt-0 text-white text-5xl">
          {title}
        </p>
        <p className="macan font-[400] text-center text-white text-base mt-4">
          {desc}
        </p>
        <div className="w-full h-[65px] flex flex-row border-[1px] border-transparent rounded-xl bg-[#F2F3F5] items-center relative">
          <div className="w-full h-full flex flex-row">
            <input
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-5 outline-none border-none bg-[#f0f0f0] placeholder:text-[#333333] text-[#333333] w-full macan rounded-xl"
            />
            <button className="hidden md:flex h-full justify-center items-center w-[15%]">
              <div className="w-[60%] h-[60%] bg-[#013A12] border-[1px] border-transparent rounded-lg flex justify-center items-center">
                <Image src="/search.png" alt="Search Icon" width={20} height={20} />
              </div>
            </button>
          </div>
          {/* Display loading or results */}
          {loading && (
            <div className="absolute bg-white w-full top-[70px] z-10 rounded-md shadow-lg p-2 flex justify-center">
              <CircularProgress />
            </div>
          )}
          {!loading && searchQuery.trim() !== "" && !hasResults && (
            <div className="absolute bg-white w-full top-[70px] z-10 rounded-md shadow-lg p-2 flex justify-center">
              <p>No products found</p>
            </div>
          )}
          {!loading && hasResults && (
            <div className="absolute bg-white w-full top-[70px] z-10 rounded-md shadow-lg">
              {results.map((result: any, index: number) => (
                <Link
                href={`productDetails/${result._id}`}
                key={index}
                className="p-2 border-b last:border-b-0 flex flex-row w-full justify-between cursor-pointer hover:bg-gray-200"
              >
                <Image
                  src={result.images[0]}
                  width={100}
                  height={100}
                  alt="product"
                />
                <div className=" flex w-full flex-row justify-start">
                  <p className=" pl-3">{result.title}</p>
                </div>
                <div className="flex flex-col w-[80%] items-center">
                  <p
                    className=" text-[#148444] helve font-[700] text-md"
                    style={{ lineHeight: "30px" }}
                  >
                    ${result.mrp} / {result.unitsOfMeasure}
                  </p>
                  <p className={`${result.listing === "In stock" ? 'text-[#148444]' : 'text-red-600'}`}>
                    {result.listing}
                  </p>
                </div>
              </Link>

              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
