"use client";
import React, { useState, useEffect } from "react";
import CategoryProductCards from "../Cards/CategoryProductCards";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
function CategoryProductsIndividual({ title }) {
  const encodedTitle = encodeURIComponent(title);
  const [Products, setProducts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [loading, setLoading] = useState(true);

  // Fetch popular products only once when the title changes
  const fetchThePopularProducts = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getRecommendedProduct?category=${encodedTitle}`,
        {
          method: "GET",
        },
      );
      const response_back = await request.json();
      if (response_back.success) {
        setProducts(response_back.products);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThePopularProducts();
  }, []); // Fetch only when 'title' changes

  // Handle product slicing when 'Products' or pagination changes
  const productsArray = Products.slice(start, end);

  const nextPage = () => {
    setStart((prev) => prev + 3);
    setEnd((prev) => prev + 3);
  };

  const prePage = () => {
    setStart((prev) => Math.max(prev - 3, 0)); // Ensure start doesn't go below 0
    setEnd((prev) => Math.max(prev - 3, 3)); // Ensure end doesn't go below 3
  };

  const router = useRouter();

  const productsCover = {
    "Building & Construction": {
      cover: {
        image: "/ProductsCover/Building.png", // Replace with an actual image path
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
    "Electronics & Electrical": {
      cover: {
        image: "/ProductsCover/Electronics.png",
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
    "Drugs & Pharma": {
      cover: {
        image: "/ProductsCover/Pharma.png",
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
    "Industrial Supplies": {
      cover: {
        image: "/ProductsCover/Pharma.png",
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
    "Food & Agriculture": {
      cover: {
        image: "/ProductsCover/Pharma.png",
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
    "Home Supplies": {
      cover: {
        image: "/ProductsCover/Pharma.png",
        properties: [
          "Prefabiricated House",
          "Scaffolding Planks & Plates",
          "Construction Machines",
          "Crushing Machines & Plants",
        ],
      },
    },
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1 className="macan text-xl md:text-3xl text-[rgb(64,65,69)] md:w-full w-[60%]">
          {title}
        </h1>
        <div className="flex flex-row justify-end gap-3 md:gap-5 w-full">
          <button
            onClick={() => {
              router.push(`/products/${title}/All Categories`);
            }}
            className="border-[1px] border-black rounded-lg text-black helve font-[700] w-auto md:pl-3 text-sm md:text-base md:pr-5 pl-2 pr-2"
          >
            <p>View All</p>
          </button>
          <div className="flex flex-row gap-3">
            <button
              disabled={start <= 0}
              onClick={prePage}
              className="p-2 border-black hover:bg-black hover:text-white h-[40px] w-[40px] bg-transparent border-[1px] rounded-lg flex justify-center items-center"
            >
              {start <= 0 ? <DoDisturbIcon /> : <ArrowBackIosIcon />}
            </button>
            <button
              disabled={end >= Products.length}
              onClick={nextPage}
              className="p-2 border-black h-[40px] w-[40px] hover:bg-black hover:text-white bg-transparent border-[1px] rounded-lg flex justify-center items-center"
            >
              {end >= Products.length ? (
                <DoDisturbIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 grid-rows-2 md:flex md:flex-row md:justify-between mt-10">
        <div className="md:h-[350px] md:w-[245px] border-[1px] border-transparent rounded-lg relative flex justify-center items-center">
          <Image
            src={productsCover[title].cover.image}
            height={350}
            width={220}
            className="object-cover w-full h-full border-[1px] border-transparent rounded-2xl"
            alt={title}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full border-transparent rounded-b-2xl shadow p-4 text-white list-[circle]">
              {productsCover[title].cover.properties.map((property, index) => (
                <p key={index} className={`text-sm `}>
                  <FiberManualRecordIcon sx={{ fontSize: 10 }} /> {property}
                </p>
              ))}
            </div>
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : Products.length > 0 ? (
          productsArray.map((product, index) => (
            <CategoryProductCards
              key={`CategoryProduct-${index}`}
              title={product.title}
              image={product.images[0]}
              price={product.mrp}
              units={product.unitsOfMeasure}
              uniqueId={`CategoryProduct-card-${index}`}
            />
          ))
        ) : (
          <p>No products to show.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProductsIndividual;
