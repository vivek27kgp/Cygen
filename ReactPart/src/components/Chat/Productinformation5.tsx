import React, { useState } from 'react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import Select from 'react-select';
import Textbox from '../../components/formelement/Textbox';
import Tooltip from './Tooltip';
import Textarea from '../formelement/Textarea';
import ImageUploader from '../formelement/ImageUploader';
function Productinformation5() {
  const [isExpanded_last, setIsExpanded_last] = useState(true);
  const toggleExpansion_last = () => {
    setIsExpanded_last(!isExpanded_last);
  };
const [description_last, setdescription_last] = useState('');
  return (


    <div className="relative">
      {/* Title with Expand/Collapse Icons */}
      <div className="flex items-center justify-between border-b border-stroke pl-0 py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white fotnlabelhd">
          Product Gallery & Descriptions  Information
          <Tooltip text="Tooltip Content  about product information here how to add it ">
        <button className="ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
        ?
        </button>
        </Tooltip>
        </h3>
        <button onClick={toggleExpansion_last} className="focus:outline-none">
          {isExpanded_last? (
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
      <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${isExpanded_last ? 'block' : 'hidden'}`}>
        <div className="p-6.5">
          
          
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
      
          <div className="w-full  mb-1">
<label className="mb-1.5 block text-black dark:text-white fotnlabel">
</label>
<textarea
rows={6}
name="description"
value={description_last}
placeholder='Descriptions'
onChange={(e) => setdescription_last(e.target.value)}
className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
>
</textarea>

</div>
           
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
         

            <div className="w-full  mb-1">
              <ImageUploader></ImageUploader>
            </div>
            
          </div>
          {/* Product Information end Supplier Price */}
          {/* Add more product information fields here */}

        </div>
      </div>
    </div>
    



  );
}

export default Productinformation5;
