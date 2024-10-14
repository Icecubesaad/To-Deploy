"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Product } from "@/utils/types";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState<any>(null);
  const [hasResults, setHasResults] = useState(false);
  const [IsTyping, setIsTyping] = useState(false);
  const countries = ["Qatar"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  // Function to fetch search results
  const fetchSearchResults = async (query: string) => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel(); // Cancel previous request if any
    }

    const source = axios.CancelToken.source(); // Create new cancel token
    setCancelTokenSource(source);

    try {
      setLoading(true); // Show loading animation
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/search?query=${query}`,
        {
          cancelToken: source.token,
        },
      );
      console.log(response.data);
      setResults(response.data);
      setHasResults(response.data.length > 0);
      if (!response) {
        setLoading(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error fetching search results:", error);
      }
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), [
    cancelTokenSource,
  ]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setHasResults(false); // Reset results while typing
    setIsTyping(true);
  };

  // Effect to trigger search when typing stops
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setHasResults(false);
      setIsTyping(false);
      return;
    }

    setIsTyping(false);
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const shouldShowResults = searchQuery.trim() !== "";

  return (
    <div className="w-[90%] bg-[#013A12] h-[350px] md:h-[500px] border-[1px] rounded-2xl border-transparent flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[60%] flex flex-col items-center  gap-5">
        <p className="macan text-center font-[500] text-white text-2xl md:text-5xl">
          Search For Products &<br /> Find Verified Sellers Near You
        </p>
        <p className="text-center md:text-start macan font-[400] text-white text-xl">
          We Have 400 Thousand Sellers on Board
        </p>
        <div className="w-full  h-[65px] flex flex-row border-[1px] border-transparent rounded-xl bg-[#F2F3F5] items-center">
          <div className="w-[40%] h-full relative">
            <button
              className="w-full border-[1px] border-transparent rounded-l-xl items-center flex flex-row justify-between md:pl-3 md:pr-3 bg-white h-full"
              onClick={toggleDropdown}
            >
              <div className="h-full w-full pl-2 md:pl-0 flex md:flex-row items-center gap-2">
                <div className="hidden md:flex">
                  <Image
                    src="/location.png"
                    alt="Location Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <p className="macan">{location}</p>
              </div>
              <div>
                <KeyboardArrowDownIcon />
              </div>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 w-full z-10">
                <div
                  className={`bg-white absolute top-[10px] flex flex-col h-auto w-full border-[1px] border-white rounded-xl left-[-1px] pt-[10px] 
                    transition-all duration-300 ease-in-out transform ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                >
                  {countries.map((country: string, index: number) => (
                    <button
                      key={index}
                      className="border-t-[1px] border-transparent h-[50px] flex pl-4 items-center"
                      onClick={() => {
                        setLocation(country);
                        setIsOpen(false);
                      }}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full h-full flex flex-row relative">
            <input
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-3 outline-none border-none bg-[#f0f0f0] placeholder:text-[#333333] text-[#333333] w-full macan rounded-lg"
            />
            <div className="hidden justify-center items-center md:mr-2 md:flex">
              <button className="flex h-full justify-center items-center w-[30%] md:h-[40px] md:w-[50px] bg-[#013A12] border-[1px] border-transparent rounded-lg">
                <div className="md:w-[60%] md:h-[60%] md:bg-[#013A12] md:border-[1px] md:border-transparent md:rounded-lg flex justify-center items-center">
                  <Image
                    src="/search.png"
                    alt="Search Icon"
                    width={20}
                    height={20}
                  />
                </div>
              </button>
            </div>

            {/* Render search results */}
            {shouldShowResults && (
              <div className="absolute bg-white w-full top-[50px] mt-2 z-10 rounded-md shadow-lg">
                {loading && !hasResults && (
                  <div className="p-2 border-b h-[300px] flex flex-row w-full justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
                {!loading && !hasResults && searchQuery.trim() !== "" && (
                  <div className="p-2 border-b h-[300px] flex flex-row w-full justify-center items-center">
                    <p>No product found related to this word</p>
                  </div>
                )}
                {!loading &&
                  hasResults &&
                  results.map((result: Product, index) => (
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
                        <p
                          className={`${result.listing === "In stock" ? "text-[#148444]" : "text-red-600"}`}
                        >
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
    </div>
  );
}

export default Banner;
