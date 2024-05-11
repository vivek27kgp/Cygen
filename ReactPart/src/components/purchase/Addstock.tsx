import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Categorypage from './Categoryform';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import Select from 'react-select';
import Textbox from '../formelement/Textbox';
import Tooltip from '../Chat/Tooltip';
import Textarea from '../formelement/Textarea';
import ImageUploader from '../formelement/ImageUploader';
import { NavLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import fetchData from '../fetchData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface AddProps {
  onSuccess?: () => void;
  onError?: () => void;
}
interface Category {
  item_name: number;
  from_store: string;
  from_qty: string;
  to_store: string;
  to_qty: string;
  date:string
 
}
function formatDataToCSV(data: any[]): string {
  console.log("csv---------------->"+JSON.stringify(data));
  // Format your data with custom headings here
  // For example:
  
  const csvHeaders = ['Product','From Store','From Qty','To Store','To Qty','Date']; // Custom headings
  const csvRows = data  && data.map((item: any) => {
    const rowData = [
      item.item_name,
      item.from_store,
      item.from_qty,
      item.to_store,
      item.to_qty,
      item.date
    ];
    return rowData.join(','); // Assuming item is an object
  });
  return csvHeaders.join(',') + '\n' + csvRows.join('\n');
}


function downloadCSV(csvData: string, filename: string) {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const Addstock: React.FC<AddProps> = ({ onSuccess, onError }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

const downloadCSVAll22 = () => {
    console.log("downloadCSVAll22 function called");
};
  const [isExpanded, setIsExpanded] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const [storeFromId, setStoreFromId] = useState('');
  const [storeToId, setStoreToId] = useState('');
  const [category_id, set_category_id] = useState('');
  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
  ];

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [color_code, setcolor_code] = useState('');
  const [description, setdescription] = useState('');
  const [reference_number, set_reference_number] = useState('');
  const [purchase_status, set_purchase_status] = useState<string>('');

  const handleChange_purchase_status = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_purchase_status(event.target.value);
  };

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const outlet_id = localStorage.getItem('outlet_id');
  const [supplierData, setSupplierData] = useState<any>(null);
  const [supplier_id, set_supplier_id] = useState('');
  let storedStoreId:any = localStorage.getItem('selectedStore');
  if(storedStoreId=='' || storedStoreId=='10'){
     storedStoreId=0;
  }
  const handleChange_supplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_supplier_id(event.target.value);
  }

  const [suggestions, setSuggestions] = useState([]);
  const [total_amount, set_total_amount] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const downloadCSVAll = (data:any) => {
   const csvData = formatDataToCSV(data); // Function to format data as CSV
   downloadCSV(csvData, 'category_data.csv'); // Function to trigger download
  };
  
  const generateAndDownloadPDF = (data: Category[]) => {
    const pdf = new jsPDF();
    const headers = [['Product','From Store','From Qty','To Store','To Qty','Date']];
    const rows = data.map(item => [
      item.item_name,
      `${item.from_store!='0'?item.from_store:'--'}`,
      item.from_qty!='0'?item.from_qty:'--',
      item.to_store!='0'?item.to_store:'--',
      item.to_qty!='0'?item.to_qty:'--',
      item.date!='0'?item.date:'--',
    ]);
  
    pdf.autoTable({ head: headers, body: rows });
    pdf.save('ccategory_data.pdf');
  };
  

  const downloadPdf = (data:any) => {
    generateAndDownloadPDF(data)
   };












  useEffect(() => {
    fetchData('/getAllSuppliersoptions/' + outlet_id, setSupplierData, setError, setIsLoading);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      let formattedDate;
      if (selectedDate) {
        formattedDate = selectedDate.toISOString().substring(0, 10);
      } else {
        const currentDate = new Date();
        formattedDate = currentDate.toISOString().substring(0, 10);
      }

      const postData = {
        outlet_id: outlet_id,
        formData: formData
      };
      console.log("--------------"+JSON.stringify(postData));


      const response = await axiosInstance.post('/addStockTransfer', postData);
 
      const responseCode = response.data.responseCode;
      console.log("------------------to -------------->"+JSON.stringify( response.data.list));
      if (responseCode =="0") {

        const message = response.data.message;
        setModalData(response.data.list);
        setModalOpen(true);
        const csvData = formatDataToCSV(response.data.list); // Function to format data as CSV
      //  downloadCSV(csvData, 'category_data.csv'); // Function to trigger download
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
        setTimeout(() => {
        //  navigate('/productlist');
        }, 2000);
     
        setFormData([]);


      } else {
        const message = response.data.message;
        toast.error(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
      }





    } catch (error) {
     // setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const [isExpanded_last, setIsExpanded_last] = useState(true);
  const toggleExpansion_last = () => {
    setIsExpanded_last(!isExpanded_last);
  };

  const [description_last, setdescription_last] = useState('');

  const [from_qty, set_from_qty] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const fetchSuggestions = async (inputValue: any) => {
    if (inputValue.length > 2) {
      try {
        const category_detail = category_id!=''?category_id:0;
        const apicall = 'http://localhost:3000/api/getAllItemsSearch/' + outlet_id + '/' + inputValue+'/'+category_detail;
        const response = await fetch(apicall);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSuggestions(data.items);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const handleChangeSearch = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (id: string, itemName: string, salesPrice: any, purchasePrice: any, taxId: any, taxName: any) => {
    const newItem = {
      item_id: id,
      itemName: itemName,
      salesPrice: salesPrice,
      purchasePrice: purchasePrice,
      taxId: taxId,
      taxName: taxName,
      quantity: 1
    };

    setFormData([...formData, newItem]);
    setSuggestions([]);
    setInputValue('');
  };

  const [formData, setFormData] = useState<any[]>([]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
  //   setInputValue('');
  //   const { value } = e.target;
  //   setFormData(prevState => {
  //     const updatedFormData = [...prevState];
  //     updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value };
  //     return updatedFormData;
  //   });
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
    const { value } = e.target;
  
    // Check if the input field is "TO_QTY" and if the entered value is greater than the corresponding "FROM_QTY"
    if (fieldName === 'to_qty') {
      const fromQty = parseFloat(formData[index]?.from_qty);
      const toQty = parseFloat(value);
      
      // If the entered value is greater than the "FROM_QTY", set the "TO_QTY" value to be equal to "FROM_QTY"
      if (toQty > fromQty) {
        setFormData(prevState => {
          const updatedFormData = [...prevState];
          updatedFormData[index] = { ...updatedFormData[index], [fieldName]: fromQty.toString() };
          return updatedFormData;
        });
      } else {
        // Otherwise, update the input field value normally
        setFormData(prevState => {
          const updatedFormData = [...prevState];
          updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value };
          return updatedFormData;
        });
      }
    } else {
      // For other fields, update the input field value normally
      setFormData(prevState => {
        const updatedFormData = [...prevState];
        updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value };
        return updatedFormData;
      });
    }
  };

  
  const handleDelete = (indexToDelete: number) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(indexToDelete, 1);
    setFormData(updatedFormData);
  };

  const [storeData, setStoreData] = useState<any>(null);
  const totalAmount = formData.reduce((total, item) => {
    return total + (parseFloat(item.purchasePrice) * parseFloat(item.quantity));
  }, 0).toFixed(2);

  const [category_name, setCategory_name] = useState<string>('');
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    fetchData('/getAllcategoryOptions/' + outlet_id, setCategoryData, setError, setIsLoading);
    fetchData('/getAllStoresOptions/' + outlet_id, setStoreData, setError, setIsLoading);
  }, []);

  const handleChange_cayegory = async (event: React.ChangeEvent<HTMLSelectElement>) => {


    try {
      const category_detail = event.target.value!=''?event.target.value:0;
      const apicall = 'http://localhost:3000/api/getAllItemsSearch/' + outlet_id + '/' + '0'+'/'+category_detail;
      const response = await fetch(apicall);
      if (response.ok) {
        const data = await response.json();
        //setSuggestions(data.items);
        
        // Add all products related to the selected category to the form data
        const newFormData = data.items.map((item: any) => ({
          item_id: item.id,
          itemName: item.item_name,
          salesPrice: item.salesPrice,
          purchasePrice: item.purchasePrice,
          taxId: item.taxId,
          taxName: item.taxName,
          quantity: 1
        }));
        
        setFormData(newFormData);







      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }





    set_category_id(event.target.value); // Update the selected option when it changes
  };

  const [fromStoreId, setFromStoreId] = useState('');
  const [toStoreId, setToStoreId] = useState('');

  const handleChangeFromStore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFromStoreId(event.target.value);
  };

  const handleChangeToStore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToStoreId(event.target.value);
  };

  /*
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number, fieldName: string) => {
    const { value } = e.target;
    setFormData(prevState => {
      const updatedFormData = [...prevState];
      updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value };
      return updatedFormData;
    });
  };

*/

const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>, index: number, fieldName: string, itemId: string) => {
  const { value } = e.target;
  try {
    const url = 'http://localhost:3000/api/getTotalStock/' + outlet_id + '/' + value + '/' + itemId;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const total_stock_value = data.total_stock_value!='' && data.total_stock_value!=null ?data.total_stock_value:0;
       // alert(total_stock_value);
      setFormData(prevState => {
        const updatedFormData = [...prevState];
        updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value, from_qty: total_stock_value };
        return updatedFormData;
      });
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const handleSelectChangeTo = async (e: React.ChangeEvent<HTMLSelectElement>, index: number, fieldName: string, itemId: string) => {
  const { value } = e.target;
  try {
    const url = 'http://localhost:3000/api/getTotalStock/' + outlet_id + '/' + value + '/' + itemId;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const total_stock_value = data.total_stock_value!='' && data.total_stock_value!=null ?data.total_stock_value:0;
       // alert(total_stock_value);
      setFormData(prevState => {
        const updatedFormData = [...prevState];
        updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value, to_qtyhold: total_stock_value };
        return updatedFormData;
      });
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleAddRow11 = () => {
  const lastItem = formData[formData.length - 1]; // Get the last item in the formData array
  const newFormDataItem = {
    item_id: lastItem.id,
    itemName: lastItem.itemName, // Copy the product name from the last row
    storeFromId: lastItem.storeFromId, // Copy the storeFromId from the last row
    from_qty: lastItem.from_qty, // Copy the from_qty from the last row
    storeToId: lastItem.storeToId, // Copy the storeToId from the last row
    to_qty: lastItem.to_qty, // Copy the to_qty from the last row
  };

  // Add the new row to the formData state
  setFormData(prevState => [...prevState, newFormDataItem]);
};
const handleAddRow = (index: number) => {
  const itemToCopy = formData[index]; // Get the item to copy based on the index
  const newFormDataItem = {
    item_id: itemToCopy.item_id,
    itemName: itemToCopy.itemName, // Copy the product name from the selected row
    storeFromId: itemToCopy.storeFromId, // Copy the storeFromId from the selected row
    from_qty: itemToCopy.from_qty, // Copy the from_qty from the selected row
    storeToId: itemToCopy.storeToId, // Copy the storeToId from the selected row
    to_qty: itemToCopy.to_qty, // Copy the to_qty from the selected row
  };

  // Insert the new row below the selected row
  setFormData(prevState => {
    const updatedFormData = [...prevState];
    updatedFormData.splice(index + 1, 0, newFormDataItem);
    return updatedFormData;
  });
};



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stock Transfer" />
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="relative">
              <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
             
             
             
             
             
              </div>
              <div className={`rounded-sm border moreht border-stroke h-240 bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${isExpanded ? 'block' : 'hidden'}`}>
              
              <div className="p-6.5 pb-0">
           <label className="mb-1.5 block text-black dark:text-white fotnlabel">
           Category
           </label>
 
           <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
           {isLoading && <div>Loading...</div>}
           <select
                          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
                        value={category_id} // Set the value of the select input to the selected option state
                        onChange={handleChange_cayegory} // Call handleChange function when the select input value changes
                      >
                        <option value={'0'}>select</option>
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
              
              
                <div className="p-6.5 pt-0 pb-0">
                <label className="mb-1.5 block text-black dark:text-white fotnlabel">
           Search Product
           </label>
                  <div className="flex flex-col gap-4 xl:flex-row mt-4">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleChangeSearch}
                      placeholder="Search Products..."
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {suggestions && suggestions.length > 0 && (
                      <ul className="absolute z-40 bg-white border border-gray-200 rounded-b mt-10 w-[93.8%]">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleSelectSuggestion(suggestion.id, suggestion.item_name, suggestion.fromQty, suggestion.purchase_price, suggestion.tax_id, suggestion.tax_name)}
                          >
                            {suggestion.item_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 w-1/4">Item Name</th>
                          <th className="px-4 py-2 w-1/5">From Store</th>
                          <th className="px-4 py-2 w-1/12">Qty</th>
                          <th className="px-4 py-2 w-1/5">To Store</th>
                          <th className="px-4 py-2 w-1/5">Qty</th>
                          <th className="px-4 py-2 w-1/12">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.map((item, index) => (
                          <tr key={index}>
                            <td className="border px-2 py-2 w-1/4">
                            <input
        type="hidden"
        value={item.item_id}
        placeholder="Item id"
       
      />
                              <input
                                type="text"
                                value={item.itemName}
                                onChange={(e) => handleInputChange(e, index, 'itemName')}
                                placeholder="Item Name"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-2 py-2 w-1/5">
                              {isLoading && <div>Loading...</div>}
                              <select
  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
  value={formData[index]?.storeFromId || '0'} // Use formData[index]?.storeFromId as value
  onChange={(e) => handleSelectChange(e, index, 'storeFromId',item.item_id,'from_qty')} // Call handleSelectChange
>
  <option value={'0'}>All Store</option>
  {storeData &&
    storeData.list &&
    storeData.list.map((storeData: any) => (
      <option key={storeData.id} value={storeData.id}>
        {storeData.store_name}
      </option>
    ))}
</select>
                            </td>
                            <td className="border px-2 py-2 w-1/12">
                              <input
                                readOnly
                                type="text"
                                value={item.from_qty} // Use item.from_qty instead of item.taxName
  onChange={(e) => handleInputChange(e, index, 'from_qty')} // Call handleInputChange
                                placeholder="Qty"
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              />
                            </td>
                            <td className="border px-2 py-2  w-1/6">
                              {isLoading && <div>Loading...</div>}
                              <select
  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
  value={formData[index]?.storeToId || '0'} // Use formData[index]?.storeToId as value
  onChange={(e) => handleSelectChangeTo(e, index, 'storeToId',item.item_id,'to_qtyhold')} // Call handleSelectChange
>
{/* <option value={'0'}>All Store</option> */}
  {storeData &&
    storeData.list &&
    storeData.list.map((storeData: any) => (
      <option key={storeData.id} value={storeData.id}>
        {storeData.store_name}
      </option>
    ))}
</select>
                            </td>
                            <td className="border px-2 py-2 w-1/12">
    <div className="flex">
        <span className='text-sm w-1/4 mt-4 mr-1 text-right'>Avl</span>
        <input
            type="text"
            value={item.to_qtyhold}
            readOnly
            placeholder="Qty"
            className="text-center mr-4 w-1/4  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
            type="text"
            value={item.to_qty}
            onChange={(e) => handleInputChange(e, index, 'to_qty')}
            placeholder="Qty"
            className=" w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
    </div>
</td>

                            <td className="border px-2 py-2  w-1/3">
                            <button
                           onClick={() => handleAddRow(index)} // Call handleAddRow when the button is clicked
                            className="pl-1 text-primary hover:text-primary focus:outline-none">
                               <FontAwesomeIcon icon={faCopy} size="sm"  />

                              </button>
                              
                              <button title='Delete' className="pl-2 text-primary hover:text-primary focus:outline-none" onClick={() => handleDelete(index)}>
                              <FontAwesomeIcon icon={faTrash} size="sm"  />
                              </button>
                             
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex mt-5 flex-col gap-4 xl:flex-row">
                
  <button
    
    onClick={() => handleSubmit()} // Pass the item to the handleSubmit function
    disabled={loading}
    className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
  >
    Stock transfer
  </button>


                  </div>
                  {error && <div className="text-center text-white">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {modalOpen && (
        

<>
      <div className="overlay fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-500"></div>
      <div className="fixed inset-x-0  flex justify-center items-end z-999999   top-20">
        {/* Modal content */}
        <div className="bg-white p-8 rounded-lg relative" >
          {/* Modal header */}
          <button
              className="text-primary hover:text-gray-700 absolute top-0 right-0 w-5 h-5 rounded-full"
              onClick={() => setModalOpen(false)} // Pass selected category data and ID when closing
            >
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M11.414 10l4.293-4.293a1 1 0 10-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 101.414-1.414L11.414 10z" />
              </svg>
            </button>
          <div className="flex justify-center mt--6" >
            <p className='border-b-2 border-primary w-full    text-title-sm'>Stock Trasform Detail Information</p>
            <div className="flex justify-end items-center flex-wrap">
  {/* Links for Excel and PDF  downloadPdf  */}
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center ">
              <a onClick={() => downloadCSVAll(modalData)} className="mr-4 mb-2 cursor-pointer">
              <img src={excelimg} alt="Excel" />
              </a>
              <a  className="mr-4 mb-2" onClick={() => downloadPdf(modalData)}>
              <img src={pdfimg} alt="PDF" />
              </a>
             
            </div>

</div>
          </div>
          {/* Modal body */}
          <div className="w-full mb-1">
                

         

          <table className="w-full divide-y divide-orange-400">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
       Product Name
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       From Store
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       Qty
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       To Store
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       Qty
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Date
      </th>
      
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
     
      
  
    {modalData  && modalData.map((category: any) => (
      <tr key={category.id} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
         <p className="text-sm text-black dark:text-white">{category.item_name}</p>
        </td>
     
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          {category.from_store!='0'?category.from_store:'---'}
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          {category.from_qty!='0'?category.from_qty:'---'}
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          {category.from_store!='0'?category.to_store:'---'}
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          {category.to_qty!='0'?category.to_qty:'---'}
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        {category.date!='0'?category.date:'---'}
        </td>
       
       
        
      </tr>
    ))}
  </tbody>
</table>







<div className="flex mt-5 flex-col gap-4 xl:flex-row">
                

		





                  </div>





        </div>
        {/* Modal overlay */}
        
      </div>
      </div>
    </>



      )}







    </DefaultLayout>
  );
};

export default Addstock;
