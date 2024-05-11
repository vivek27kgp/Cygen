import React, { useEffect, useState } from 'react';
import fetchData from '../fetchData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for react-datepicker
import axiosInstance from '../AxiosInstance';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'; // Import the styles

interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
  const StepTwo:  React.FC<AddProps> = ({ onSuccess, onError }) => {
  const store_insert_id = localStorage.getItem('store_insert_id');
  const outlet_id = localStorage.getItem('outlet_id');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timezone, set_timezone] = useState<any>(null); 
  const [currency, set_currency] = useState<any>(null); 
  const [timezone_data, set_timezone_data] = useState<any>(null); 
  const [currency_data, set_currency_data] = useState<any>(null); 
  const handleChange_timezone = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_timezone(event.target.value); // Update the selected option when it changes
    
  };

//handleChange_state
const handleChange_currency = (event: React.ChangeEvent<HTMLSelectElement>) => {
  set_currency(event.target.value); // Update the selected option when it changes
  
};


useEffect(() => {
  fetchData('/getAllTimezoneOptions/'+outlet_id, set_timezone_data, setError, setIsLoading);
  fetchData('/getAllCurrencyOptions/'+outlet_id, set_currency_data, setError, setIsLoading);
  }, []); 
  const [store_closing, setTime_closing] = useState(''); // Initialize with current date and time
  const [store_opening, setTime_open] = useState(''); // Initialize with current date and time
  const [selectedTime, setSelectedTime] = useState(new Date()); // Initialize with current date and time
  const [selectedTime2, setSelectedTime2] = useState(new Date()); // Initialize with current date and time
  // const [selectedTime1, setSelectedTime1] = useState(new Date()); // Initialize with current date and time
  // const selectedTimeHours1 = selectedTime1.getHours();
  // const selectedTimeMinutes1 = selectedTime1.getMinutes();
  // const Timeopen = selectedTimeHours1+':'+selectedTimeMinutes1;
  // setTime_open(Timeopen.toString());
  useEffect(() => {
    const selectedTimeHours = selectedTime.getHours();
    const selectedTimeMinutes = selectedTime.getMinutes();
    const Timeclose = selectedTimeHours+':'+selectedTimeMinutes;
    setTime_open(Timeclose.toString()); // Convert to string
  }, [selectedTime]); // Run whenever selectedTime changes
  useEffect(() => {
    // const d ='22:00';
    // const [hours, minutes] = d.split(':').map(Number);
    // // Create a new Date object with the current date and parsed time
    // const newDate = new Date(selectedTime);
    // newDate.setHours(hours, minutes, 0, 0);
    // setSelectedTime2(newDate);

    const selectedTimeHours = selectedTime2.getHours();
    const selectedTimeMinutes = selectedTime2.getMinutes();
    const Timeclose = selectedTimeHours+':'+selectedTimeMinutes;
    setTime_closing(Timeclose.toString()); // Convert to string
  }, [selectedTime2]); // Run whenever selectedTime changes
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true);
 //   setError(null);
    try {
      const postData = {
        "timezone": timezone || 0,
        "outlet_id": outlet_id,
        "currency": currency || 0,
        "store_opening": store_opening || 0,
        "store_closing": store_closing || 0
      };
      console.log(JSON.stringify(postData));
      if(store_insert_id!=''){
      const response = await fetch(`http://localhost:3000/api/updateStore/${store_insert_id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        });
        const responseData = await response.json();
        console.log(JSON.stringify(responseData));

      const responseCode = responseData.responseCode;
      const id =responseData.list.id;
      console.log(JSON.stringify(responseCode));
      console.log(JSON.stringify(responseData.list.id));
      if (responseCode=='0' && store_insert_id!='') {
        const message = responseData.message;
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar:false,
          closeButton: true,
          closeOnClick: true,
         
        });
        setTimeout(() => {
         // navigate('/storelist'); // Use navigate to redirect after successful login
        }, 2000);
       
      }else{
        const message = responseData.message;
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
    }else{

     const message = 'Store informations not added ,please complete all store informations ';
        toast.error(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,

    })

  }



    } catch (error) {
    //  setError((error as Error).message || 'An error occurred');
      //  setError('Invalid credentials ');
      if (onError) {
        onError();
      }
    } finally {
      setLoading(false);
    }
     

  };
  








  return (
    <div>
  
  <ToastContainer />
  <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark `}>
  <h1 className='border-b-2 border-primary w-1/3   p-2  text-title-sm'>Store Setting</h1>
        <div className="p-6.5 pt-2">
          {/* Category Information */}
          

          <div className="flex flex-col gap-4 xl:flex-row">

           
          <div className={`w-full xl:full mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Timezone {store_insert_id}
              </label>
              {isLoading && <div>Loading...</div>}
              <select  
              name="country"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={timezone} // Set the value of the select input to the selected option state
              onChange={handleChange_timezone} // Call handleChange function when the select input value changes
              >
                <option value="">Select Timezone</option>
              {timezone_data && timezone_data.list && timezone_data.list.map((country: any) => (
              <option key={country.id} value={country.id}>
              {country.timezone}
              </option>
              ))}
              {/* Add more options as needed */}
              </select>
            </div>
         
          
            <div className={`w-full   mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Currency 
              </label>
              {isLoading && <div>Loading...</div>}
              <select  
              name="country"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={currency} // Set the value of the select input to the selected option state
              onChange={handleChange_currency} // Call handleChange function when the select input value changes
              >
                <option value="">Select Currency</option>
              {currency_data && currency_data.list && currency_data.list.map((country: any) => (
              <option key={country.id} value={country.id}>
              {country.currency_name}
              </option>
              ))}
              {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Opening Time
              </label>
              <div className="relative">
              <DatePicker
      id="timePicker"
      selected={selectedTime}
      onChange={date => setSelectedTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="HH:mm"
      className="relative block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      popperPlacement="bottom"
    />
      </div>
            </div>
          

          
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Close Time
              </label>
              <DatePicker
      id="timePickerClose"
      selected={selectedTime2}
      onChange={date => setSelectedTime2(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="HH:mm"
      className="relative block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      popperPlacement="bottom"
    />
            </div>
           

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>



          {/* Product Information end */}

          <div className="flex mt-5 flex-col gap-4 xl:flex-row justify-end">  
          <button
              onClick={handleSubmit} disabled={loading} 
              className="inline-flex items-center justify-right bg-yellow-500 py-2 px-10 text-right font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
               Submit
            </button>      
                
          </div>
          {/* Add more product information fields here */}
          
        </div>
      </div>
	  
	  
	  
    </div>
  );
};

export default StepTwo;
