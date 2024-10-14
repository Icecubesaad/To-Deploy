"use client";
import React from "react";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
interface Product {
  image: string;
  title: string;
  uniqueId: string;
  price: string;
  units: string;
}
function CategoryProductCards({
  title,
  image,
  uniqueId,
  price,
  units,
}: Product) {
  const showBtn = (id: string) => {
    const btn = document.getElementById(id);
    btn?.classList.add("active");
  };
  const hideBtn = (id: string) => {
    const btn = document.getElementById(id);
    btn?.classList.remove("active");
  };
  return (
    <button
      onMouseEnter={() => {
        showBtn(uniqueId);
      }}
      onMouseLeave={() => {
        hideBtn(uniqueId);
      }}
      className=" bg-[#F2F3F5] h-[300px] md:w-[240px] items-center md:h-[350px] p-2 border-[1px] border-transparent rounded-xl flex flex-col gap-2"
    >
      <div className=" w-full h-[90%] bg-white flex justify-center items-center border-[1px] border-transparent rounded-lg">
        <Image src={image} alt="image" width={200} height={80} />
      </div>
      <div className=" flex flex-col items-center">
        <p className=" text-center font-[700] roboto text-sm mt-2">{title}</p>
        <p>
          {price}/{units}
        </p>
      </div>
      <div
        id={uniqueId}
        className=" relative top-[-135px] w-[80%] pl-3 pr-3 justify-center items-center h-[40px] bg-[#013A12] border-[1px] border-transparent rounded-[10px] flex opacity-0 getBestPrice  "
      >
        <p className="helve font-[500] text-sm text-white">View Details</p>
      </div>
    </button>
  );
}

export default CategoryProductCards;
