import React, { useState } from 'react';

interface SelectGroupOneProps {
  categoryType: string; // Define the type for categoryType prop
  categorySize?:string;
}

const Textbox: React.FC<SelectGroupOneProps> = ({ categoryType,categorySize  }) => {
  return (
    <>

    <div className={`w-full ${categorySize === "1" ? "xl:w-full" : "xl:w-1/3"} mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              {categoryType}
              </label>
              <input
                type="text"
                placeholder={categoryType}
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>
    </>
  );
};

export default Textbox;
