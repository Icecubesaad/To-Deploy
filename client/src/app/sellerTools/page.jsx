"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
function SellerTools() {
  const router = useRouter();
  const [User, setUser] = useState({});
  const [loading, setloading] = useState(true);
  const [CanUpdate, setCanUpdate] = useState(false);
  const [ChangeDetected, setChangeDetected] = useState(false);
  const [CurrentData, setCurrentData] = useState({});
  const [Success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const getUser = async () => {
    try {
      setloading(true);
      const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      if (!data.error && data.user._id) {
        setUser(data.user);
        setCurrentData(data.user);
        setloading(false);
      } else {
        router.push("/Home?authorized=false");
      }
    } catch (err) {
      router.push("/Home?authorized=false");
      console.log(err);
    }
  };

  const changeValue = (e) => {
    setCurrentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateUser = async () => {
    try {
      setloadingUpdate(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/put/updateSeller`,
        {
          method: "PUT", // Corrected method from UPDATE to PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CurrentData),
        },
      );
      const response = await request.json();
      if (response.success) {
        setloadingUpdate(false);
        setCanUpdate(false);
        setChangeDetected(false);
        setSuccess(true);
      } else {
        setloadingUpdate(false);
        setChangeDetected(false);
        setCanUpdate(false);
        setError(true);
        setErrorMsg("Couldn't update your information");
      }
    } catch (err) {
      setloadingUpdate(false);
      setChangeDetected(false);
      setError(true);
      setCanUpdate(false);
      setErrorMsg(err);
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    if (JSON.stringify(CurrentData) !== JSON.stringify(User)) {
      setChangeDetected(true);
    } else {
      setChangeDetected(false);
    }
  }, [CurrentData]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col  pb-10 md:pb-0s">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          {Success && (
            <Snackbar
              open={Success}
              autoHideDuration={6000}
              onClose={() => {
                setSuccess(false);
              }}
              message="Your data has been updated ✅"
            />
          )}
          {Error && (
            <Snackbar
              open={Error}
              autoHideDuration={6000}
              onClose={() => {
                setError(false);
              }}
            >
              <Alert
                onClose={() => {
                  setError(false);
                }}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {ErrorMsg}
              </Alert>
            </Snackbar>
          )}
          <div className=" w-full flex justify-center">
            <div className="w-[80%] flex md:flex-row flex-col items-center gap-5 md:gap-0">
              <div className=" w-full  flex justify-center items-center">
                <img
                  priority
                  src={CurrentData.logo}
                  alt="Seller Logo"
                  height={250}
                  width={250}
                  className=" border-[1px] border-transparent rounded-xl"
                />
              </div>

              <div className="w-full macan font-[700] text-4xl text-center">
                <h1>👋 Hi, {CurrentData.name}</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <div className="flex flex-row justify-center w-full">
              <div className=" w-[90%] justify-between flex">
                <h1 className="macan font-[700] text-2xl w-full">
                  Seller Details
                </h1>
                {CanUpdate ? (
                  <button
                    className=" bg-[#404145] h-[40px] w-auto pl-5 pr-5 text-white border-[1px] rounded-xl border-transparent"
                    onClick={() => setCanUpdate(false)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className=" bg-[#013A12] w-auto pl-5 pr-5 h-[40px] text-white border-[1px] rounded-xl border-transparent"
                    onClick={() => setCanUpdate(true)}
                  >
                    Edit
                  </button>
                )}
                {ChangeDetected && (
                  <button
                    className=" bg-[#013A12] h-[40px] w-[200px] pl-5 pr-5 ml-10 text-white border-[1px] rounded-xl border-transparent"
                    onClick={updateUser}
                  >
                    {loadingUpdate ? (
                      <CircularProgress />
                    ) : (
                      <p>Confirm Update</p>
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className=" flex w-full justify-center">
              <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col justify-center w-[80%] md:w-full md:justify-items-center mt-10 md:gap-0 gap-4">
                <div className="flex flex-col  items-start w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="name"
                    className=" macan font-[500] text-start w-full"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    value={CurrentData.name}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Address Input */}
                <div className="flex flex-col items-center w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="address"
                    className=" macan font-[500] text-start w-full"
                  >
                    Address
                  </label>
                  <input
                    name="address"
                    value={CurrentData.address}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Details Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="details"
                    className=" macan font-[500] text-start w-full"
                  >
                    Details
                  </label>
                  <textarea
                    name="details"
                    value={CurrentData.details}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                    rows={10}
                  />
                </div>

                {/* Country Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="country"
                    className=" macan font-[500] text-start w-full"
                  >
                    Country
                  </label>
                  <input
                    name="country"
                    value={CurrentData.country}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Establishment Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="establishment"
                    className=" macan font-[500] text-start w-full"
                  >
                    Establishment
                  </label>
                  <input
                    name="establishment"
                    value={CurrentData.establishment}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Legal Status Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="legalStatus"
                    className=" macan font-[500] text-start w-full"
                  >
                    Legal Status
                  </label>
                  <input
                    name="legalStatus"
                    value={CurrentData.legalStatus}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Nature of Business Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="natureOfBusiness"
                    className=" macan font-[500] text-start w-full"
                  >
                    Nature of Business
                  </label>
                  <input
                    name="natureOfBusiness"
                    value={CurrentData.natureOfBusiness}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Website Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="website"
                    className=" macan font-[500] text-start w-full"
                  >
                    Website
                  </label>
                  <input
                    name="website"
                    value={CurrentData.website}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>

                {/* Working Days Input */}
                <div className="flex flex-col  items-end w-full md:w-[80%] gap-3">
                  <label
                    htmlFor="workingDays"
                    className=" macan font-[500] text-start w-full"
                  >
                    Working Days
                  </label>
                  <input
                    name="workingDays"
                    value={CurrentData.workingDays}
                    readOnly={!CanUpdate}
                    onChange={changeValue}
                    className="border p-2 w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-10 w-full">
              <div className="flex w-[90%] justify-between ">
                <div></div>
                <button
                  onClick={() => {
                    router.push("/sellerTools/Add Product");
                  }}
                  className=" bg-[#013A12] w-auto pl-5 pr-5 h-[40px] text-white border-[1px] rounded-xl border-transparent"
                >
                  <p>add product</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerTools;
