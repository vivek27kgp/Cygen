import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the styles
interface StepOneProps {
  onNext: () => void;
}
interface AddProps {
  onSuccess?: () => void; // Define onSuccess as an optional function that takes no arguments and returns void
  onError?: () => void; // Define onError as an optional function that takes no arguments and returns void
}
import AddressAutocomplete from './AddressAutocomplete';
import axiosInstance from '../AxiosInstance';
import fetchData from '../fetchData';
const StepOne: React.FC<AddProps> = ({ onSuccess, onError }) => {
  const [name, setName] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [store_name,set_store_name] = useState('');
  const [mobile,set_mobile] = useState('');
  const [email,set_email] = useState('');
  const [address1,set_address1] = useState('');
  const [abn,set_abn] = useState('');
  const [country,set_country] = useState('');
  const [state,set_state] = useState('');
  const [city,set_city] = useState('');
  const [phone,set_phone] = useState('')
  const [website,set_website] = useState('')
  const [address, setAddress] = useState('');
  const [zipcode, set_zipcode] = useState('');
  const [lat, set_lat] = useState('');
  const [long, set_long] = useState('');
  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      console.log("Results:", results);
      const { lat, lng } = await getLatLng(results[0]);
         set_lat(lat.toString());
         set_lat(lng.toString());
         console.log("Address components:", results[0].address_components);
         console.log("Results:", results[0]);
      for (const component of results[0].address_components) {
        if (component.types.includes('postal_code')) {
          console.log("====================================>"+component.long_name);
          set_zipcode(component.long_name);
          break;
        }
      }

     








    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const outlet_id = localStorage.getItem('outlet_id');
  const handleSubmit = async () => {
    setLoading(true);
 //   setError(null);

    try {
    
      const postData = {
        "store_name": store_name || 0,
        "outlet_id": outlet_id,
        "email": email || 0,
        "mobile": mobile || 0,
        "address": addressValue || 0,
        "phone": phone || 0,
        "abn": abn || 0,
        "country": country || 0,
        "state": state || 0,
        "city": city || 0,
        "website": website || 0,
        "zipcode": zipcode || 0,
        "store_lat":lat || 0,
        "store_long":long || 0,
      };
      
     
      const response = await axiosInstance.post('/addstore', postData);
     
      const responseCode = response.data.responseCode;
      const id =response.data.list.id;
      console.log(JSON.stringify(response.data.list));
      console.log(JSON.stringify(response.data.list.id));
      if (responseCode== 0 && id!='') {
        localStorage.setItem('store_insert_id', id);
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
         // navigate('/storelist'); // Use navigate to redirect after successful login
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
      //  setError('Invalid credentials ');
      if (onError) {
        onError();
      }
    } finally {
      setLoading(false);
    }
     

  };
  

  const [addressValue, setAddressValue] = useState('');

  const handleAddressChange = (address) => {
    setAddressValue(address);
  };
  
  const [error, setError] = useState<string | null>(null);
  const [country_data, set_country_data] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const [state_data, set_state_data] = useState<any>(null); 


  const handleChange_country = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_country(event.target.value); // Update the selected option when it changes
    const state_id = event.target.value ;
    fetchData('/getAllStateOptions/'+outlet_id+'/'+state_id, set_state_data, setError, setIsLoading);
  };

//handleChange_state
const handleChange_state = (event: React.ChangeEvent<HTMLSelectElement>) => {
  set_state(event.target.value); // Update the selected option when it changes
  
};


useEffect(() => {
  fetchData('/getAllCountryOptions/'+outlet_id, set_country_data, setError, setIsLoading);
  }, []); 

  const handlePhoneChange = (value: React.SetStateAction<string>, country: any) => {
    console.log('Phone changed. Value: ', value, ' Country: ', country);
    set_mobile(value);
  };


  return (
    <div>
       <ToastContainer /> {/* Toast container must be rendered at the root level */}
      <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark `}>
      <h1 className='border-b-2 border-primary w-1/3 p-2    text-title-sm'>Store Information</h1>
        <div className="p-6.5 pt-2">
          {/* Category Information */}

         
          <div className="flex flex-col gap-4 xl:flex-row">

           
          <div className={`w-full xl:full mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                Name
              </label>
              <input
                type="text"
                name="store_name"
                value={store_name}
                onChange={(e) => set_store_name(e.target.value)}
                placeholder="Name"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
         
           
            <div className={`w-full   mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Email 
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => set_email(e.target.value)}
                placeholder="Email"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Mobile
              </label>
              
               <PhoneInput
                country={'us'} // Default country
                value={mobile}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: '100%',
                  paddingTop: '1.2rem',
                  paddingBottom: '1.2rem',
                 
                }}
                inputClass='w-full px-3 py-3 rounded-sm font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-sm'
                containerClass='relative'
              />
            </div>
          

        
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => set_phone(e.target.value)}
                placeholder="Contact Person Number"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
           

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>


          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             ABN
              </label>
              <input
                type="text"
                name="abn"
                value={abn}
                onChange={(e) => set_abn(e.target.value)}
                placeholder="Address"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             Website
              </label>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => set_website(e.target.value)}
                placeholder="Website"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>
         

          <div className="flex flex-col gap-4 xl:flex-row">
              <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
              Country
              </label>
              {isLoading && <div>Loading...</div>}
              <select  
              name="country"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={country} // Set the value of the select input to the selected option state
              onChange={handleChange_country} // Call handleChange function when the select input value changes
              >
                <option value="">Select country</option>
              {country_data && country_data.list && country_data.list.map((country: any) => (
              <option key={country.id} value={country.id}>
              {country.country}
              </option>
              ))}
              {/* Add more options as needed */}
              </select>
            </div>
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             State
              </label>
              {isLoading && <div>Loading...</div>}
              <select  
              name="sate"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={state} // Set the value of the select input to the selected option state
              onChange={handleChange_state} // Call handleChange function when the select input value changes
              >
                <option value="">Select State</option>
              {state_data && state_data.list && state_data.list.map((state: any) => (
              <option key={state.id} value={state.id}>
              {state.state}
              </option>
              ))}
              {/* Add more options as needed */}
              </select>
            </div>
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             City
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => set_city(e.target.value)}
                placeholder="City"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className={`w-full  mb-1`}>
              <label className="mb-1.5 block text-black dark:text-white fotnlabel">
             Zipcode
              </label>
              <input
                type="text"
                name="zipcode"
                value={zipcode}
                onChange={(e) => set_zipcode(e.target.value)}
                placeholder="Zipcode"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>
         


 <div className="flex flex-col gap-4 xl:flex-row">
            <div className={`w-full  mb-1`}>
             
              <AddressAutocomplete   onAddressChange={handleAddressChange} ></AddressAutocomplete>
            </div>
            
            

            {/* <SelectGroupOne  categoryType="Offer Exclude"/> */}
          </div>
         










          {/* Product Information end */}

          <div className="flex mt-5 flex-col gap-4 xl:flex-row text-right justify-end">  
          <button onClick={handleSubmit} disabled={loading}  className="bg-blue-500 text-white px-4 py-2 rounded text-right">
        Submit
      </button>      
          </div>
          
          
        </div>
      </div>
	  
    </div>
  );
};

export default StepOne;
