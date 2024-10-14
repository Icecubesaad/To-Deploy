import Link from "next/link";
import React from "react";
import Requirement from "./Requirement";

function FooterLinks() {
  return (
    <div className=" w-full   md:h-screen pb-20 bg-[#F2F3F5] mt-[14rem]">
      <div className=" flex justify-center">
        <Requirement />
      </div>
      <div className=" flex justify-center items-end">
        <div className=" w-[90%] md:w-[80%] md:flex md:flex-row grid grid-cols-2 grid-rows-2 gap-y-5 gap-x-5 md:items-start justify-between">
          <div className=" flex w-full flex-col">
            <h1 className=" helve font-[700] text-black text-xl">Links</h1>
            <div
              className="w-full mt-3  "
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gridTemplateRows: "repeat(6,1fr)",
                rowGap: "8px",
              }}
            >
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                About Us
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Help
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Join Sales
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Feedback
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Success Stories
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Complaints
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Press Section
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Customer Care
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Advertise with Us
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Careers
              </Link>
              <Link href="#" className="helve font-[400] outline-none ">
                Investor Section
              </Link>
              <Link href="#" className="helve font-[400] outline-none ">
                Contact Us
              </Link>
            </div>
          </div>
          <div className=" flex flex-col w-full md:w-[70%] ">
            <h1 className=" helve font-[700] text-black text-xl">
              Suppliers Tool Kit
            </h1>
            <div className=" flex flex-col mt-3 gap-2">
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Sell on Source Arabia
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Latest Buy
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Lead Learning Centre
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Ship With Source Arabia
              </Link>
            </div>
          </div>
          <div className=" flex flex-col w-full md:w-[70%] ">
            <h1 className=" helve font-[700] text-black text-xl">
              Buyer Tool Kit
            </h1>
            <div className=" flex flex-col mt-3 gap-2">
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Post Your Requirement
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Products You Buy
              </Link>
              <Link
                href="#"
                className="helve text-base font-[400] outline-none "
              >
                Search Products & Suppliers
              </Link>
            </div>
          </div>
          <div className=" flex flex-col w-full md:w-[70%] items-center">
            <div>
              <h1 className=" helve font-[700] text-black text-xl">
                Solutions
              </h1>
              <div className=" flex flex-col mt-3 gap-2">
                <Link
                  href="#"
                  className="helve text-base font-[400] outline-none "
                >
                  Accounting Software
                </Link>
                <Link
                  href="#"
                  className="helve text-base font-[400] outline-none "
                >
                  Tally On Mobile
                </Link>
                <Link
                  href="#"
                  className="helve text-base font-[400] outline-none "
                >
                  GST e-Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLinks;
