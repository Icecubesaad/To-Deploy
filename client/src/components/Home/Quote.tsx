"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar, Alert } from "@mui/material";

function Quote() {
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(701); // Initialize with 0 or another value that doesn't rely on `window`
  useEffect(() => {
    // Set the initial window width when the component mounts
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
      // Your client-side code that uses window goes here
    }
  }, []);
  function validatePhoneNumber(phone: any) {
    // Basic regex pattern for validating a phone number
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{10})$/;

    return phoneRegex.test(phone);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission (which reloads the page)
    setloading(true);
    const formData = new FormData(event.currentTarget); // Get form data

    const data = {
      name: formData.get("name"),
      number: formData.get("number"),
      message: formData.get("message"),
      quantity: formData.get("quantity"),
      order_value: formData.get("order_value"),
      termsAndCondition: formData.get("termsAndCondition") ? true : false,
    };

    if (
      data.termsAndCondition &&
      data.name &&
      data.order_value &&
      data.message &&
      data.quantity &&
      data.number
    ) {
      if (!validatePhoneNumber(data.number)) {
      }
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/post/emailQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const response = await request.json();
      console.log(response);
      if (response.success) {
        setsuccess(true);
        setloading(false);
        event.currentTarget.reset();
      } else {
        seterror(true);
        seterrorMessage("Email was not sent.");
        setloading(false);
      }
    } else {
      seterror(true);
      seterrorMessage("Please fill all the fields.");
      setloading(false);
    }
  };

  return (
    <div className="w-[90%]  mt-16 bg-[#013A12] overflow-hidden pt-10 md:pt-0 h-auto items-center md:items-baseline md:h-[500px] border-[1px] rounded-2xl border-[#f2f3f5]  flex flex-col md:flex-row">
      <div className="w-full flex  flex-col items-center gap-5  justify-center">
        <div className="w-[80%] flex flex-col justify-start items-center  gap-4">
          <h1 className="macan text-2xl md:text-5xl text-white">
            Source Arabia Best Sourcing Marketplace
          </h1>
          <p className="macan text-lg  text-white">
            Source Arabia is Largest Online B2B Marketplace, Connecting Buyers
            With Suppliers
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 items-center md:flex md:flex-row justify-between w-[80%]">
          {[
            { src: "/Trust.png", label: "Trusted Platform" },
            { src: "/SafeAndSecure.png", label: "Safe And Secure" },
            { src: "/quickAssistance.png", label: "Quick Assistance" },
            { src: "/statisfy.png", label: "100% Satisfaction" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex md:items-start items-center flex-col gap-3 w-full"
            >
              <div className="flex bg-[#148444]  w-[50px] h-[50px] justify-center items-center border-[1px] border-transparent rounded-lg">
                <Image
                  src={item.src}
                  alt="icon"
                  height={windowWidth < 1400 ? 40 : 70}
                  width={windowWidth < 1400 ? 40 : 70}
                />
              </div>
              <p className="macan text-base  md:text-lg text-white">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-16 flex h-full justify-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-[#F2F3F5] w-[90%] border-[1px] rounded-t-xl border-[#f2f3f5] flex justify-center"
        >
          <div className="w-[90%] pt-5 flex flex-col items-center  gap-5">
            <h1 className="macan text-[#404145] text-3xl">Request A Demo</h1>
            <div className="w-full flex flex-row gap-4  h-[50px] mt-4">
              <input
                name="name"
                className="outline-none w-full h-full border-[1px] border-transparent rounded-lg pl-4 pr-4 placeholder:text-[#666666] roboto font-[400]"
                placeholder="Name"
              />
              <input
                type="tel"
                name="number"
                className="outline-none w-full h-full border-[1px] border-transparent rounded-lg pl-4 pr-4 placeholder:text-[#404145] font-[400] roboto"
                placeholder="phone with country code"
              />
            </div>
            <div className="w-full  h-[50px]">
              <input
                name="message"
                placeholder="Type a product you are looking for"
                className="outline-none w-full h-full border-[1px] border-transparent rounded-lg pl-4 pr-4 placeholder:text-[#404145] font-[400] roboto"
              />
            </div>
            <div className="w-full flex flex-row gap-4  h-[50px]">
              <input
                type="number"
                name="quantity"
                className="outline-none w-full h-full border-[1px] border-transparent rounded-lg pl-4 pr-4 placeholder:text-[#666666] roboto font-[400]"
                placeholder="Quantity"
              />
              <input
                type="number"
                name="order_value"
                className="outline-none w-full h-full border-[1px] border-transparent rounded-lg pl-4 pr-4 placeholder:text-[#404145] font-[400] roboto"
                placeholder="Order Value (US$)"
              />
            </div>
            <div className="flex flex-row items-center justify-start w-full gap-2">
              <label className="macan text-black flex flex-row gap-2">
                <input name="termsAndCondition" type="checkbox" />I agree To
                Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full  h-[50px] border-[1px] border-transparent rounded-lg bg-[#013A12] flex items-center justify-center"
            >
              {loading ? (
                <CircularProgress sx={{ color: "white", fontSize: 20 }} />
              ) : (
                <p className="text-white">Post Request</p>
              )}
            </button>
          </div>
        </form>
        {error ? (
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={() => {
              seterror(false);
            }}
            message={errorMessage}
          >
            <Alert
              onClose={() => {
                seterror(false);
              }}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        ) : null}
        {success ? (
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => {
              setsuccess(false);
            }}
            message={
              "Your email has been sent, we will contact you shortly. ✅"
            }
          >
            <Alert
              onClose={() => {
                setsuccess(false);
              }}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Your email has been sent, we will contact you shortly. ✅
            </Alert>
          </Snackbar>
        ) : null}
      </div>
    </div>
  );
}

export default Quote;
