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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the styles
import { FaEye, FaEyeSlash } from 'react-icons/fa';
interface AddProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const Add: React.FC<AddProps> = ({ onSuccess, onError }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customer_name, set_customer_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [mobile, set_mobile] = useState('');
  const [email, set_email] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [login_type, set_login_type] = useState<string>(''); // State to store the selected option value

  const handleChange_login_type = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    set_login_type(event.target.value); // Update the selected option when it changes
  };
  const navigate = useNavigate();
  const outlet_id = localStorage.getItem('outlet_id');
  const [showPassword, setShowPassword] = useState(false); // State variable to track whether to show the password or not

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the state variable to show/hide the password
  };
  const generateRandomPassword = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    const generatedPassword = `${randomNumber}`; // Concatenate the number with a string
    return generatedPassword;
  };

  useEffect(() => {
    set_password(generateRandomPassword()); // Generate a password when the component mounts
  }, []);

  const handleGeneratePassword = () => {
    set_password(generateRandomPassword()); // Regenerate the password when the button is clicked
  };

  const handleSubmit = async () => {
    if (!customer_name) {
      toast.error('Please fill First Name', {
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
      toast.error('Please fill Email', {
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

    if (!username) {
      toast.error('Please fill Username', {
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

    if (!password) {
      toast.error('Please fill Password', {
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

    if (!login_type) {
      toast.error('Please fill Login Type', {
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

    try {
      const postData = {
        firstname: customer_name,
        outlet_id: outlet_id,
        lastname: last_name,
        email: email,
        mobile: mobile,
        username: username,
        password: password,
        login_type: login_type,
      };

      const response = await axiosInstance.post('/createUser', postData);
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
          navigate('/userlist');
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
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      if (onError) {
        onError();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/userlist');
  };

  const [phone, setPhone] = useState('');
  const handlePhoneChange = (
    value: React.SetStateAction<string>,
    country: any,
  ) => {
    console.log('Phone changed. Value: ', value, ' Country: ', country);
    setPhone(value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add User" />
      <ToastContainer />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="relative">
              {/* Title with Expand/Collapse Icons */}
              {/* Collapsible Content start*/}
              <div
                className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                  isExpanded ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6.5">
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
                        placeholder=""
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
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:full mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className={`w-full  mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Mobile
                      </label>

                      <PhoneInput
                        country={'us'} // Default country
                        value={phone}
                        onChange={handlePhoneChange}
                        inputStyle={{
                          width: '100%',
                          paddingTop: '1.2rem',
                          paddingBottom: '1.2rem',
                        }}
                        inputClass="w-full px-3 py-3 rounded-sm font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-sm"
                        containerClass="relative"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-full xl:full mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => set_username(e.target.value)}
                        placeholder=""
                        className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                      />
                    </div>
                    <div className={`w-full  mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Password
                      </label>
                      <div className="flex items-center">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          onChange={(e) => set_password(e.target.value)}
                          placeholder=""
                          className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                        />
                        <button
                          onClick={handleToggleShowPassword}
                          className="ml-2 bg-primary hover:bg-primary text-white font-bold rounded py-2 px-4"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}{' '}
                          {/* Use eye icons to toggle visibility */}
                        </button>
                        <button
                          onClick={handleGeneratePassword}
                          className="ml-2 bg-primary hover:bg-primary text-white font-bold rounded py-2 px-4"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className={`w-1/2 xl:1/2 md:1/2 mb-1`}>
                      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                        Login Type
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected
                            ? 'text-black dark:text-white fotnlabel'
                            : ''
                        }`}
                        value={login_type} // Set the value of the select input to the selected option state
                        onChange={handleChange_login_type} // Call handleChange function when the select input value changes
                      >
                        <option value={0}>Select Login Type</option>
                        <option value={1}>pos</option>
                        <option value={2}>admin</option>
                        <option value={2}>stocktake</option>

                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="flex mt-5 flex-col gap-4 xl:flex-row">
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Add User
                    </button>
                  </div>
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
