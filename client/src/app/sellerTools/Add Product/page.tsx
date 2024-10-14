"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../seller.css";
import CustomBreadcrumbs from "@/components/Seller/customBreadCrumbs";
import {
  handleImageChange,
  handleSelectChange,
  saveProduct,
} from "@/modules/addProduct";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
const fileTypes = ["JPG", "PNG", "GIF"];
import axios from "axios";

const Draganddrop = () => {
  return (
    <div className=" w-full md:w-[370px] mt-4 border-separate h-[250px] border-[1px] border-dashed flex flex-row justify-center items-center border-[#013A12] rounded-xl">
      <div className="flex items-center w-[180px] gap-2 flex-col">
        <Image src="/upload.png" alt=".." height={50} width={50} />
        <span>
          <p className="text-[#013A12] underline helve font-[500]">
            Click To Upload
          </p>
          <p>or Drag And Drop</p>
        </span>
      </div>
    </div>
  );
};

function Page() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(701); // Initialize with 0 or another value that doesn't rely on `window`

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the initial window width when the component mounts
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [ImageClient, setImageClient] = useState([]);
  const [success, setsuccess] = useState(false);
  const [userInfo, setuserInfo] = useState({
    _id: "",
  });
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    images: [] as File[],
    productType: "",
    title: "",
    description: "",
    grade: "",
    purity: "",
    unitsOfMeasure: "",
    category: "",
    moq: "",
    mrp: "",
    listing: "",
    seller: userInfo ? userInfo._id : null,
  });

  const submit = async () => {
    const response = await saveProduct(
      formData,
      seterror,
      seterrorMsg,
      setloading,
      setsuccess,
      setImageClient,
    );
    if (response) {
      setformData({
        productType: "",
        title: "",
        description: "",
        grade: "",
        purity: "",
        unitsOfMeasure: "",
        category: "",
        moq: "",
        mrp: "",
        listing: "",
        images: [],
        seller: userInfo._id,
      });
    }
  };
  const [authorized, setauthorized] = useState<boolean>(false);
  const getUser = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      if (!data.error && data.user._id) {
        setauthorized(true);
        setuserInfo(data.user);
        return;
      } else {
        setauthorized(false);
        router.push("/Home?authorized=false");
      }
    } catch (err) {
      router.push("/Home?authorized=false");
      setauthorized(false);
      console.log(err);
    }
  };
  useEffect(() => {
    setformData((prev) => ({ ...prev, seller: userInfo._id }));
  }, [userInfo]);
  const [categoriesLoading, setcategoriesLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const fetchCategories = async () => {
    try {
      setcategoriesLoading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getAllCategories`,
        {
          method: "GET",
        },
      );
      const response = await request.json();
      console.log(response);
      if (response.subCategories) {
        setcategoriesLoading(false);
        setcategories(response.subCategories);
        // fetchProducts("All Categories");
      } else {
        setcategoriesLoading(false);

        // fetchProducts(id[id.length - 1]);
        setcategories([]);
      }
    } catch (error) {
      setcategoriesLoading(false);

      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    fetchCategories();
  }, []);
  return (
    <div className="w-full h-auto">
      <title>Add Product | Source Arabia</title>
      <meta
        name="description"
        content="Become a seller and add product to display on Source Arabia"
      />
      <div className=" w-full flex justify-center bg-[#F2F3F5] h-[50px] items-center">
        <CustomBreadcrumbs />
      </div>
      <div className=" w-full h-auto flex justify-center">
        <div className="w-[80%] flex  md:flex-row flex-col-reverse gap-10  mt-10">
          <div className="flex flex-col w-full md:w-[60%]">
            <h1 className="macan md:block hidden font-[500] text-[#404145] text-4xl">
              Add New Product
            </h1>
            <div className="md:w-[370px] w-full">
              <FileUploader
                handleChange={(e: File) => {
                  handleImageChange(
                    e,
                    setformData,
                    setImageClient,
                    seterror,
                    seterrorMsg,
                  );
                }}
                name="file"
                types={fileTypes}
              >
                <Draganddrop />
              </FileUploader>
            </div>
            <div className=" flex flex-row space-x-2 justify-center mt-5">
              {ImageClient.length > 0
                ? ImageClient.map((e: { newImageUrl: string }, index) => {
                    return (
                      <div
                        key={`product-add-image-${index}`}
                        className=" w-[80px] flex justify-center items-center h-[80px] border-[3px] border-[#DCDCDCDC] rounded-2xl"
                      >
                        <Image
                          src={e.newImageUrl}
                          alt="image"
                          height={windowWidth < 1400 ? 70 : 100}
                          width={windowWidth < 1400 ? 70 : 100}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className=" mt-5">
              <p className=" macan font-[400] text-base text-justify md:text-start text-[#444444]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              </p>
            </div>
            <div className=" flex gap-2 w-full md:w-[80%] flex-col mt-10">
              <h2 className="macan font-[500] text-2xl">Select Listing</h2>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.listing}
                  label="listing"
                  name="listing"
                  onChange={(e: SelectChangeEvent) => {
                    handleSelectChange(e, setformData);
                  }}
                  sx={{ borderWidth: 1, borderRadius: "6px" }}
                >
                  <MenuItem value={"In Stock"}>In Stock</MenuItem>
                  <MenuItem value={"No Stock"}>No Stock</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className=" flex flex-row justify-between mt-5 w-full md:w-[80%]">
              <button className=" w-auto pl-5 pr-5 h-[45px] bg-[#404145] border-[1px] border-transparent rounded-lg">
                <p className=" helve font-[700] text-base text-white">
                  Discard
                </p>
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className=" w-[150px] pl-5 pr-5 h-[45px] items-center flex justify-center bg-[#148444] border-[1px] border-transparent rounded-lg"
              >
                {loading ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  <p className=" helve font-[700] text-base text-white">
                    Save Product
                  </p>
                )}
              </button>
            </div>
            {error ? (
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => {
                  seterror(false);
                }}
                message={errorMsg}
              >
                <Alert
                  onClose={() => {
                    seterror(false);
                  }}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {errorMsg}
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
                message={"Your product has been saved. ✅"}
              >
                <Alert
                  onClose={() => {
                    setsuccess(false);
                  }}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Your product has been added!
                </Alert>
              </Snackbar>
            ) : null}
          </div>
          <div className="w-full">
            <h1 className="macan text-center md:hidden md:text-start font-[500] text-[#404145] text-4xl">
              Add New Product
            </h1>
            <h1 className="macan font-[700] text-2xl mt-5 md:mt-0">
              Introduction
            </h1>
            <div className="flex flex-col">
              <div className="flex gap-2 flex-col mt-5">
                <h2 className="macan font-[700] text-base">Product Name</h2>
                <input
                  placeholder="Enter The Product Name"
                  value={formData.title}
                  onChange={(e: SelectChangeEvent) => {
                    handleSelectChange(e, setformData);
                  }}
                  name="title"
                  className="w-full border-[1px] border-[#E3E5E9] rounded-lg text-[#444444] macan text-base font-[500] placeholder:text-[#444444] outline-none bg-[#F9F9FC] pl-5 h-[50px]"
                />
              </div>
              <div className="flex gap-2 flex-col mt-5">
                <h2 className="macan font-[700] text-base">
                  Product Description
                </h2>
                <textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setformData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  name="description"
                  placeholder="Enter The Product Description"
                  className="pt-5 w-full border-[1px] border-[#E3E5E9] rounded-lg text-[#444444] macan text-base font-[500] placeholder:text-[#444444] outline-none bg-[#F9F9FC] pl-5 pr-5 h-[250px]"
                />
              </div>
              <div className=" flex gap-2 flex-col mt-10">
                <h2 className="macan font-[700] text-base">Product Type</h2>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="productType"
                    value={formData.productType}
                    label="Type"
                    onChange={(e: SelectChangeEvent) => {
                      handleSelectChange(e, setformData);
                    }}
                  >
                    <MenuItem value={"PVC Pipe"}>PVC Pipe</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className=" flex flex-row w-full mt-10 gap-10">
                <div className=" flex flex-col w-full gap-2 md:justify-start justify-between">
                  <h2 className=" macan font-[700] text-base">Grade</h2>
                  <input
                    name="grade"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={(e: SelectChangeEvent) => {
                      handleSelectChange(e, setformData);
                    }}
                    className="w-full outline-none border-transparent border-[1px] rounded-lg bg-[#E3E5E9] p-3"
                  />
                </div>
                <div className=" flex flex-col w-full gap-2 md:justify-start justify-between">
                  <h2 className=" macan font-[700] text-base">Purity</h2>
                  <input
                    name="purity"
                    placeholder="0%"
                    value={formData.purity}
                    onChange={(e: SelectChangeEvent) => {
                      handleSelectChange(e, setformData);
                    }}
                    className="w-full outline-none border-transparent border-[1px] rounded-lg bg-[#E3E5E9] p-3"
                  />
                </div>
                <div className=" flex  flex-col w-full gap-2 md:justify-start justify-between">
                  <h2 className=" macan font-[700] text-base">
                    Units of Measure
                  </h2>
                  <input
                    name="unitsOfMeasure"
                    placeholder="kg"
                    value={formData.unitsOfMeasure}
                    onChange={(e: SelectChangeEvent) => {
                      handleSelectChange(e, setformData);
                    }}
                    className="w-full outline-none border-transparent border-[1px] rounded-lg bg-[#E3E5E9] p-3"
                  />
                </div>
              </div>
              <div className=" flex gap-2 flex-col mt-10">
                <h2 className="macan font-[700] text-2xl">Category</h2>
                <div className=" border-[1px] border-[#E3E5E9] rounded-lg w-full p-5 category-shadow bg-white flex flex-col gap-2">
                  <h2 className="macan font-[700] text-sn">Product Category</h2>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.category}
                      label="Type"
                      onChange={(e: SelectChangeEvent) => {
                        handleSelectChange(e, setformData);
                      }}
                    >
                      {categoriesLoading ? (
                        <MenuItem>
                          <CircularProgress />
                        </MenuItem>
                      ) : (
                        categories.map(
                          (
                            e: { name: string; image: string },
                            index: number,
                          ) => (
                            <MenuItem key={index} value={e.name}>
                              {e.name}
                            </MenuItem>
                          ),
                        )
                      )}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className=" flex gap-2 flex-col mt-10">
                <h2 className="macan font-[700] text-2xl">Quality & Prices</h2>
                <div className=" border-[1px] border-[#E3E5E9] rounded-lg w-full p-5 category-shadow bg-white flex flex-row gap-10">
                  <div className=" flex flex-col justify-between">
                    <h2 className=" macan font-[700] text-sm md:text-base">
                      MOQ (Minimum Order Quantity)
                    </h2>
                    <input
                      placeholder="0"
                      inputMode="numeric"
                      value={formData.moq}
                      name="moq"
                      onChange={(e: SelectChangeEvent) => {
                        handleSelectChange(e, setformData);
                      }}
                      className="w-full border-transparent border-[1px] rounded-lg bg-[#E3E5E9] p-3 h-[50px]"
                    />
                  </div>
                  <div className=" flex flex-col justify-between">
                    <h2 className=" macan font-[700] text-sm md:text-base">
                      MRP (Price)
                    </h2>
                    <div className="w-full border-transparent border-[1px] rounded-lg h-[50px] bg-[#E3E5E9] p-3 flex flex-row items-center">
                      <div className=" w-[30%]">
                        <Image
                          src="/dollar.png"
                          width={30}
                          height={30}
                          alt="..."
                        />
                      </div>
                      <span className=" flex flex-row items-center">
                        $
                        <input
                          placeholder="0"
                          inputMode="numeric"
                          name="mrp"
                          value={formData.mrp}
                          onChange={(e: SelectChangeEvent) => {
                            handleSelectChange(e, setformData);
                          }}
                          className="w-full outline-none border-transparent border-[1px] rounded-lg bg-[#E3E5E9] p-3 flex flex-row h-[50px]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
