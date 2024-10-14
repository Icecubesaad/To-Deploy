'use client'
import React from 'react';

interface ProductOptionsProps {
  name: string;
  isChecked: boolean;
  onChange: () => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ name, isChecked, onChange }) => {
  return (
    <div className="flex flex-row justify-between w-full items-center h-[20px]">
      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="w-[15px] h-[15px] bg-transparent border-[1px] border-[#148444]"
        />
        <label className="helve text-sm md:text-[#404145] text-white font-[400]" style={{ lineHeight: '24px' }}>
          {name}
        </label>
      </div>
      <div className="flex items-center">
      </div>
    </div>
  );
};

export default ProductOptions;
