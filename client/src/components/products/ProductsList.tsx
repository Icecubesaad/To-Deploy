"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductDetailsCard from "../Cards/productDetailsCard";
import "@/components/products/products.css";
import { Product } from "@/utils/types";
import { CircularProgress, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
interface ProductsListProps {
  products: Product[];
  totalProducts: number;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  Order: string;
  fetchProducts: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  totalProducts,
  setOrder,
  Order,
  fetchProducts,
}) => {
  const [skip, setSkipState] = useState(5);
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch more products
  const fetchMore = () => {
    const newSkip = skip + 5;
    setSkipState(newSkip);
    const newProducts = products.slice(skip, newSkip);
    setProductsArray((prevArray) => [...prevArray, ...newProducts]);
  };

  // Update hasMore state based on totalProducts and skip
  useEffect(() => {
    if (skip >= totalProducts) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [totalProducts, skip]);

  // Initialize productsArray on initial render or when products change
  useEffect(() => {
    setProductsArray(products.slice(0, skip));
  }, [products, skip]);

  if (products.length < 1) {
    return null;
  }

  return (
    <div className="flex flex-col w-full md:ml-10">
      <div className="flex flex-row justify-between items-center md:h-auto h-[100px]">
        <div className="w-[70%] md:w-auto">
          <p>({totalProducts} products)</p>
        </div>
        <div className="flex flex-row md:w-auto w-full gap-3 justify-center md:justify-start md:gap-10">
          <div className="flex flex-row md:gap-3 items-center">
            <p className="md:block hidden">Sort By:</p>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={Order}
              onChange={(e) => {
                setOrder(e.target.value);
              }}
              autoWidth
              label="icecube"
            >
              <MenuItem value={"asc"}>Low To High</MenuItem>
              <MenuItem value={"desc"}>High To Low</MenuItem>
            </Select>
          </div>
          <div className="flex flex-row gap-3">
            <button>
              <Image
                alt="column"
                src="/formatting/Column.png"
                width={30}
                height={30}
              />
            </button>
            <button>
              <Image
                src="/formatting/rowAndColumn.png"
                alt="rowAndColumn"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-5 gap-10">
        {productsArray.map((product, index) => (
          <ProductDetailsCard
            key={`product-detail-${index}`}
            product={product}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {hasMore ? (
          <button
            onClick={fetchMore}
            className="w-[90%] md:w-[25%] h-[50px] md:h-[40px] bg-[#148444] border-[1px] items-center rounded-lg border-transparent flex justify-center text-white mt-10"
          >
            <p>View More Products</p>
          </button>
        ) : (
          <p className="font-[500] mt-5 macan text-black text-lg">
            No More Products To Show
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
