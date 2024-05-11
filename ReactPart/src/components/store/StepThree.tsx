import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
interface StepThreeProps {
    onSubmit: () => void;
    onPrev: () => void;
  }
  
interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
  const StepThree:  React.FC<AddProps> = ({ onSuccess, onError }) => {
  const store_insert_id = localStorage.getItem('store_insert_id');
  const outlet_id = localStorage.getItem('outlet_id');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [store_status, set_store_status] = useState<any>('0'); 
  const [shipping_charges, set_shipping_charges] = useState<any>(null); 
  const [store_pickup_text, set_store_pickup_text] = useState<any>(null); 
  const [minimum_order_value, set_minimum_order_value] = useState<any>(null); 
  const [service_distance, set_service_distance] = useState<any>(null); 
  const [loading, setLoading] = useState(false)
  
  
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    let status =isToggled?0:1;
    set_store_status(status);
    setIsToggled(!isToggled);
  };
  const [web_order_type, set_web_order_type] = useState<any>(null); 
  const handleChange_web_order_type = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_web_order_type(event.target.value); // Update the selected option when it changes
    
  };

  const handleSubmit = async () => {
    setLoading(true);
 //   setError(null);

    try {
    
      const postData = {
        "store_status": store_status || 0,
        "outlet_id": outlet_id,
        "shipping_charges": shipping_charges || 0,
        "store_pickup_text": store_pickup_text || 0,
        "minimum_order_value": minimum_order_value || 0,
        "service_distance": service_distance || 0,
        "web_order_type":web_order_type||0
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
  <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Website Setting</h1>
        <div className="p-6.5">
          {/* Category Information */}
          
          <div className="flex flex-col gap-4 xl:flex-row">


          <div className={`w-1/2 xl:full mb-1`}>

          
          <div className={`w-1/2 xl:3/4 mb-1`}>
              <label className="">
               Store Status
              </label>
              <button
  className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
    isToggled ? 'oncls' : 'offcls'
  }`}
  onClick={handleToggle}
>
 
  <span
    className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
      isToggled ? 'opacity-100' : 'opacity-0'
    }`}
  >
    ON
  </span>
  <span
    className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
      isToggled ? 'opacity-0' : 'opacity-100'
    }`}
  >
    OFF
  </span>
</button>
</div>
<div className={`w-1/2 xl:1/4 mb-1`}>
  &nbsp;<p className='smalltxt'>It will helps to ON/OFF the store</p>
</div>
            </div>
         



            <div className={`w-1/2   mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Order Type
              </label>
              <select
        id="orderType"
        name={web_order_type}
        value={web_order_type} // Set the value of the select input to the selected option state
        onChange={handleChange_web_order_type} // Call handleChange function when the select input value changes
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">Select...</option>
        <option value="1">Pickup</option>
        <option value="2">Delivery</option>
        <option value="3">Both Pickup & Delivery</option>
      </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Store Pickup Text
              </label>
              <input
                type="text"
                name="store_pickup_text"
                value={store_pickup_text}
                onChange={(e) => set_store_pickup_text(e.target.value)}
                placeholder="Store Pickup Text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          

          
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Shipping Charges
              </label>
              <input
                type="text"
                name="shipping_charges"
                value={shipping_charges}
                onChange={(e) => set_shipping_charges(e.target.value)}
                placeholder="Shipping Charges"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>
            </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Minimum Order Values
              </label>
              <input
                type="text"
                name="minimum_order_value"
                value={minimum_order_value}
                onChange={(e) => set_minimum_order_value(e.target.value)}
                placeholder="Minimum Order Values"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>
            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
       
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Service Distance 
              </label>
              <input
                type="text"
                name="service_distance"
                value={service_distance}
                onChange={(e) => set_service_distance(e.target.value)}
                placeholder="  Service Distance"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
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

export default StepThree;
