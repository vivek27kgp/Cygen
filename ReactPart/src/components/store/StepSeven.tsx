import React, { useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'; // Import the styles

interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
  const StepSeven:  React.FC<AddProps> = ({ onSuccess, onError }) => {
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


 
  const [loyalty_amount,set_loyalty_amount] = useState<any>(null); 
  const [loyalty_point, set_loyalty_point] = useState<any>(null); 
  const [loyalty_point_cnv, set_loyalty_point_cnv] = useState<any>(null); 
  const [loyalty_amount_cnv, set_loyalty_amount_cnv] = useState<any>(null); 
  const [min_bill_loyalty, set_min_bill_loyalty] = useState<any>(null); 

  
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true);
 //   setError(null);
    try {
      const postData = {
        "loyalty_amount": loyalty_amount || 0,
        "outlet_id": outlet_id,
        "loyalty_point": loyalty_point || 0,
        "loyalty_point_cnv": loyalty_point_cnv || 0,
        "loyalty_amount_cnv": loyalty_amount_cnv || 0
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
      <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Point System Setting</h1>
        <div className="p-6.5 pt-2">
          {/* Category Information */}

         
          <div className="flex flex-col gap-4 xl:flex-row">

           
          <div className={`w-full xl:full mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Amount
              </label>
              <input
                type="text"
                name="loyalty_amount"
                value={loyalty_amount}
                onChange={(e) => set_loyalty_amount(e.target.value)}
                placeholder="Name"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
         
           
            <div className={`w-full   mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Point 
              </label>
              <input
                type="text"
                name="email"
                value={loyalty_point}
                onChange={(e) => set_loyalty_point(e.target.value)}
                placeholder="Email"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Point (Converted to Amount )
              </label>
              <input
                type="text"
                name="loyalty_point_cnv"
                value={loyalty_point_cnv}
                onChange={(e) => set_loyalty_point_cnv(e.target.value)}
                placeholder="Mobile"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          

        
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              loyalty Amount (Converted to Amount )
              </label>
              <input
                type="text"
                name="loyalty_amount_cnv"
                value={loyalty_amount_cnv}
                onChange={(e) => set_loyalty_amount_cnv(e.target.value)}
                placeholder="Contact Person Number"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
           

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>


          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Minimum Billing
              </label>
              <input
                type="text"
                name="min_bill_loyalty"
                value={min_bill_loyalty}
                onChange={(e) => set_min_bill_loyalty(e.target.value)}
                placeholder="Address"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>

          {/* Product Information end */}

          <div className="flex mt-5 flex-col gap-4 xl:flex-row text-right justify-end">  
          <button  onClick={handleSubmit} disabled={loading}   className="bg-blue-500 text-white px-4 py-2 rounded text-right">
             Submit 
          </button>      
          </div>
          
          
        </div>
      </div>
	  
    </div>
  );
};

export default StepSeven;
