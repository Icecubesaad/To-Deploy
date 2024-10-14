"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

interface FormData {
  name: string;
  logo: string;
  address: string;
  mobileNo: string;
  experience: string;
  details: string;
  banner: string;
  established: string;
  numberOfEmployees: string;
  natureOfBusiness: string;
  legalStatus: string;
  annualTurnover: string;
  workingDays: string;
  website: string;
  country: string;
  googleId: string;
}

const SellerForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    logo: "",
    address: "",
    mobileNo: "",
    experience: "",
    details: "",
    banner: "",
    established: "",
    numberOfEmployees: "",
    natureOfBusiness: "",
    legalStatus: "",
    annualTurnover: "",
    workingDays: "",
    website: "",
    country: "",
    googleId: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/post/updateSeller`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const response = await request.json();
      if (response.success) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/Home");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.error("There was an error submitting the form!", error);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      if (!data.error) {
        if (data.user.mobileNo !== "+123456789") {
          router.push("/Home");
        }
        setLoading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          googleId: data.user.googleId,
        }));
      } else {
        router.push("/Home?authorized=false");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      router.push("/Home?authorized=false");
      console.log(err);
    }
  };

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      {success && (
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Your data has been updated ✅"
        />
      )}
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Seller Registration Form
      </h2>
      {loading ? (
        <div className="flex w-full justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Form Fields */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Logo URL", name: "logo", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Mobile No", name: "mobileNo", type: "text" },
            { label: "Experience (years)", name: "experience", type: "number" },
            { label: "Banner (URL)", name: "banner", type: "text" },
            {
              label: "Establishment (years)",
              name: "established",
              type: "number",
            },
            {
              label: "Number Of Employees",
              name: "numberOfEmployees",
              type: "number",
            },
            {
              label: "Business Nature",
              name: "natureOfBusiness",
              type: "text",
            },
            {
              label: "Annual Turnover (in USD)",
              name: "annualTurnover",
              type: "number",
            },
            { label: "Legal Status", name: "legalStatus", type: "text" },
            { label: "Working Days", name: "workingDays", type: "text" },
            { label: "Website (URL)", name: "website", type: "text" },
            { label: "Country", name: "country", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}:
              </label>
              <input
                name={field.name}
                type={field.type}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details:
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
          >
            {loading ? <CircularProgress /> : <p>Submit</p>}
          </button>
        </form>
      )}
    </div>
  );
};

export default SellerForm;
