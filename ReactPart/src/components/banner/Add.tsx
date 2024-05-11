import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Categorypage from './Categoryform';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import Select from 'react-select';
import Textbox from '../formelement/Textbox';
import Tooltip from '../Chat/Tooltip';
import Textarea from '../formelement/Textarea';
import ImageUploader from '../formelement/ImageUploader';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MyDropzone from '../MyDropzone';

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

  const [title_banner, set_title_banner] = useState('');
  const [banner_type, set_banner_type] = useState('1'); // Initial color
  const handleChange_banner_type = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_banner_type(event.target.value); // Update the selected option when it changes
  };
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate(); // Move the hook call here
  const outlet_id = localStorage.getItem('outlet_id');
  const handleSubmit = async () => {


    if (!title_banner) {
      toast.error('Please fill Banner Name', {
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
    if (!banner_type) {
      toast.error('Please fill Banner Type', {
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
      const postData = 
      { 
        "title_banner": title_banner|| 0,
        "outlet_id": outlet_id,
        "banner_type":banner_type|| 0,
        "banner_image":firstImageUrl|| 0
      };

      const response = await axiosInstance.post('/addBanner', postData);
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
          navigate('/bannerlist'); // Use navigate to redirect after successful login
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



const [firstImageUrl, setFirstImageUrl] = useState<string>('');

  const handleFirstImageUrlChange = (imageUrl: string) => {
    setFirstImageUrl(imageUrl);
  };





  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Category" />
      <ToastContainer /> {/* Toast container must be rendered at the root level */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
      <div className="relative">
      {/* Title with Expand/Collapse Icons */}
      <div className="flex items-center justify-between border-b border-stroke  py-4  pl-0 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white fotnlabelhd">
          Banner Information 
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
          <div className="w-full ">
           
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Banner Name <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="title_banner"
                value={title_banner}
                onChange={(e: { target: { value: any; }; }) => set_title_banner(e.target.value)}
                placeholder="Banner Name"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
        
</div>
           

<div className="w-full ">

            <div className="w-full  mb-2 ">
      <label className="mb-1.5 block text-black dark:text-white fotnlabel">
      Banner Type
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
       <select  
       className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"   
          value={banner_type} // Set the value of the select input to the selected option state
        onChange={handleChange_banner_type} // Call handleChange function when the select input value changes
          >
  <option value={1}>Web</option>
  <option value={2}>POS</option>
  <option value={3}>POS BACK BANNER</option>
  <option value={4}>mPOS</option>
  <option value={5}>KIOSK</option>
  <option value={6}>APP</option>
  
  {/* Add more options as needed */}
</select>
</div>
            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>
          {/* Product Information end */}
          {/* Product Information */}
         
          <div className="w-full mb-1">
          <MyDropzone onFirstImageUrlChange={handleFirstImageUrlChange}></MyDropzone>
          </div>
          {/* Product Information end */}
         
          <div className="flex mt-5 flex-col gap-4 xl:flex-row">  
          <button
              className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Cancel
            </button>      
            <button
              onClick={handleSubmit} disabled={loading}
              className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Banner
            </button>      
          </div>
          {/* Add more product information fields here */}
          {error && <div className="text-center text-white">{error}</div>}
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
