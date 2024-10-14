import React from "react";
import Image from "next/image";
function SellInformation() {
  return (
    <div className=" mt-5 w-[90%] md:h-[80vh] flex flex-col md:flex-row ">
      <div className=" w-full h-full flex items-center">
        <div className=" w-full h-[80%]">
          <Image
            src="/selling-section.png"
            alt="..."
            height={400}
            width={500}
            className=" object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="w-full h-full flex items-center ">
        <div className=" w-[90%]">
          <h1 className="  font-[500]  text-center md:text-start macan text-[#404145] text-4xl">
            Sell On Source Arabia
          </h1>
          <p className=" mt-4 macan  text-[16px] text-center md:text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut laboreLorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellInformation;
