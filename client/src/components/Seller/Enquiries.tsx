"use client";
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
function Enquiries({ sellerEmail }: { sellerEmail: string }) {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  function validatePhoneNumber(phone: any) {
    // Basic regex pattern for validating a phone number
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{10})$/;

    return phoneRegex.test(phone);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault(); // Prevent the default form submission (which reloads the page)
    setloading(true);
    const formData = new FormData(event.currentTarget); // Get form data

    const data = {
      name: formData.get("name"),
      number: formData.get("number"),
      message: formData.get("message"),
      email: formData.get("email"),
      emailOfSeller: sellerEmail,
      termsAndCondition: formData.get("termsAndCondition") ? true : false,
    };
    if (!data.termsAndCondition) {
      seterror(true);
      seterrorMessage("accept the terms and conditions");
    }
    if (data.termsAndCondition && data.name && data.message && data.number) {
      if (!validatePhoneNumber(data.number)) {
        seterror(true);
        seterrorMessage("enter a valid phone number with country code");
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
      if (response.success) {
        setsuccess(true);
        setloading(false);
        form.reset();
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
    <div className="h-auto pb-10 pt-10 bg-[#013A1226] w-full md:w-[95%] border-[1px] border-transparent rounded-2xl">
      <div className="flex flex-col">
        <h1 className="macan font-[700] text-3xl text-center text-[#404145]">
          Send Enquiry To Supplier
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 mt-5 items-center">
            <input
              name="name"
              placeholder="Name"
              className="w-[90%] h-[50px] border-[1px] border-transparent outline-none rounded-lg helve font-[400] placeholder:text-[#666666] text-[#666666] pl-5"
            />
            <textarea
              name="message"
              placeholder="Describe Your Buying Requirements"
              className="w-[90%] h-[200px] border-[1px] border-transparent rounded-lg outline-none helve font-[400] placeholder:text-[#666666] text-[#666666] pl-5 pt-2"
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="w-[90%] h-[50px] border-[1px] outline-none border-transparent rounded-lg helve font-[400] placeholder:text-[#666666] text-[#666666] pl-5"
            />
            <input
              name="number"
              placeholder="Mobile Number"
              type="number"
              className="w-[90%] h-[50px] border-[1px] outline-none border-transparent rounded-lg helve font-[400] placeholder:text-[#666666] text-[#666666] pl-5"
            />
            <div className="flex helve font-[400] flex-row gap-2 justify-start w-[90%]">
              <input type="checkbox" name="termsAndCondition" />
              <p>I Agree to Terms and Conditions</p>
            </div>
            <button
              type="submit"
              className="w-[90%] h-[50px] flex justify-center border-[1px] border-transparent rounded-xl items-center bg-[#013A12]"
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <p className="helve font-[700] text-white">Send Enquiry</p>
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

export default Enquiries;
