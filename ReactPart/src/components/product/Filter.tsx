import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import fetchData from '../fetchData';
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (product_name: string, status: string,category_id:string,supplier_id:string,tax_id:string,tax_type:string,stock:string) => any;
}
const Filter: React.FC<PopupProps> = ({ isOpen, onClose ,onSearch}) => {
   const outlet_id = localStorage.getItem('outlet_id');
    const [product_name, set_product_name] = useState('');
    const [status, set_status] = useState<string>(''); 
    const handleChange_status = (event: React.ChangeEvent<HTMLSelectElement>) => {
        set_status(event.target.value); // Update the selected option when it changes
    };
    const [stock, set_stock] = useState<string>(''); 
    const handleChange_stock = (event: React.ChangeEvent<HTMLSelectElement>) => {
      set_stock(event.target.value); // Update the selected option when it changes
    };
  const [isVisible, setIsVisible] = useState(false);

  const [tax_type, set_tax_type] = useState('');
  const handleChange_taxtype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_tax_type(event.target.value); // Update the selected option when it changes
  };
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isVisible) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = ''; // Restore scrolling when the popup is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is restored when the component is unmounted
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);
  const handleSubmit = () => {
    onSearch(product_name, status,category_id,supplier_id,tax_id,tax_type,stock);
    onClose();
};

const [category_id, set_category_id] = useState('');
const handleChange_cayegory = (event: React.ChangeEvent<HTMLSelectElement>) => {
  set_category_id(event.target.value); // Update the selected option when it changes
};
const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
const [error, setError] = useState<string | null>(null);
const [supplierData, setSupplierData] = useState<any>(null); // State to store category data
const [taxData, setTaxData] = useState<any>(null); // State to store category data
const [storeData, setStoreData] = useState<any>(null); // State to store category data getAllTagOptions
const [tagData, setTagData] = useState<any>(null);
useEffect(() => {
  fetchData(
    '/getAllcategoryOptions/' + outlet_id,
    setCategoryData,
    setError,
    setIsLoading,
  );
  fetchData(
    '/getAllSuppliersoptions/' + outlet_id,
    setSupplierData,
    setError,
    setIsLoading,
  );
  fetchData(
    '/getAllTaxOptions/' + outlet_id,
    setTaxData,
    setError,
    setIsLoading,
  );

  fetchData(
    '/getAllTagOptions/' + outlet_id,
    setTagData,
    setError,
    setIsLoading,
  );

  //getAllStoresOptions


  // Call the fetchData function when the component mounts
  // console.log(JSON.stringify(subcategoryData));
//  console.log(categoryData);
}, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount


const [supplier_id, set_supplier_id] = useState('');
const handleChange_supplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
  set_supplier_id(event.target.value); // Update the selected option when it changes
}

const [tax_id,set_tax_id] = useState('');
const handleChange_tax = (event: React.ChangeEvent<HTMLSelectElement>) => {
  set_tax_id(event.target.value); // Update the selected option when it changes
};




  return (
    <>
      {isVisible && (
        <>
          <div className="overlay fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-500"></div>
          <div
            ref={popupRef}
            className="fixed inset-x-0 bottom-0  flex justify-center items-end  newzindex"
          >
            <div className="bg-white p-6  shadow-lg animate__animated animate__bounceInUp w-full">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-3 rounded-full bg-primary text-white hover:bg-primary-300 mt-6 mb-2 md:mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="w-full flex flex-col md:flex-row p-2 sm:p-0">
              <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">
              <input
                    type="text"
                    name="product_name"
                    value={product_name}
                    onChange={(e) => set_product_name(e.target.value)}
                    placeholder="search Product Name"
                    className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                  />

              </div>
              <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">
              <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={category_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
                      >
                        <option value={10}>Choose Category</option>
                        {categoryData &&
                          categoryData.list &&
                          categoryData.list.map((category: any) => (
                            <option
                              key={category.id}
                              value={category.id}
                            >
                              {category.category_name}
                            </option>
                          ))}
                        {/* Add more options as needed */}
                      </select>
 
  </div>
  <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">
  <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={supplier_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_supplier} // Call handleChange function when the select input value changes
                      >
                        <option value={10}>Choose Supplier</option>
                        {supplierData &&
                          supplierData.list &&
                          supplierData.list.map((supplierData: any) => (
                            <option
                              key={supplierData.id}
                              value={supplierData.id}
                            >
                              {supplierData.supplier_name}
                            </option>
                          ))}
                        {/* Add more options as needed */}
                      </select>
  </div>
  <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">


  <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={tax_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_tax} // Call handleChange function when the select input value changes
                      >
                        <option value={10}>Choose Tax</option>
                        {taxData &&
                          taxData.list &&
                          taxData.list.map((taxData: any) => (
                            <option
                              key={taxData.id}
                              value={taxData.id}
                            >
                              {taxData.tax_name}
                            </option>
                          ))}
                        {/* Add more options as needed */}
                      </select>

  </div>








  </div>


              <div className="w-full flex flex-col md:flex-row  p-2 sm:p-0">

             
             
              <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={tax_type} // Set the value of the select input to the selected option state
                        onChange={handleChange_taxtype} // Call handleChange function when the select input value changes
                      >
                        <option value={10}>Choose Tax Type</option>
                        <option value={'Inclusive'}> Inclusive</option>
                        <option value={'Exclusive'}> Exclusive</option>
                      </select>


                </div>
               
                <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
                <select
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                    value={stock} // Set the value of the select input to the selected option state
                    onChange={handleChange_stock} // Call handleChange function when the select input value changes
              >
                    <option value={10}>Stock </option>
                    <option value={1}>High</option>
                    <option value={0}>Low</option>
                    {/* Add more options as needed */}
                  </select>
               
               
                  <select
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                    value={status} // Set the value of the select input to the selected option state
                    onChange={handleChange_status} // Call handleChange function when the select input value changes
              >
                    <option value={10}>Status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>

                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
                  <button
                    onClick={handleSubmit}
                    className="w-full md:w-full flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10 md:ml-2 mt-2 md:mt-0"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search mr-2 md:mr-0 md:ml-2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="text-sm hidden md:inline-block">
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Filter;
