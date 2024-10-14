"use client";
import React from "react";
import Quote from "./Quote";
import FooterLinks from "./FooterLinks";

function Brands({ product=false }: { product: boolean }) {
  return (
    <>
      {product ? (
        <div className=" w-full bg-[rgb(248,243,240)] h-screen mt-[400px] mb-[500px]">
          <div className=" relative flex w-full justify-center top-[-400px]">
            <Quote />
          </div>
          <div className=" relative flex w-full justify-center top-[-250px]">
            <FooterLinks/>
          </div>
        </div>
      ) : (
        <div className=" w-full bg-[rgb(248,243,240)] h-screen mt-20"></div>
      )}
    </>
  );
}

export default Brands;
