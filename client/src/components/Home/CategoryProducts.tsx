'use client'
import React,{useState} from "react";
import CategoryProductsIndividual from "./CategoryProductsIndividual";

function CategoryProducts() {
  interface Category {
    title: string;
  }
  const categories: Category[] = [
    {
      title: "Building & Construction",
    },
    {
      title: "Electronics & Electrical",
    },
    {
      title: "Drugs & Pharma",
    },
    {
      title: "Industrial Supplies",
    },
    {
      title: "Food & Agriculture",
    },
    {
      title: "Home Supplies",
    }
  ];
  const [showCategories, setshowCategories] = useState(categories.slice(0, 3));
  const showOthers = () => {
    setshowCategories(categories);
  };
  return (
    <div className=" w-[90%]  h-auto flex flex-col gap-10 mt-20">
      {showCategories.map((category: Category, index: number) => {
        return (
          <CategoryProductsIndividual
          key={`category-product-${index}`}
            title={category.title}
          />
        );
      })}
      <div className=" w-full flex justify-center">
      <button onClick={()=>{showOthers()}} className=" w-auto pt-2 pb-2 pl-3 pr-3 macan text-white border-[1px] border-transparent rounded-xl flex justify-center items-center bg-[#013A12]">View All Categories</button>
      </div>
    </div>
  );
}

export default CategoryProducts;
