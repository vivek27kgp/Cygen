import React, { useEffect, useState } from 'react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import Tooltip from './Tooltip';
import Select from 'react-select';
import Textbox from '../formelement/Textbox';
import fetchData from '../fetchData';
import { useNavigate } from 'react-router-dom';
function CollapsibleProductInfo() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [customer_barcode, set_customer_barcode] = useState('');
  const [color_code, setcolor_code] = useState('');
  const [description, setdescription] = useState('');
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
  ];
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Move the hook call here
  const outlet_id = localStorage.getItem('outlet_id');
  const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  // Fetch options from the API based on the selected value
  useEffect(() => {
    fetchData(
      '/getAllcategoryOptions/' + outlet_id,
      setCategoryData,
      setError,
      setIsLoading,
    );
    // Call the fetchData function when the component mounts
    console.log(categoryData);
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const [category_name, setCategory_name] = useState<string>(''); // State to store the selected option value

  const handleChange_cayegory = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory_name(event.target.value); // Update the selected option when it changes
  };

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
      <div
        className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          isExpanded ? 'block' : 'hidden'
        }`}
      >
        <div className="p-6.5">
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full xl:w-1/3 mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Barcode
              </label>
              <input
                type="text"
                name="category_name"
                value={category_name}
                onChange={(e) => set_customer_barcode(e.target.value)}
                placeholder="Category Name"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>
            <div className={`w-full xl:w-1/3 mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Product Name
              </label>
              <input
                type="text"
                name="category_name"
                value={category_name}
                onChange={(e) => set_customer_barcode(e.target.value)}
                placeholder="Category Name"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/3 mb-1">
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Category
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
              {isLoading && <div>Loading...</div>}
              <select
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white fotnlabel' : ''
                }`}
                value={category_name} // Set the value of the select input to the selected option state
                onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
              >
                {categoryData &&
                  categoryData.list &&
                  categoryData.list.map((category: any) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          {/* Product Information end */}
          {/* Product Information */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="w-full xl:w-1/3 mb-1">
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Subcategory
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
              {isLoading && <div>Loading...</div>}
              <select
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white fotnlabel' : ''
                }`}
                value={category_name} // Set the value of the select input to the selected option state
                onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
              >
                {categoryData &&
                  categoryData.list &&
                  categoryData.list.map((category: any) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="w-full xl:w-1/3 mb-1">
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Unit
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
              {isLoading && <div>Loading...</div>}
              <select
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white fotnlabel' : ''
                }`}
                value={category_name} // Set the value of the select input to the selected option state
                onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
              >
                {categoryData &&
                  categoryData.list &&
                  categoryData.list.map((category: any) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="w-full xl:w-1/3 mb-1">
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Brand
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
              {isLoading && <div>Loading...</div>}
              <select
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white fotnlabel' : ''
                }`}
                value={category_name} // Set the value of the select input to the selected option state
                onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
              >
                {categoryData &&
                  categoryData.list &&
                  categoryData.list.map((category: any) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          {/* Product Information end */}

          {/* Add more product information fields here */}
        </div>
      </div>
    </div>
  );
}

export default CollapsibleProductInfo;
