import React from "react";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
interface Product {
  image: string;
  title: string;
  price: number;
  units:string
}
function PopularRecommendedCard({ title, image, price,units }: Product) {
  return (
    <div className=" bg-[#F2F3F5] w-[240px] items-center h-[350px] p-2 border-[1px] border-transparent rounded-xl flex flex-col gap-2">
      <div className=" w-[200px] h-[50%] bg-white flex justify-center items-center border-[1px] border-transparent rounded-lg">
        <Image
          src={image}
          alt="image"
          width={100}
          height={100}
        />
      </div>
      <div className=" flex flex-col items-center">
      <p className=" text-center font-[700] roboto text-sm mt-2">{title}</p>
      <p>{price}/{units}</p>
      </div>
    </div>
  );
}

export default PopularRecommendedCard;
