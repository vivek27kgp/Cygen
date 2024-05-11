import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Categorypage from './Categoryform';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';
import Select from 'react-select';
import Textbox from '../formelement/Textbox';
import Tooltip from '../Chat/Tooltip';
import Textarea from '../formelement/Textarea';
import ImageUploader from '../formelement/ImageUploader';
const Add: React.FC = () => {
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
    <DefaultLayout>
      <Breadcrumb pageName="Add Brand" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
      <div className="relative">
      {/* Title with Expand/Collapse Icons */}
      <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white fotnlabelhd">
          Brand Information 
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
          {/* Category Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <Textbox categoryType='Brand Name' categorySize='1'></Textbox>
           
            
          </div>
          {/* Product Information end */}
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
          <Textarea categoryType="Descriptions"></Textarea>
          
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
          <ImageUploader></ImageUploader>
          </div>
          {/* Product Information end */}

          <div className="flex mt-5 flex-col gap-4 xl:flex-row">  
          <button
              
              className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Cancel
            </button>      
            <button
              
              className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Category
            </button>      
          </div>
          {/* Add more product information fields here */}

        </div>
      </div>
    </div>
    </div>

      </div>
    </div>
    </DefaultLayout>
  );
};
export default Add;
