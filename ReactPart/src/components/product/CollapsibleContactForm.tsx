import React, { useState } from 'react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import Select from 'react-select';
import Textbox from '../formelement/Textbox';
import Tooltip from '../Chat/Tooltip';
function Categoryformpage() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
   
  ];
  return (
    <div className="relative">
      {/* Title with Expand/Collapse Icons */}
      <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white fotnlabelhd">
          Product Information 
        <Tooltip text="Tooltip Content  about product information here how to add it ">
        <button className=" ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
        ?
        </button>
        </Tooltip>
        </h3>
        <button onClick={toggleExpansion} className="focus:outline-none">
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>
      
      {/* Collapsible Content start*/}
      <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-6.5">
          
          
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <Textbox categoryType='Product Name'></Textbox>
            <Textbox categoryType='Enter SKU'></Textbox>
            <SelectGroupOne  categoryType="Category"/>
          </div>
          {/* Product Information end */}
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <SelectGroupOne  categoryType="Subcategory"/>
            <SelectGroupOne  categoryType="Unit"/>
            <SelectGroupOne  categoryType="Brand"/> 
          </div>
          {/* Product Information end */}

              
                
         
          
                
        

          {/* Add more product information fields here */}

        </div>
      </div>
    </div>
  );
}

export default Categoryformpage;
