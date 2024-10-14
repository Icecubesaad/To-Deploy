import React from "react";
import Image from "next/image";
function Footer() {
  return (
    <div className=" w-full flex  h-auto md:h-[30vh] flex-col items-center justify-end mt-10">
      <div className=" w-[90%] flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
        <div className=" flex flex-row items-center gap-4 w-full justify-center">
          <div>
            <Image src="/headphone.png" alt="..." height={60} width={60} />
          </div>
          <div className=" flex flex-col">
            <p className=" helve">customer service</p>
            <h1 className=" helve text-xl font-[700]">123 456 7890</h1>
          </div>
        </div>
        <div className=" w-full flex justify-center items-center h-[60%] flex-row ">
          <Image src="/logo.png" alt="logo" width={200} height={100} />
        </div>
        <div className=" flex flex-col w-full items-center">
          <div>
            <h1 className=" helve font-[700] text-xl">Keep In Touch:</h1>
            <div className="flex flex-row gap-3">
              <div className="w-[35px] h-[35px] border-[1px] border-transparent rounded-full bg-[#013A12] flex justify-center items-center">
                <Image
                  src="/socials/facebook.png"
                  alt="..."
                  height={10}
                  width={10}
                />
              </div>
              <div className="w-[35px] h-[35px] border-[1px] border-transparent rounded-full bg-[#013A12] flex justify-center items-center">
                <Image
                  src="/socials/twitter.png"
                  alt="..."
                  height={15}
                  width={15}
                />
              </div>
              <div className="w-[35px] h-[35px] border-[1px] border-transparent rounded-full bg-[#013A12] flex justify-center items-center">
                <Image
                  src="/socials/instagram.png"
                  alt="..."
                  height={15}
                  width={15}
                />
              </div>
              <div className="w-[35px] h-[35px] border-[1px] border-transparent rounded-full bg-[#013A12] flex justify-center items-center">
                <Image
                  src="/socials/Linkedin.png"
                  alt="..."
                  height={15}
                  width={15}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-2 w-full mt-5 justify-center bg-[#013A12]">
        <p className="text-white text-center helve font-[400]">
          {" "}
          Copyright © 2024 Source Arabia. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
