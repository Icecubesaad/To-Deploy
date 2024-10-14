import React from "react";
import Image from "next/image";
interface testimonials {
  name: string;
  image: string;
  rating: number;
  desc: string;
  selected: any;
  setselected: any;
  uniquekey: number;
}
function TestimonialsCard({
  name,
  image,
  rating,
  desc,
  setselected,
  selected,
  uniquekey,
}: testimonials) {
  const changeSelectedStart = (unique: number) => {
    setselected(unique);
  };
  const stars = Array(rating).fill(0);
  return (
    <div
      onMouseEnter={() => {
        changeSelectedStart(uniquekey);
      }}
      onMouseLeave={() => {
        changeSelectedStart(-1);
      }}
      className=" w-full md:w-[30%] h-auto md:h-[90%] darken border-[1px] border-transparent rounded-2xl flex flex-col items-center p-5 gap-3"
      style={selected==uniquekey?{backgroundColor:"white",transition:"all 400ms"}:{}} 
    >
      <div className=" flex flex-row gap-2">
        {stars.map((_, index) => (
          <Image
            key={index} // Add a key here since you are mapping over stars
            src="/star.png"
            width={20}
            height={20}
            alt="rating"
          />
        ))}
      </div>
      <div
        style={selected == uniquekey ? { color: "black" } : { color: "white" }}
        className="text-center helve "
      >
        {desc}
      </div>
      <div
        style={selected == uniquekey ? { color: "black" } : { color: "white" }}
        className="helve font-[700] text-xl text-center"
      >
        {name}
      </div>
      <div className=" relative  top-[50px] md:top-[20px] border-[6px] border-[#148444] rounded-full">
        <Image src={image} alt="image" height={80} width={80} />
      </div>
    </div>
  );
}

export default TestimonialsCard;
