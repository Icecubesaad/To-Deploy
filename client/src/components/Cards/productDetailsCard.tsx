"use client";
import React from "react";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/types";
function ProductproductCard({ product }: { product: Product }) {
  const router = useRouter();
  const stars = Array(Math.floor(product.seller.rating)).fill(0);
  return (
    <div className=" bg-[#F2F3F5] gap-5 w-full flex flex-row border-[1px] border-transparent rounded-2xl md:h-[350px] pl-3 2xl:h-[400px] md:pt-0 md:pb-0 pt-2 pb-2">
      <div className=" w-full h-full hidden md:flex justify-center items-center border-[1px] border-transparent rounded-2xl">
        <div className="w-full h-[300px] border-[1px] border-transparent rounded-xl flex justify-center items-center bg-white">
          <Image src={product.images[0]} alt="image" height={150} width={150} />
        </div>
      </div>
      <div className=" w-full flex items-center">
        <div className=" flex flex-col w-full gap-2">
          <div className=" flex flex-col gap-3">
            <h1 className=" text-xl text-[#333333] helve font-[700]">
              {product.title}
            </h1>
            <p
              className=" text-[#148444] helve font-[700] text-xl"
              style={{ lineHeight: "30px" }}
            >
              ${product.mrp} / {product.unitsOfMeasure}
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <div className=" flex flex-row justify-between mt-2">
              <p className=" helve text-[#404145] text-base">MOQ:</p>
              <p className=" helve text-[#404145] text-base">{product.moq}</p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>
            <div className=" flex flex-row justify-between">
              <p className=" helve text-[#404145] text-base">MRP:</p>
              <p className=" helve text-[#404145] text-base">
                ${product.mrp} / {product.unitsOfMeasure}
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full "></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve text-[#404145] text-base">Product Type:</p>
              <p className=" helve text-[#404145] text-base">
                {product.productType}
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve text-[#404145] text-base">Grade:</p>
              <p className=" helve text-[#404145] text-base">
                {product.grade} Grade
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve text-[#404145] text-base">Purity:</p>
              <p className=" helve text-[#404145] text-base">
                {product.purity} %
              </p>
            </div>
            <div className=" bg-[#404145] h-px w-full"></div>

            <div className=" flex flex-row justify-between">
              <p className=" helve text-[#404145] text-base">
                Unit of Measure:
              </p>
              <p className=" helve text-[#404145] text-base">
                {product.unitsOfMeasure}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border-[1px] border-transparent rounded-r-2xl justify-center w-full bg-[#E5E7EA] p-3 md:p-10">
        <div className=" w-full md:w-[90%]">
          <h1 className="helve font-[700] text-base">{product.seller.name}</h1>
          <div className=" flex flex-row gap-2 items-center">
            <LocationOnIcon sx={{ color: "black" }} />
            <p>{product.seller.address}</p>
          </div>
          <div className=" mt-3">
            {product.seller.trustSEAL ? <p className=" text-sm">TrustSeal is Verified</p> : null}
            {product.seller.leadingSupplier?<p className=" text-sm">Leading Supplier</p>:null}
            {product.seller.verified?<p className=" text-sm">Verified Exporter</p>:null}
          </div>
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
          <div className=" flex flex-col gap-2 items-center mt-10">
            <button
              onClick={() => {
                router.push(`/seller/${product.seller._id}`);
              }}
              className=" w-full h-[40px] border-[1px] border-transparent rounded-xl text-sm md:text-base bg-[#148444] helve font-[700] text-white"
            >
              Contact Supplier
            </button>
            <button
              onClick={() => {
                router.push(`/productDetails/${product._id}`);
              }}
              className=" w-full h-[40px] text-sm md:text-base border-[1px] border-transparent rounded-xl bg-[#013A12] helve font-[700] text-white"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductproductCard;