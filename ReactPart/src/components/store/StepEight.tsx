import React, { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'; // Import the styles
import { useNavigate } from 'react-router-dom';

interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
  const StepEight:  React.FC<AddProps> = ({ onSuccess, onError }) => {
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


 
  const [fb_link,set_fb_link] = useState<any>(null); 
  const [x_link, set_x_link] = useState<any>(null); 
  const [insta_link, set_insta_link] = useState<any>(null); 
  const [youtube_link, set_youtube_link] = useState<any>(null); 
  const [linkedin_link, set_linkedin_link] = useState<any>(null); 
  const navigate = useNavigate(); // Move the hook call here
  
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {

    setLoading(true);
 //   setError(null);
    try {
      const postData = {
        "fb_link": fb_link || 0,
        "outlet_id": outlet_id,
        "x_link": x_link || 0,
        "insta_link": insta_link || 0,
        "youtube_link": youtube_link || 0,
        "linkedin_link": linkedin_link || 0
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
          navigate('/storelist'); // Use navigate to redirect after successful login
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
      <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Social Media Setting</h1>
        <div className="p-6.5 pt-2">
          {/* Category Information */}

         
          <div className="flex flex-col gap-4 xl:flex-row">

           
          <div className={`w-full xl:full mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Facebook Link
              </label>
              <input
                type="text"
                name="fb_link"
                value={fb_link}
                onChange={(e) => set_fb_link(e.target.value)}
                placeholder="Facebook Link"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
         
           
            <div className={`w-full   mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Instagram Link  
              </label>
              <input
                type="text"
                name="insta_link"
                value={insta_link}
                onChange={(e) => set_insta_link(e.target.value)}
                placeholder=" Instagram Link  "
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Youtube
              </label>
              <input
                type="text"
                name="youtube_link"
                value={youtube_link}
                onChange={(e) => set_youtube_link(e.target.value)}
                placeholder="Youtube"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          

        
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              LinkedIn
              </label>
              <input
                type="text"
                name="linkedin_link"
                value={linkedin_link}
                onChange={(e) => set_linkedin_link(e.target.value)}
                placeholder="LinkedIn"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
           

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>


          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             X Link
              </label>
              <input
                type="text"
                name="x_link"
                value={x_link}
                onChange={(e) => set_x_link(e.target.value)}
                placeholder="X Link"
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

export default StepEight;
