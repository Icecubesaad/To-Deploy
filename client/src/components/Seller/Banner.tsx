"use client";
import React from "react";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
import CustomBreadcrumbs from "./customBreadCrumbs";
import { Seller } from "@/utils/types";
function Banner({ details }: { details: Seller }) {
  const [smallDescription, setsmallDescription] = useState(
    details.details.slice(0, 150),
  );
  return (
    <div className="w-[90%] bg-[#013A12] md:h-[500px] pb-5 md:pb-0 border-[1px] rounded-2xl border-transparent flex flex-col items-center">
      <div className="pt-5 flex justify-center text-white">
        <CustomBreadcrumbs />
      </div>
      <div className=" flex flex-col md:flex-row w-full h-full">
        <div className=" flex flex-col gap-5 items-center justify-center w-full h-full">
          <div className=" w-[90%] md:w-[80%] md:items-start items-center flex flex-col gap-5">
            <div className="flex flex-row md:justify-start w-full mt-10 md:mt-0  items-center md:gap-4">
              <Image
                className="border-[1px] border-transparent rounded-2xl"
                src={details.logo}
                alt="logo"
                width={120}
                height={150}
              />
              <h1 className=" macan font-[500] text-white md:text-start text-end text-3xl md:text-5xl ">
                {details.name}
              </h1>
            </div>
            <div
              className=" w-full md:w-[80%] border-[#FFFFFF4D] border-opacity-5 border-[1px] rounded-2xl flex flex-row justify-center h-auto pt-3 pb-3 items-center gap-4"
              style={{
                boxShadow: "0px 10px 10px 0px #00000026",
                lineHeight: "24px",
              }}
            >
              <LocationOnIcon sx={{ color: "white" }} />
              <p className="macan font-[500] md:font-[700] text-white ">
                {details.address}
              </p>
            </div>
            <div>
              <p
                style={{ lineHeight: "22.08px" }}
                className=" macan font-[400] text-base mt-5 md:mt-0 text-white"
              >
                {smallDescription}...
              </p>
            </div>
            <div className=" flex flex-row justify-between md:w-auto w-full md:gap-10">
              <button className=" w-auto border-[1px] border-transparent rounded-xl h-[45px] flex flex-row items-center gap-3 bg-white pl-3 pr-3">
                <div className=" w-[30px] h-[30px] bg-[#148444] border-[1px] border-transparent rounded-lg flex justify-center items-center">
                  <img src="/telephone.png" alt="logo" width={20} height={20} />
                </div>
                <div className=" helve text-lg font-[700]">
                  {details.mobileNo}
                </div>
              </button>
              <button className=" bg-[#148444] w-auto h-[45px] pl-3 pr-3 border-[1px] border-transparent rounded-xl text-white flex justify-center items-center helve font-[700] ">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center mt-5 md:mt-0">
          <div className="w-[80%] h-full flex flex-col justify-center items-center">
            <div className="relative w-full flex md:flex-row flex-col justify-center items-center">
              <Image
                src={details.banner}
                alt="banner"
                height={400}
                width={550}
                className="object-cover rounded-3xl border-[1px] border-transparent"
              />
              <div className="md:absolute mt-5 md:mt-0 md:bottom-[15px] md:right-[0px] flex flex-row gap-4 w-full justify-end">
                <div className="w-auto h-[40px] flex justify-center border-[1px] border-transparent rounded-2xl pl-2 pr-2 items-center bg-black text-white">
                  {details.experience} years
                </div>
                <div className="w-auto h-[40px] flex justify-center border-[1px] border-transparent rounded-2xl pl-2 pr-2 bg-black items-center text-white">
                  {details.views} views
                </div>
                <div className="w-auto h-[40px] flex justify-center border-[1px] border-transparent rounded-2xl items-center pl-2 pr-2 bg-white">
                  {details.onlineStatus ? (
                    <p>
                      <FiberManualRecordIcon sx={{ color: "#148444" }} /> Online
                    </p>
                  ) : (
                    <p>Offline</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
