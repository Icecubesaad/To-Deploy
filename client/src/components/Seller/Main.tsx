"use client";
import React, { useState } from "react";
import Enquiries from "./Enquiries";
import CategoriesCard from "../Cards/CategoriesCard";
import Image from "next/image";
import { Seller } from "@/utils/types";
function Main({ details }: { details: Seller }) {
  const [selectedOption, setselectedOption] = useState(1);
  return (
    <div className=" w-[90%] md:w-[80%] h-auto flex flex-col md:flex-row gap-10">
      <div className=" w-full flex flex-col gap-10 pt-10">
        <div className="w-full grid grid-cols-2 grid-rows-2  md:flex md:flex-row md:h-[180px] justify-between gap-5">
          {details.verified ? (
            <CategoriesCard
              title="Verified Seller"
              image="/seller/verified.png"
            />
          ) : null}
          <CategoriesCard
            title={`${details.rating}/5 rating`}
            image="/seller/rating.png"
          />
          <CategoriesCard
            title="Trusted Seller"
            image="/seller/trustedSeller.png"
          />
          <CategoriesCard
            title="Statisfaction Guarenteed"
            image="/seller/statify.png"
          />
        </div>
        <div className=" flex flex-row justify-between w-full border-t-[1px] h-[80px] border-b-[1px] border-[#999999]">
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
            Products & Services
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
            Seller Profile
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
            Contact Us
          </button>
        </div>
        {selectedOption == 1 ? (
          <>
            <div>
              <h1 className=" text-3xl macan font-[500] text-[#404145]">
                Description
              </h1>
              <p className=" mt-5 helve font-[500] md:text-start text-justify text-[#404145]">
                {details.details}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gridTemplateRows: "repeat(3,1fr)",
                rowGap: "40px",
              }}
            >
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/statisfyGreen.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" helve font-[400] text-[#404145] text-base">
                    Nature of Business
                  </p>
                  <p className=" helve font-[700] text-lg">
                    {details.natureOfBusiness}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/employee.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" helve font-[400] text-base">
                    Number of Employees
                  </p>
                  <p className=" helve font-[700] text-lg">
                    {details.numberOfEmployees}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/establishment.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" helve font-[400] text-base">Establishment</p>
                  <p className=" helve font-[700] text-lg">
                    {details.establishment}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/legal.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col ">
                  <p className=" helve font-[400] text-base">
                    Legal Status of Firm
                  </p>
                  <p className=" helve font-[700] text-lg">
                    {details.legalStatus}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/annual.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" helve font-[400] text-base">Annual Turnover</p>
                  <p className=" helve font-[700] text-lg">
                    {details.annualTurnover}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row gap-3">
                <div className=" flex items-center">
                  <Image
                    src="/seller/workingDays.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" helve font-[400] text-base">Working Days</p>
                  <p className=" helve font-[700] text-lg">
                    {details.workingDays}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : selectedOption == 0 ? (
          <div className=" flex flex-col">
             <h1 className=" text-3xl macan font-[500] text-[#404145]">
                Services we provide
              </h1>
              <p className=" helve font-[500] text-[#404145]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, distinctio necessitatibus nam quibusdam eaque iusto incidunt repellat sequi at quidem! Illum accusamus incidunt qui sapiente totam sit, aperiam officiis molestias eos. Reprehenderit.
              </p>
          </div>
        ) : (
          <div className=" flex flex-col">
             <h1 className=" text-3xl macan font-[500] text-[#404145]">
                Contact Us
              </h1>
              <p>{details.mobileNo}</p>
          </div>
        )}
      </div>
      <div className=" w-full md:w-[90%] flex h-full justify-end pt-10">
        <div className=" w-full flex h-full justify-end">
          <Enquiries sellerEmail={details.email} />
        </div>
      </div>
    </div>
  );
}

export default Main;
