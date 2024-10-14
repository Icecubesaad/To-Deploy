"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
function RecommendationCard({
  title,
  price,
  image,
  uniqueId,
}: {
  title: string;
  price: number;
  image: string;
  uniqueId: string;
}) {
  const router = useRouter();
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
      onClick={() => {
        router.push(`productDetails/${uniqueId}`);
      }}
      onMouseEnter={() => {
        showBtn(uniqueId);
      }}
      onMouseLeave={() => {
        hideBtn(uniqueId);
      }}
      className=" bg-[#F2F3F5] w-full md:w-[220px] items-center  h-[350px] pt-2 pb-2 border-[1px] border-transparent rounded-xl flex flex-col gap-2  "
    >
      <div className=" w-[90%] h-[220px] bg-white flex justify-center items-center border-[1px] border-transparent rounded-lg">
        <Image src={image} alt="image" width={150} height={150} />
      </div>
      <div>
        <p className=" text-center font-[700] roboto text-sm">{title}</p>
        <p className="text-center text-xs mt-2">Rs {price} Lac/Piece</p>
      </div>
      <div
        id={uniqueId}
        className=" relative top-[-125px] w-auto pl-3 pr-3 justify-center items-center h-[40px] bg-[#013A12] border-[1px] border-transparent rounded-lg flex opacity-0 getBestPrice"
      >
        <p className="helve font-[500] text-sm text-white">Get Best Price</p>
      </div>
    </button>
  );
}

export default RecommendationCard;
