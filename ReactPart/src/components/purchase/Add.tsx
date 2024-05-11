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
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import fetchData from '../fetchData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
const Add: React.FC<AddProps> = ({ onSuccess, onError }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
  ];
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [category_name, setcategory_name] = useState('');
  const [color_code, setcolor_code] = useState('');
  const [description, setdescription] = useState('');
  const [reference_number, set_reference_number] = useState('');
  const [purchase_status, set_purchase_status] = useState<string>(''); // State to store the selected option value
  const handleChange_purchase_status = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    set_purchase_status(event.target.value); // Update the selected option when it changes
  };
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Move the hook call here
  const outlet_id = localStorage.getItem('outlet_id');
  const [supplierData, setSupplierData] = useState<any>(null); // State to store category data
  const [supplier_id, set_supplier_id] = useState('');
  const handleChange_supplier = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    set_supplier_id(event.target.value); // Update the selected option when it changes
  };
  const [suggestions, setSuggestions] = useState([]);
  const [total_amount, set_total_amount] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  useEffect(() => {
    fetchData(
      '/getAllSuppliersoptions/' + outlet_id,
      setSupplierData,
      setError,
      setIsLoading,
    );
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleSubmit = async () => {
    if (!supplier_id) {
      toast.error('Please fill Supplier Id', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!reference_number) {
      toast.error('Please fill Reference Number', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let formattedDate;
      if (selectedDate) {
        formattedDate = selectedDate.toISOString().substring(0, 10); // Format selectedDate to YYYY-MM-DD
      } else {
        const currentDate = new Date();
        formattedDate = currentDate.toISOString().substring(0, 10); // Format current date to YYYY-MM-DD
      }
      const postData = {
        outlet_id: outlet_id,
        supplier_id: supplier_id, // Include the selected supplier id
        purchase_date: formattedDate, // Include the selected date
        reference_no: reference_number, // Include the reference number
        formData: formData, // Include the formData
        grand_total: totalAmount,
        purchase_status: purchase_status,
        purchase_note: description,
      };

      const response = await axiosInstance.post(
        '/createPurchaseOrder',
        postData,
      );
      console.log(JSON.stringify(response));
      console.log(
        '========================JSON FORM================>' +
          JSON.stringify(postData),
      );
      const responseCode = response.data.responseCode;
      if (responseCode == 0) {
        const message = response.data.message;
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
        setTimeout(() => {
          navigate('/purchaselist'); // Use navigate to redirect after successful login
        }, 2000);
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
        // setError('Opps Some Error ');
      }

      //  const response = await axiosInstance.post('/addcategory', postData);
      // Rest of the code...
    } catch (error) {
      // Error handling code...
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitold = async () => {
    setLoading(true);
    setError(null);

    try {
      const postData = {
        category_name: category_name,
        outlet_id: outlet_id,
        description: description,
      };
      const response = await axiosInstance.post(
        '/createPurchaseOrder',
        postData,
      );
      console.log(JSON.stringify(response));
      const responseCode = response.data.responseCode;

      if (responseCode == 0) {
        const message = response.data.message;
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
        setTimeout(() => {
          navigate('/categorylist'); // Use navigate to redirect after successful login
        }, 2000);
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
        // setError('Opps Some Error ');
      }

      if (onSuccess) {
        onSuccess();
        alert('Login successful');
      }
    } catch (error) {
      //  setError((error as Error).message || 'An error occurred');
      setError('Invalid credentials ');
      if (onError) {
        onError();
      }
    } finally {
      setLoading(false);
    }
  };

  const [isExpanded_last, setIsExpanded_last] = useState(true);
  const toggleExpansion_last = () => {
    setIsExpanded_last(!isExpanded_last);
  };
  const [description_last, setdescription_last] = useState('');

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const fetchSuggestions = async (inputValue: any) => {
    if (inputValue.length > 2) {
      try {
        const apicall =
          'http://localhost:3000/api/getAllItemsSearch/' +
          outlet_id +
          '/' +
          inputValue;
        const response = await fetch(apicall);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSuggestions(data.items);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  const handleChangeSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setInputValue(value);
    // Call your API to fetch suggestions based on the input value
    fetchSuggestions(value);
  };
  const handleSelectSuggestion = (
    id: string,
    itemName: string,
    salesPrice: any,
    purchasePrice: any,
    taxId: any,
    taxName: any,
  ) => {
    // Create a new item object with the selected values
    const newItem = {
      item_id: id,
      itemName: itemName,
      salesPrice: salesPrice,
      purchasePrice: purchasePrice,
      taxId: taxId,
      taxName: taxName,
      quantity: 1, // Set quantity to 1 initially
    };

    // Update the form state to include the new item
    setFormData([...formData, newItem]);

    // Clear suggestions
    setSuggestions([]);
    setInputValue('');
  };

  const [formData, setFormData] = useState<any[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string,
  ) => {
    setInputValue('');
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = [...prevState];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [fieldName]: value,
      };
      return updatedFormData;
    });
  };

  const PlusIcon = () => <FontAwesomeIcon icon={faPlus} />;
  const MinusIcon = () => <FontAwesomeIcon icon={faMinus} />;

  const [value, setValue] = useState(1);

  const handleIncrement = (index) => {
    // Ensure the index is valid
    if (index >= 0 && index < formData.length) {
      // Get the current quantity value
      const currentQuantity = formData[index].quantity;

      // Increment the quantity by 1
      const updatedQuantity = currentQuantity + 1;

      // Update the formData array with the new quantity value
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = {
          ...updatedFormData[index],
          quantity: updatedQuantity,
        };
        return updatedFormData;
      });
    }
  };

  const handleDecrement = (index) => {
    // Ensure the index is valid
    if (index >= 0 && index < formData.length) {
      // Get the current quantity value
      const currentQuantity = formData[index].quantity;

      // Ensure the quantity is greater than 0 before decrementing
      if (currentQuantity > 0) {
        // Decrement the quantity by 1
        const updatedQuantity = currentQuantity - 1;

        // Update the formData array with the new quantity value
        setFormData((prevFormData) => {
          const updatedFormData = [...prevFormData];
          updatedFormData[index] = {
            ...updatedFormData[index],
            quantity: updatedQuantity,
          };
          return updatedFormData;
        });
      }
    }
  };
  const handleDelete = (indexToDelete: number) => {
    // Create a copy of the formData array
    const updatedFormData = [...formData];

    // Remove the item at the specified index
    updatedFormData.splice(indexToDelete, 1);

    // Update the formData state with the updated array
    setFormData(updatedFormData);
  };

  const totalAmount = formData
    .reduce((total, item) => {
      return total + parseFloat(item.purchasePrice) * parseFloat(item.quantity);
    }, 0)
    .toFixed(2);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Purchase" />
      <ToastContainer />{' '}
      {/* Toast container must be rendered at the root level */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Purchase Information
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
                className={`rounded-sm border moreht border-stroke h-240 bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                  isExpanded ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
                  {/* Category Information */}

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="w-full xl:w-1/2 mb-1">
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

                    <div className={`w-full xl:w-1/2 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Purchase Date
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="YYYY-MM-dd"
                        placeholderText="Select Date"
                        className="custom-date-picker" // Apply your CSS class
                      />
                    </div>

                    {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
                  </div>
                  {/* Product Information end */}
                  {/* Product Information */}
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="w-full xl:w-1/2 mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Status
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      {isLoading && <div>Loading...</div>}
                      <select
                        name="purchase_status"
                        value={purchase_status} // Set the value of the select input to the selected option state
                        onChange={handleChange_purchase_status} // Call handleChange function when the select input value changes
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                      >
                        <option value={'Received'}> Received</option>
                        <option value={'Pending'}> Pending</option>
                      </select>
                    </div>
                    <div className={`w-full xl:w-1/2 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Reference No
                      </label>
                      <input
                        type="text"
                        name="reference_number"
                        onChange={(e) => set_reference_number(e.target.value)}
                        value={reference_number}
                        placeholder="Reference No"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 xl:flex-row mt-4">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleChangeSearch}
                      placeholder="Search Products..."
                      className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                    />
                    {suggestions && suggestions.length > 0 && (
                      <ul className="absolute z-40 bg-white border border-gray-200 rounded-b mt-10 w-[93.8%]">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() =>
                              handleSelectSuggestion(
                                suggestion.id,
                                suggestion.item_name,
                                suggestion.sales_price,
                                suggestion.purchase_price,
                                suggestion.tax_id,
                                suggestion.tax_name,
                              )
                            }
                          >
                            {suggestion.item_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Product Information end */}

                  <div className="flex flex-col gap-4 mt-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Item Name</th>
                          <th className="px-4 py-2">Qty</th>
                          <th className="px-4 py-2">Sales Price</th>
                          <th className="px-4 py-2">Purchase Price</th>
                          <th className="px-4 py-2">Tax </th>

                          <th className="px-4 py-2">Total Amount </th>
                          <th className="px-4 py-2">Delete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.map((item, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">
                              <input
                                type="hidden"
                                value={item.item_id}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'itemName')
                                }
                                placeholder="Item id"
                              />
                              <input
                                type="text"
                                value={item.itemName}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'itemName')
                                }
                                placeholder="Item Name"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-4 py-2 flex items-center">
                              <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
                                onClick={() => handleDecrement(index)}
                              >
                                <MinusIcon />
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                placeholder="Qty"
                                className="w-full bg-transparent outline-none text-center"
                              />
                              <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
                                onClick={() => handleIncrement(index)}
                              >
                                <PlusIcon />
                              </button>
                            </td>
                            <td className="border px-4 py-2">
                              <input
                                type="text"
                                value={item.salesPrice}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'salesPrice')
                                }
                                placeholder="Sales Price"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <input
                                type="text"
                                value={item.purchasePrice}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'purchasePrice')
                                }
                                placeholder="Purchase Price"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <input
                                type="text"
                                value={item.taxName}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'taxName')
                                }
                                placeholder="Tax ID"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <input
                                type="text"
                                value={(
                                  item.purchasePrice * item.quantity
                                ).toFixed(2)}
                                onChange={(e) =>
                                  handleInputChange(e, index, 'totalAmount')
                                }
                                placeholder="Total Amount"
                                className="w-full bg-transparent outline-none"
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <button
                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                onClick={() => handleDelete(index)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={7} className="border px-4 py-2">
                            <input
                              type="hidden"
                              name="totalAmount"
                              value={totalAmount}
                              onChange={(e) => set_total_amount(e.target.value)}
                              placeholder="Item id"
                            />
                            <p className="text-right font-bold">
                              {' '}
                              Total Amount: {totalAmount}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="w-full  mb-1">
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel"></label>
                      <textarea
                        rows={6}
                        name="description"
                        value={description}
                        placeholder="Descriptions"
                        onChange={(e) => setdescription(e.target.value)}
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex mt-5 flex-col gap-4 xl:flex-row">
                    <button className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Add Purchase
                    </button>
                  </div>
                  {/* Add more product information fields here */}
                  {error && (
                    <div className="text-center text-white">{error}</div>
                  )}
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
