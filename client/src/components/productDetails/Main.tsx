"use client";
import React, { useState } from "react";
import Enquiries from "../Seller/Enquiries";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Product } from "@/utils/types";
import Reviews from "../Cards/Reviews";

function Main({ details }: { details: Product }) {
  const [selectedOption, setselectedOption] = useState(0);
  const result = details.title.match(/(\d+\s*inch)$/i);
  return (
    <div className=" w-[90%] h-auto md:w-[80%] flex flex-col md:flex-row gap-10 pb-20 pt-20">
      <div className=" w-full flex flex-col gap-10 pt-10">
        <div className=" flex flex-row justify-between w-full h-[60px] border-b-[1px] border-[#999999]">
          <button
            className={` bg-transparent h-full outline-none macan font-[700] w-auto text-base md:text-xl  ${
              selectedOption == 0
                ? "border-b-[3px] border-[#148444] text-[#148444]"
                : "border-none text-black"
            }`}
            onClick={() => {
              setselectedOption(0);
            }}
          >
            Products Details
          </button>
          <button
            className={` bg-transparent h-full outline-none macan font-[700] w-auto text-base md:text-xl  ${
              selectedOption == 1
                ? "border-b-[3px] border-[#148444] text-[#148444]"
                : "border-none text-black"
            }`}
            onClick={() => {
              setselectedOption(1);
            }}
          >
            Company Details
          </button>
          <button
            className={` bg-transparent h-full outline-none macan font-[700] w-auto text-base md:text-xl  ${
              selectedOption == 2
                ? "border-b-[3px] border-[#148444] text-[#148444]"
                : "border-none text-black"
            }`}
            onClick={() => {
              setselectedOption(2);
            }}
          >
            Reviews
          </button>
        </div>
        {selectedOption == 0 ? (
          <>
            <div>
              <h1 className=" text-3xl macan font-[500] text-[#404145]">
                Product Specifications
              </h1>
              <div className=" flex flex-col gap-2 mt-2">
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Diameter : {result?result[0]:null}</p>
                </div>
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Brand : {details.seller.name}</p>
                </div>
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Material : {details.productType}</p>
                </div>
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Fitting Type : {details.productType}</p>
                </div>
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Usage : {details.productType}</p>
                </div>
                <div className=" flex flex-row gap-2 items-center">
                  <FiberManualRecordIcon sx={{fontSize:15,color:"#404145"}}/><p>Country Of Origin : {details.seller.country}</p>
                </div>

              </div>
            </div>
            <div>
              <h1 className=" text-3xl macan font-[500] text-[#404145]">
                Product Description
              </h1>
              <p className=" mt-5 helve font-[500] text-[#404145]">
                {details.description}
              </p>
            </div>
            <div className=" flex flex-row gap-10 ">
              {details.images?.map((e, index) => {
                return (
                  <div key={`product-details-images-${index}`} className=" w-[200px] bg-white flex justify-center items-center h-[200px] border-[3px] border-[#DCDCDCDC] rounded-2xl">
                    <Image src={e} alt="image" height={150} width={150} />
                  </div>
                );
              })}
            </div>
          </>
        ) : selectedOption == 1 ? (
          <div className=" flex flex-col">
            <h1 className=" text-3xl macan font-[500] text-[#404145]">
              Company Details
            </h1>
            <p className=" macan  mt-5 helve font-[500] text-[#404145]">
              {details.seller.details}
            </p>
          </div>
        ) : (
          <div className=" flex flex-col">
            <h1 className=" text-3xl macan font-[500] text-[#404145]">
              Company Reviews
            </h1>
            <div className=" flex flex-col h-auto overflow-y-scroll">
              {
                details.seller.reviews.map((e,index)=>{
                  return <Reviews key={`review-${index}`} details={e} />
                })
              }
            </div>
          </div>
        )}
      </div>
      <div className=" w-full md:w-[90%] flex h-[90%] justify-end pt-10">
        <div className=" w-full flex h-auto justify-end">
          <Enquiries sellerEmail={details.seller.email} />
        </div>
      </div>
    </div>
  );
}

export default Main;
