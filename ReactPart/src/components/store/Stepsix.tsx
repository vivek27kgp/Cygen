import React, { useState } from 'react';
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

    const StepSix:  React.FC<AddProps> = ({ onSuccess, onError }) => {
    const store_insert_id = localStorage.getItem('store_insert_id');
    const outlet_id = localStorage.getItem('outlet_id');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const [pos_status,set_pos_status] = useState<any>('0'); 
    const [display_logo, set_display_logo] = useState<any>('0'); 
    const [display_company_name, set_display_company_name] = useState<any>('0'); 
    const [admin_pin, set_admin_pin] = useState<any>(null); 
    const [bill_text, set_bill_text] = useState<any>(null); 
    const [display_order_type, set_display_order_type] = useState<any>(null);
    const [loading, setLoading] = useState(false)
    
    
  
    const handleChange_display_order_type = (event: React.ChangeEvent<HTMLSelectElement>) => {
      set_display_order_type(event.target.value); // Update the selected option when it changes
      
    };
  
    const handleSubmit = async () => {
      setLoading(true);
   //   setError(null);
  
      try {
      
        const postData = {
          "sqaure": sqaure || 0,
          "outlet_id": outlet_id,
          "linkly": linkly || 0,
          "tyro": tyro || 0,
          "eft_pos": eft_pos || 0,
          "surcharge": surcharge || 0,
          "surcharge_amount": surcharge_amount || 0,
          "enable_roundoff": enable_roundoff || 0
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
         alert();
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
  
  
  
  
  
    const [sqaure,set_sqaure] = useState<any>('0'); 
    const [linkly,set_linkly] = useState<any>('0'); 
    const [tyro,set_tyro] = useState<any>('0'); 
    const [eft_pos,set_eft_pos] = useState<any>('0'); 
    const [surcharge,set_surcharge] = useState<any>('0'); 
    const [surcharge_amount,set_surcharge_amount] = useState<any>('0'); 
    const [enable_roundoff,set_enable_roundoff] = useState<any>('0'); 
  
    const [isToggled, setIsToggled] = useState(false);
  
    const handleToggle = () => {
      setIsToggled(!isToggled);
      let status =isToggled?0:1;
      set_sqaure(status);
      setIsToggled(!isToggled);
    };
    const [isToggled1, setIsToggled1] = useState(false);
  
    const handleToggle1 = () => {
      setIsToggled1(!isToggled1);
      let status =isToggled1?0:1;
      set_linkly(status);
     // alert(!isToggled1);
    };
  
    const [isToggled2, setIsToggled2] = useState(false);
  
    const handleToggle2 = () => {
      setIsToggled2(!isToggled2);
      let status =isToggled2?0:1;
      set_tyro(status);
     // alert(!isToggled1);
    };
  
 
  const [isToggled3, setIsToggled3] = useState(false);

  const handleToggle3 = () => {
    setIsToggled3(!isToggled3);
    let status =isToggled3?0:1;
    set_eft_pos(status);
   // alert(!isToggled1);
  };

  const [isToggled4, setIsToggled4] = useState(false);
  const handleToggle4 = () => {
    setIsToggled4(!isToggled4);
    let status =isToggled4?0:1;
    set_surcharge(status);
   // alert(!isToggled1);
  };
  const [isToggled5, setIsToggled5] = useState(false);

  const handleToggle5 = () => {
    setIsToggled5(!isToggled5);
    let status =isToggled5?0:1;
    set_enable_roundoff(status);
   // alert(!isToggled1);
  };
  return (
    <div>
  
	  
  <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark `}>
  <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Financial Setting</h1>
        <div className="p-6.5">
          {/* Category Information */}
          
          <div className="flex flex-col gap-4 xl:flex-row">


          <div className={`w-1/2 xl:full mb-1`}>

          
          <div className={`w-1/2 xl:3/4 mb-1`}>
              <label className="">
             Sqaure
              </label>
              <button
  className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
    isToggled2 ? 'oncls' : 'offcls'
  }`}
  onClick={handleToggle2}
>
 
  <span
    className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
      isToggled2? 'opacity-100' : 'opacity-0'
    }`}
  >
    ON
  </span>
  <span
    className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
      isToggled2 ? 'opacity-0' : 'opacity-100'
    }`}
  >
    OFF
  </span>
</button>
</div>
<div className={`w-1/2 xl:1/4 mb-1`}>
  &nbsp;<p className='smalltxt'>It will helps to ON/OFF Sqaure</p>
</div>
            </div>
         



            <div className={`w-1/2 xl:full mb-1`}>

          
          <div className={`w-1/2 xl:3/4 mb-1`}>
              <label className="">
              Linkly
              </label>
              <button
  className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
    isToggled1 ? 'oncls' : 'offcls'
  }`}
  onClick={handleToggle1}
>
 
  <span
    className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
      isToggled1 ? 'opacity-100' : 'opacity-0'
    }`}
  >
    ON
  </span>
  <span
    className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
      isToggled1 ? 'opacity-0' : 'opacity-100'
    }`}
  >
    OFF
  </span>
</button>
</div>
<div className={`w-1/2 xl:1/4 mb-1`}>
  &nbsp;<p className='smalltxt'>It will helps to ON/OFF Linkly</p>
</div>
            </div>
         





          </div>



          <div className="flex flex-col gap-4 xl:flex-row">


          <div className={`w-1/2 xl:full mb-1`}>

          
          <div className={`w-1/2 xl:3/4 mb-1`}>
              <label className="">
             Tyro
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
  &nbsp;<p className='smalltxt'>It will helps to ON/OFF Tyro</p>
</div>
            </div>
         



            <div className={`w-1/2 xl:full mb-1`}>

          
          <div className={`w-1/2 xl:3/4 mb-1`}>
              <label className="">
              Manual EFTP POS
              </label>
              <button
  className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
    isToggled3 ? 'oncls' : 'offcls'
  }`}
  onClick={handleToggle3}
>
 
  <span
    className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
      isToggled3 ? 'opacity-100' : 'opacity-0'
    }`}
  >
    ON
  </span>
  <span
    className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
      isToggled3 ? 'opacity-0' : 'opacity-100'
    }`}
  >
    OFF
  </span>
</button>
</div>
<div className={`w-1/2 xl:1/4 mb-1`}>
  &nbsp;<p className='smalltxt'>It will helps to ON/OFF Manual EFTP POS</p>
</div>
            </div>
         





          </div>


          <div className="flex flex-col gap-4 xl:flex-row">
           

          <div className={`w-1/2 xl:full mb-1`}>

          
<div className={`w-1/2 xl:3/4 mb-1`}>
    <label className="">
    Surcharge
    </label>
    <button
className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
isToggled4 ? 'oncls' : 'offcls'
}`}
onClick={handleToggle4}
>

<span
className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
isToggled4? 'opacity-100' : 'opacity-0'
}`}
>
ON
</span>
<span
className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
isToggled4 ? 'opacity-0' : 'opacity-100'
}`}
>
OFF
</span>
</button>
</div>
<div className={`w-1/2 xl:1/4 mb-1`}>
&nbsp;<p className='smalltxt'>It will helps to ON/OFF Surcharge</p>
</div>
  </div>
            <div className={`w-1/2  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Surcharge Amount
              </label>
              <input
                type="text"
                name="surcharge_amount"
                value={surcharge_amount}
                onChange={(e) => set_surcharge_amount(e.target.value)}
                placeholder="  Service Distance"
                className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
              />
            </div>
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>



          <div className="flex flex-col gap-4 xl:flex-row">
           

           <div className={`w-1/2 xl:full mb-1`}>
 
           
 <div className={`w-1/2 xl:3/4 mb-1`}>
     <label className="">
     Enable Round Off
     </label>
     <button
 className={`relative inline-flex items-left justify-left w-12 h-6 pr-2 mr-2 rounded-full focus:outline-none transition-colors ${
 isToggled5 ? 'oncls' : 'offcls'
 }`}
 onClick={handleToggle5}
 >
 
 <span
 className={`absolute inset-y-0 left-0 flex items-center justify-center ml-2 w-6 text-xs font-bold text-white ${
 isToggled5? 'opacity-100' : 'opacity-0'
 }`}
 >
 ON
 </span>
 <span
 className={`absolute inset-y-0 right-0 flex items-center justify-center w-6 text-xs mr-2 font-bold text-white ${
 isToggled5 ? 'opacity-0' : 'opacity-100'
 }`}
 >
 OFF
 </span>
 </button>
 </div>
 <div className={`w-1/2 xl:1/4 mb-1`}>
 &nbsp;<p className='smalltxt'>It will helps to ON/OFF Enable Round Off</p>
 </div>
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

export default StepSix;
