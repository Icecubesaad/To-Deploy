"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Product } from "@/utils/types";
function ProductFunc({ product }: { product: Product }) {
  // Utility function to format annual turnover
  const formatAnnualTurnover = (turnover: number) => {
    if (turnover >= 1_00_00_000) {
      return `${(turnover / 1_00_00_000).toFixed(1)} Cr`; // crore
    } else if (turnover >= 10_00_000) {
      return `${(turnover / 10_00_000).toFixed(1)} Mil`; // million
    } else if (turnover >= 1_000) {
      return `${(turnover / 1_000).toFixed(1)} K`; // thousand
    }
    return turnover.toString(); // if smaller, return as is
  };

  const [windowWidth, setWindowWidth] = useState(701); // Initialize with 0 or another value that doesn't rely on `window`

  useEffect(() => {
    if(typeof window !== 'undefined')
      {
      // Your client-side code that uses window goes here
      // Set the initial window width when the component mounts
      setWindowWidth(window.innerWidth);
  
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
      }
  }, []);
  const [selectedImage, setselectedImage] = useState(0);
  const [description, setdescription] = useState(
    product.description.slice(0, 150)
  );
  const stars = Array(5).fill(0);
  return (
    <div className=" bg-white gap-5 mt-10 w-[90%] flex flex-col items-center md:items-start md:flex-row border-[1px] border-transparent rounded-2xl h-auto">
      <div className=" w-[80%] flex-col flex items-center h-full">
        <div className=" w-full flex justify-center items-center border-[3px] border-[#DCDCDCDC] rounded-2xl md:h-[400px] ">
          <Image
            src={product.images[selectedImage]}
            alt="image"
            height={150}
            width={250}
          />
        </div>
        <div className="flex w-full flex-row justify-start mt-5 gap-5">
          {product.images?.map((e, index) => {
            return (
              <div
                onClick={() => {
                  setselectedImage(index);
                }}
                key={`product-image-${index}`}
                className=" w-[80px] flex justify-center items-center h-[80px] border-[3px] border-[#DCDCDCDC] rounded-2xl"
              >
                <Image
                  src={e}
                  alt="image"
                  height={windowWidth < 1400 ? 50 : 100}
                  width={windowWidth < 1400 ? 50 : 100}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-full flex justify-start">
        <div className=" flex flex-col w-full gap-2">
          <div className=" flex flex-col gap-3">
            <h1 className=" text-3xl helve text-[#333333] font-[500]">
              {product.title}
            </h1>
            <p
              className=" text-[#148444] mt-5 md:mt-0 macan font-[700] text-3xl"
              style={{ lineHeight: "30px" }}
            >
              ${product.mrp}/{product.unitsOfMeasure}
            </p>
          </div>
          <div className=" flex flex-col w-full md:w-[70%] gap-1">
            <div className=" flex flex-row justify-between mt-2">
              <p className=" helve font-[400] text-[#404145] text-sm">MOQ:</p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                {product.moq}
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>
            <div className=" flex flex-row justify-between">
              <p className=" helve font-[400] text-[#404145] text-sm">MRP:</p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                ${product.mrp} / {product.unitsOfMeasure}
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full "></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve font-[400] text-[#404145] text-sm">
                Product Type:
              </p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                {product.productType}
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve font-[400] text-[#404145] text-sm">Grade:</p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                {product.grade} Grade
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve font-[400] text-[#404145] text-sm">
                Purity:
              </p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                {product.purity} %
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve font-[400] text-[#404145] text-sm">
                Unit of Measure:
              </p>
              <p className=" helve font-[400] text-[#404145] text-sm">
                {product.unitsOfMeasure}
              </p>
            </div>
          </div>
          <div className=" w-full mt-5 w-[80%]">
            <p className="helve font-[400] text-justify md:text-start text-base text-[#404145]">
              {description}...
            </p>
          </div>
          <div className=" mt-5">
            <Link
              href={`/seller/${product.seller._id}`}
              className=" text-[#148444] helve font-[700] text-base underline-offset-8"
            >
              View Company product{" "}
              <ArrowForwardIcon sx={{ color: "#148444" }} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border-[1px] border-transparent rounded-2xl justify-center w-full md:w-[70%] bg-[#E5E7EA] p-10">
        <div className=" w-full flex flex-col gap-3">
          <div className=" flex flex-row items-center gap-2 w-full">
            <Image src="/trophy.png" alt=".." width={20} height={20} />
            <p className=" helve font-[400] text-base">Industry Leader</p>
          </div>
          <h1 className="helve font-[700] text-xl text-[#333333]">
            {product.seller.name}
          </h1>
          <div className=" flex flex-row gap-2 items-center">
            <LocationOnIcon sx={{ color: "black" }} />
            <p>{product.seller.address}</p>
          </div>
          <div className=" flex flex-col gap-1">
            <div className=" flex gap-2 items-center">
              <Image alt=".." src="/person.png" width={20} height={20} />
              <p>{product.seller.name}</p>
            </div>

            <div className=" flex gap-2 items-center">
              <Image alt=".." src="/response.png" width={20} height={20} />
              <p>{product.seller.responseRate}% response rate</p>
            </div>
            <div className=" flex gap-2 items-center">
              <Image alt=".." src="/transaction.png" width={20} height={20} />
              <p>
                <p>
                  {formatAnnualTurnover(product.seller.annualTurnover)} in{" "}
                  {product.seller.transactions} transactions
                </p>
              </p>
            </div>
            {product.seller.verifiedSupplier ? (
              <div className=" flex gap-2 items-center">
                <Image alt=".." src="/trustee.png" width={20} height={20} />
                <p>TrustSeal Verified</p>
              </div>
            ) : null}
            {product.seller.leadingSupplier ? <p>Leading Supplier</p> : null}
            <div className=" flex flex-row gap-2 h-[40px] items-center">
              <div className=" flex flex-row gap-1 h-[15px]">
                {stars.map((_, index) => (
                  <Image
                    key={index} // Add a key here since you are mapping over stars
                    src="/star.png"
                    width={15}
                    height={15}
                    alt="rating"
                  />
                ))}
              </div>
              <p>{product.seller.rating}/5</p>
            </div>
            <div className=" flex flex-row gap-2 items-center">
              <Image src="/web.png" height={15} width={15} alt=".." />
              <p>{product.seller.website}</p>
            </div>
          </div>
          <div className=" flex flex-col gap-3 items-center mt-5">
            <Link
            target="_blank"
                href={`https://wa.me/${product.seller.mobileNo}`}
              
              className="  w-full border-[1px] border-transparent rounded-xl h-[45px] flex flex-row items-center gap-3 bg-white pl-3 pr-3"
            >
              <div className=" w-[35px] h-[30px] bg-[#148444] border-[1px] border-transparent rounded-lg flex justify-center items-center">
                <Image src="/telephone.png" alt="logo" width={15} height={15} />
              </div>
              <div className=" helve text-base text-[#013A12] w-full font-[700]">
                Contact Seller: {product.seller.mobileNo}
              </div>
            </Link>
            <button className=" w-full h-[40px] border-[1px] border-transparent rounded-xl bg-[#013A12] helve font-[700] text-white">
              Get Latest Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFunc;
