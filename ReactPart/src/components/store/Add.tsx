import React, { useEffect, useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { SlSettings } from "react-icons/sl";
import axiosInstance from '../AxiosInstance';
import { CgWebsite } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineSettingsSystemDaydream } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
import StepFive from './StepFive';
import StepSix from './Stepsix';
import StepEight from './StepEight';
import StepSeven from './StepSeven';
const steps = [
  { name: 'Step 1', component: <StepOne /> },
  { name: 'Step 2', component: <StepTwo /> },
  { name: 'Step 3', component: <StepThree /> },
  { name: 'Step 4', component: <StepFour /> }, // Final step with the "Submit" button
];

const Add: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const outlet_id = localStorage.getItem('outlet_id');

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = () => {
    // Handle final form submission
    console.log('Form submitted');
  };


// for dashboard expired count kuna

const [activeTabExp, setactiveTabExp] = useState('1');
useEffect(() => {
  const fetchDataForTabExp = async () => {
    try {
      
      let ourlet_val = localStorage.getItem('outlet_id');
  
      switch (activeTabExp) {
        case '1':
         
        break;
        case '2':
         
          break;
        case '3':
        
          break;
        
          case '4':
         
            break;

            case '5':
             
              break;
              case '6':
             
              break;
              case '7':
             
              break;
              case '8':
             
              break;
        default:
          
      }
     
    } catch (error) {
      // Handle errors
     
    } finally {
     
    }
  };
   
  fetchDataForTabExp();
}, [activeTabExp]); // Fetch data whenever activeTab changes












  return (
    <DefaultLayout>
      <ToastContainer />
      <div className='multi-form-div bg-white'>
      <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Add Store Detail</h1>
    <aside id="sidebar-multi-level-sidebar" className="fixed  z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div className="h-full px-3 py-4 overflow-y-auto bg-white">
    <ul className="space-y-2 font-medium">
    
    <li className='storeid'>   
        <a onClick={() => setactiveTabExp('1')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '1' ? 'active' : ''
        }`}>
        <IoInformationCircleOutline></IoInformationCircleOutline>
          <span className="ms-3">Store Information</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('2')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '2' ? 'active' : ''
        }`}>
        <IoSettingsOutline></IoSettingsOutline>
          <span className="ms-3">General Setting</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('3')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '3' ? 'active' : ''
        }`}>
       <CgWebsite></CgWebsite>
          <span className="ms-3">Website Setting</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('5')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '5' ? 'active' : ''
        }`}>
          <MdOutlinePointOfSale></MdOutlinePointOfSale>
          <span className="ms-3">POS Setting</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('4')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '4' ? 'active' : ''
        }`}>
          <FaAppStore></FaAppStore>
          <span className="ms-3">App Setting</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('6')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '6' ? 'active' : ''
        }`}>
          <CiMoneyCheck1></CiMoneyCheck1>
          <span className="ms-3">Financial Settings</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('7')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '7' ? 'active' : ''
        }`}>
          <MdOutlineSettingsSystemDaydream></MdOutlineSettingsSystemDaydream>
          <span className="ms-3">Point System Settings</span>
        </a>
      </li>
      <li className='storeid'>
        <a onClick={() => setactiveTabExp('8')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          activeTabExp == '8' ? 'active' : ''
        }`}>
          <MdOutlineSettingsSystemDaydream></MdOutlineSettingsSystemDaydream>
          <span className="ms-3">Social Media Settings</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
<div className="p-4 sm:ml-64">

{activeTabExp === '1' && (
      <div>
        <StepOne/>
      </div>
    )}
    
    {activeTabExp === '2' && (
      <div>
        <StepTwo/>
      </div>
    )}
      {activeTabExp === '3' && (
      <div>
        <StepThree/>
      </div>
    )}
      {activeTabExp === '4' && (
      <div>
        <StepFour/>
      </div>
    )}
      {activeTabExp === '5' && (
      <div>
        <StepFive/>
      </div>
    )}
      {activeTabExp === '6' && (
      <div>
        <StepSix/>
      </div>
    )}
     
    {activeTabExp === '7' && (
      <div>
        <StepSeven/>
      </div>
    )}
    {activeTabExp === '8' && (
      <div>
        <StepEight/>
      </div>
    )}
</div>
      </div>
    </DefaultLayout>
  );
};

export default Add;
