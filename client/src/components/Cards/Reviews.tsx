import React from "react";
import Image from "next/image";
function Reviews({
  details,
}: {
  details: { name: string; comment: string; rating: string };
}) {
  const stars = Array(parseInt(details.rating)).fill(0);
  return (
    <div className=" w-full border-t-[1px] border-b-[1px] pt-3 pb-3 pl-3 pr-3 border-[#999999] flex flex-col mt-5">
      <div className=" flex flex-row items-center justify-between">
        <h1 className=" macan font-[700] text-2xl w-full">{details.name}</h1>
        <div className=" flex flex-row gap-1 w-full justify-end">
          {stars.map((_, index) => (
            <div key={`reviews-star-${index}`}>
            <Image
              key={index} // Add a key here since you are mapping over stars
              src="/star.png"
              width={15}
              height={15}
              alt="rating"
            />
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-5">
        <p className=" macan font-[500] italic helve text-[#404145]">{details.comment}</p>
      </div>
    </div>
  );
}

export default Reviews;
