import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Select from 'react-select';
import Tooltip from '../Chat/Tooltip';
import ImageUploader from '../formelement/ImageUploader';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import fetchData from '../fetchData';
interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
const Add: React.FC<AddProps> = ({ onSuccess, onError }) => {
  const [isExpanded, setIsExpanded] = useState(true);
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

  const [customer_name, set_customer_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [mobile, set_mobile] = useState('');
  const [email, set_email] = useState('');
  const [tax_number, set_tax_number] = useState('');
  const [city, set_city] = useState('');
  const [address, set_address] = useState('');
  const [phone, set_phone] = useState('');
  const [postcode, set_postcode] = useState('');
  const [contact_name, set_contact_name] = useState('');
  const [country, set_country] = useState('');

  const [category_name, setCategory_name] = useState<string>(''); // State to store the selected option value

  const handleChange_cayegory = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory_name(event.target.value); // Update the selected option when it changes
  };
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Move the hook call here
  const outlet_id = localStorage.getItem('outlet_id');
  const handleSubmit = async () => {
    if (!customer_name) {
      toast.error('Please fill Customer Name', {
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

    if (!last_name) {
      toast.error('Please fill Last Name', {
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

    if (!email) {
      toast.error('Please fill Email Address', {
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

    if (!mobile) {
      toast.error('Please fill Mobile Number', {
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
      const postData = {
        customer_name: customer_name,
        outlet_id: outlet_id,
        last_name: last_name,
        email: email,
        mobile: mobile,
      };
      const response = await axiosInstance.post('/addcustomer', postData);
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
          navigate('/customerlist'); // Use navigate to redirect after successful login
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
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Category" />
      <ToastContainer />{' '}
      {/* Toast container must be rendered at the root level */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white fotnlabelhd">
                  Customer Information
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
                  {/* Category Information */}

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:full mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="customer_name"
                        value={customer_name}
                        onChange={(e) => set_customer_name(e.target.value)}
                        placeholder="first Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className={`w-full  mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => set_last_name(e.target.value)}
                        placeholder=" Last Name"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full  mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Email
                      </label>
                      <input
                        type="text"
                        name="priority"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>

                    <div className={`w-full  mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Mobile
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => set_mobile(e.target.value)}
                        placeholder="Mobile"
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Product Information end */}

                  <div className="flex mt-5 flex-col gap-4 xl:flex-row">
                    <button className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Add
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
