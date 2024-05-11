import React, { useEffect, useState } from 'react';
import productimg from '../../images/product/oil.jpg';
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import ImageUploader from '../formelement/ImageUploader';
import Tooltip from '../Chat/Tooltip';
import Popup from '../Charts/Popup';
import CollapsibleContactForm from './CollapsibleContactForm';
import CollapsibleProductInfoprice from './CollapsibleProductInfoprice';
import Productinformation3 from './Productinformation3';
import Productinformation4 from './Productinformation4';
import Productinformation5 from './Productinformation5';
import { ToastContainer, toast } from 'react-toastify';
import Textbox from '../formelement/Textbox';

import fetchData from '../fetchData';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';
const Categorypage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
  ];
  const options = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Grocery' },
    { value: 'orange', label: 'Atta' },
  ];
  const optionsBrand = [
    { value: 'apple', label: 'Lotus' },
    { value: 'banana', label: 'Ayers' },
    { value: 'orange', label: 'Mrchi' },
  ];
  const optionstAX = [
    { value: 'FREE', label: 'FREE' },
    { value: 'GST', label: 'GST' },
  ];
  const optionstSORTING = [
    { value: 'higher', label: 'Higher' },
    { value: 'lower', label: 'Lower' },
  ];
  const optionstStatus = [
    { value: 'higher', label: 'Active' },
    { value: 'lower', label: 'Inactive' },
  ];
  let status = 'Paid';

  const [isExpanded_last, setIsExpanded_last] = useState(true);
  const toggleExpansion_last = () => {
    setIsExpanded_last(!isExpanded_last);
  };
  const [description_last, setdescription_last] = useState('');
  const [isExpanded_four, setIsExpanded_four] = useState(true);
  const [customer_barcode, set_customer_barcode] = useState('');
  const [color_code, setcolor_code] = useState('');
  const [description, setdescription] = useState('');
  const toggleExpansion_four = () => {
    setIsExpanded_four(!isExpanded_four);
  };

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);


  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Move the hook call here
  const outlet_id = localStorage.getItem('outlet_id');
  const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  // Fetch options from the API based on the selected value

  const [subcategoryData, setSubCategoryData] = useState<any>(null); // State to store category data
  const [unitData, setUnitData] = useState<any>(null); // State to store category data
  const [brandData, setBrandData] = useState<any>(null); // State to store category data
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
      '/getAllsubcategoryOptions/' + outlet_id,
      setSubCategoryData,
      setError,
      setIsLoading,
    );

    fetchData(
      '/getAllUnitsOptions/' + outlet_id,
      setUnitData,
      setError,
      setIsLoading,
    );
    fetchData(
      '/getAllBrandsOptions/' + outlet_id,
      setBrandData,
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
      '/getAllStoresOptions/' + outlet_id,
      setStoreData,
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
    console.log(JSON.stringify(subcategoryData));
  //  console.log(categoryData);
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount



  const [isExpanded_three, setIsExpanded_three] = useState(true);
  const toggleExpansion_three = () => {
    setIsExpanded_three(!isExpanded_three);
  };

  const [isExpanded_two, setIsExpanded_two] = useState(true);
  const toggleExpansion_two = () => {
    setIsExpanded_two(!isExpanded_two);
  };

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const [custom_barcode, set_custom_barcode] = useState('');
  const [item_name, set_item_name] = useState('');
  const [category_id, set_category_id] = useState('');
  const handleChange_cayegory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_category_id(event.target.value); // Update the selected option when it changes
  };
  const [unit_id, set_unit_id] = useState('');
  const handleChange_unit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_unit_id(event.target.value); // Update the selected option when it changes
  };
  const [alert_qty, set_alert_qty] = useState('');
  const [brand_id, seT_brand_id] = useState('');
  const handleChange_brand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    seT_brand_id(event.target.value); // Update the selected option when it changes
  };
  const [lot_number, set_lot_number] = useState('');
  const [expire_date, set_expire_date] = useState('');
  const [price, set_price] = useState('');
  const [tax_id,set_tax_id] = useState('');
  const handleChange_tax = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_tax_id(event.target.value); // Update the selected option when it changes
  };
  const [purchase_price, set_purchase_price] = useState('');
  const [tax_type, set_tax_type] = useState('');
  const handleChange_taxtype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_tax_type(event.target.value); // Update the selected option when it changes
  };
  const [profit_margin, set_profit_margin] = useState('');
  const [	sales_price, set_sales_price] = useState('');
  const [stock, set_stock] = useState('');
  const [subcategory_id, set_subcategory_id] = useState('');
  const handleChange_subcategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_subcategory_id(event.target.value); // Update the selected option when it changes
  };

  const [supplier_id, set_supplier_id] = useState('');
  const handleChange_supplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_supplier_id(event.target.value); // Update the selected option when it changes
  }
  const [gross_profit, set_gross_profit] = useState('');
  const [tag_id, set_tag_id] = useState('');
  const handleChange_tag = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_tag_id(event.target.value); // Update the selected option when it changes
  }
  const [priority, set_priority] = useState('');
  const [scale_weight_edit, set_scale_weight_edit] = useState('');
  const handleChange_weight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_scale_weight_edit(event.target.value); // Update the selected option when it changes
  }
  const [offerexclude_product, set_offerexclude_product] = useState('');
  const handleChange_offer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_offerexclude_product(event.target.value); // Update the selected option when it changes
  }
  const [store_id, set_store_id] = useState('');
  const handleChange_store = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_store_id(event.target.value); // Update the selected option when it changes
  }
  const [display_device, set_display_device] = useState('');
  const handleChange_device = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_display_device(event.target.value); // Update the selected option when it changes
  }
  const [profit, set_profit] = useState('');

  const [qty, set_qty] = useState('');
  const [mrp_price, set_mrp_price] = useState('');
  





  const handleSubmit = async () => {
   
    try {
    
      const postData = { "category_id": category_id, "outlet_id": outlet_id,"custom_barcode":custom_barcode,"item_name":item_name,"description":description,"sales_price":sales_price,"purchase_price":purchase_price,"stock":stock,"subcategory_id":subcategory_id,"unit_id":unit_id,"brand_id":brand_id,"tag_id":tag_id,"price":price,"lot_number":lot_number,"alert_qty":alert_qty,"store_id":store_id,"tax_id":tax_id,"tax_type":tax_type,"scale_weight_edit":scale_weight_edit };
      console.log(JSON.stringify(postData));
      
      const response = await axiosInstance.post('/createItem', postData);
      console.log(JSON.stringify(response));
      const responseCode = response.data.responseCode;

      if (responseCode== 0 ) {
        const message = response.data.message;
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar:false,
          closeButton: true,
          closeOnClick: true,
         
        });
        setTimeout(() => {
          navigate('/Productlist'); // Use navigate to redirect after successful login
        }, 2000);
       
      }else{
        const message = response.data.message;
        toast.error(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
          
        });
       // setError('Opps Some Error ');
      }

      // if (onSuccess) {
      //   onSuccess();
      //   alert('Login successful');
      // }
    } catch (error) {
    //  setError((error as Error).message || 'An error occurred');
        setError('Invalid credentials ');
      // if (onError) {
      //   onError();
      // }
    } finally {
     // setLoading(false);
    }
     

  };
  





  





  return (
    <>
     <ToastContainer /> {/* Toast container must be rendered at the root level */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="flex justify-end items-center flex-wrap"></div>

            {/* <CollapsibleContactForm></CollapsibleContactForm> */}

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
                <button
                  onClick={toggleExpansion}
                  className="focus:outline-none"
                >
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
                        name="custom_barcode"
                        value={custom_barcode}
                        onChange={(e) => set_custom_barcode(e.target.value)}
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
                        name="item_name"
                        value={item_name}
                        onChange={(e) => set_item_name(e.target.value)}
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
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={category_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
                      >
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
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={subcategory_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_subcategory} // Call handleChange function when the select input value changes
                      >
                         {subcategoryData &&
                          subcategoryData.list &&
                          subcategoryData.list.map((subcategoryData: any) => (
                            <option
                              key={subcategoryData.id}
                              value={subcategoryData.id}
                            >
                              {subcategoryData.subcategory_name}
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
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={unit_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_unit} // Call handleChange function when the select input value changes
                      >
                        {unitData &&
                          unitData.list &&
                          unitData.list.map((unitData: any) => (
                            <option
                              key={unitData.id}
                              value={unitData.id}
                            >
                              {unitData.unit_name}
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
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={brand_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_brand} // Call handleChange function when the select input value changes
                      >
                        {brandData &&
                          brandData.list &&
                          brandData.list.map((brandData: any) => (
                            <option
                              key={brandData.id}
                              value={brandData.id}
                            >
                              {brandData.brand_name}
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
            {/* <CollapsibleProductInfoprice></CollapsibleProductInfoprice> */}

            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke py-4  pl-0 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Product Price Information
                  <Tooltip text="Tooltip Content  about product information here how to add it ">
                    <button className="ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
                      ?
                    </button>
                  </Tooltip>
                </h3>
                <button
                  onClick={toggleExpansion_two}
                  className="focus:outline-none"
                >
                  {isExpanded_two ? (
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
                  isExpanded_two ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Current Opening Stock
                      </label>
                      <input
                        type="text"
                        name="qty"
                        value={qty}
                        onChange={(e) => set_customer_barcode(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        New Opening Stock
                      </label>
                      <input
                        type="text"
                        name="stock"
                        value={stock}
                        onChange={(e) => set_stock(e.target.value)}
                        placeholder="Category Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Supplier
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={supplier_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_supplier} // Call handleChange function when the select input value changes
                      >
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
                  </div>
                  {/* Product Information end Supplier Price */}

                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    {/* <Textbox categoryType='Supplier Price'></Textbox> */}
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Supplier Price
                      </label>
                      <input
                        type="text"
                        name="purchase_price"
                        value={purchase_price}
                        onChange={(e) => set_purchase_price(e.target.value)}
                        placeholder="Category Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Supplier Tax
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={tax_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_tax} // Call handleChange function when the select input value changes
                      >
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

                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Tax Type
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={tax_type} // Set the value of the select input to the selected option state
                        onChange={handleChange_taxtype} // Call handleChange function when the select input value changes
                      >
                        
                        <option value={'Inclusive'}> Inclusive</option>
                        <option value={'Exclusive'}> Exclusive</option>
                      </select>
                    </div>

                    {/* <SelectGroupOne  categoryType="Supplier Tax"/>
          <SelectGroupOne  categoryType="Tax Type*"/> */}
                  </div>
                  {/* Product Information end */}

                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    {/* <Textbox categoryType='Supplier Price with Tax'></Textbox> */}

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Supplier Price with Tax
                      </label>
                      <input
                        type="text"
                        name="purchase_price"
                        value={purchase_price}
                        onChange={(e) => set_purchase_price(e.target.value)}
                        placeholder="Category Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Profit
                      </label>
                      <input
                        type="text"
                        name="profit"
                        value={profit}
                        onChange={(e) => set_profit(e.target.value)}
                        placeholder="Category Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                   
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Profit Margin
                      </label>
                      <input
                        type="text"
                        name="profit_margin"
                        value={profit_margin}
                        onChange={(e) => set_profit_margin(e.target.value)}
                        placeholder="Category Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    {/* <SelectGroupOne  categoryType="Profit"/>
<SelectGroupOne  categoryType="Profit Margin(%) "/> */}
                  </div>
                  {/* Product Information end */}

                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    {/* <Textbox categoryType='Sales Price'></Textbox> */}
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Sales Price
                      </label>
                      <input
                        type="text"
                        name="sales_price"
                        value={sales_price}
                        onChange={(e) => set_sales_price(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Gross Profit
                      </label>
                      <input
                        type="text"
                        name="gross_profit"
                        value={gross_profit}
                        onChange={(e) => set_gross_profit(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Profit Margin RRP
                      </label>
                      <input
                        type="text"
                        name="profit_margin"
                        value={profit_margin}
                        onChange={(e) => set_profit_margin(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    {/* <Textbox categoryType='Gross Profit'></Textbox>
<Textbox categoryType='Profit Margin RRP '></Textbox> */}
                  </div>
                  {/* Product Information end */}

                  {/* Add more product information fields here */}
                </div>
              </div>
            </div>

            {/* <Productinformation3></Productinformation3> */}

            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke py-4 pl-0 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Product More Information
                  <Tooltip text="Tooltip Content  about product information here how to add it ">
                    <button className="ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
                      ?
                    </button>
                  </Tooltip>
                </h3>
                <button
                  onClick={toggleExpansion_three}
                  className="focus:outline-none"
                >
                  {isExpanded_three ? (
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
                  isExpanded_three ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Alert Quantity
                      </label>
                      <input
                        type="text"
                        name="alert_qty"
                        value={alert_qty}
                        onChange={(e) => set_alert_qty(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Lot Number
                      </label>
                      <input
                        type="text"
                        name="lot_number"
                        value={lot_number}
                        onChange={(e) => set_lot_number(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Expire Date
                      </label>
                      <input
                        type="text"
                        name="expire_date"
                        value={expire_date}
                        onChange={(e) => set_expire_date(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  {/* Product Information end Supplier Price */}

                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Priority
                      </label>
                      <input
                        type="text"
                        name="priority"
                        value={priority}
                        onChange={(e) => set_priority(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Store
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={store_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_store}// Call handleChange function when the select input value changes
                      >
                        {storeData &&
                          storeData.list &&
                          storeData.list.map((storeData: any) => (
                            <option
                              key={storeData.id}
                              value={storeData.id}
                            >
                              {storeData.store_name}
                            </option>
                          ))}
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Scale Weight Edit
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={scale_weight_edit} // Set the value of the select input to the selected option state
                        onChange={handleChange_weight} // Call handleChange function when the select input value changes
                      >
                           <option value={'1'}>Yes</option>
                           <option value={'0'}>No</option>
                          
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  {/* Product Information end */}
                  {/* Add more product information fields here */}
                </div>
              </div>
            </div>

            {/* <Productinformation4></Productinformation4> */}

            {/* <Productinformation4></Productinformation4> start */}

            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke py-4 pl-0 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Product Website Information
                  <Tooltip text="Tooltip Content  about product information here how to add it ">
                    <button className="ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
                      ?
                    </button>
                  </Tooltip>
                </h3>
                <button
                  onClick={toggleExpansion_four}
                  className="focus:outline-none"
                >
                  {isExpanded_four ? (
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
                  isExpanded_four ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    {/* <SelectGroupOne  categoryType="Website Tag"/> */}
                    <div className="w-full xl:w-1/3 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Website Tag
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={tag_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_tag} // Call handleChange function when the select input value changes
                      >
                        {tagData &&
                          tagData.list &&
                          tagData.list.map((tagData: any) => (
                            <option
                              key={tagData.id}
                              value={tagData.id}
                            >
                              {tagData.tag_name}
                            </option>
                          ))}
                        {/* Add more options as needed */}
                      </select>
                    </div>
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Priority
                      </label>
                      <input
                        type="text"
                        name="priority"
                        value={priority}
                        onChange={(e) => set_priority(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className={`w-full xl:w-1/3 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Stripe Price(MRP)
                      </label>
                      <input
                        type="text"
                        name="mrp_price"
                        value={mrp_price}
                        onChange={(e) => set_mrp_price(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    {/* <Textbox categoryType='Priority'></Textbox>
          <Textbox categoryType='Stripe Price(MRP)'></Textbox> */}
                  </div>
                  {/* Product Information end Supplier Price */}
                  {/* Add more product information fields here */}
                </div>
              </div>
            </div>

            {/* <Productinformation4></Productinformation4>  end */}

            {/* <Productinformation5></Productinformation5> */}

            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke pl-0 py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Product Gallery & Descriptions Information
                  <Tooltip text="Tooltip Content  about product information here how to add it ">
                    <button className="ml-1 bg-primary hover:bg-primary text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-sm">
                      ?
                    </button>
                  </Tooltip>
                </h3>
                <button
                  onClick={toggleExpansion_last}
                  className="focus:outline-none"
                >
                  {isExpanded_last ? (
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
                  isExpanded_last ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="w-full  mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel"></label>
                      <textarea
                        rows={6}
                        name="description"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      ></textarea>
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
            <div className="flex mt-5 flex-col gap-4 xl:flex-row">  
          <button
              className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Cancel
            </button>      
            <button
              onClick={handleSubmit} 
              className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Product
            </button>      
          </div>
            {/* <Productinformation5></Productinformation5> end */}
          </div>
        </div>
      </div>

      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};

export default Categorypage;
