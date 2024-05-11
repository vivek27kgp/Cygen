import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import fetchData from '../components/fetchData';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Settings = () => {


  const [categoryData, setCategoryData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const outlet_id = localStorage.getItem('outlet_id');
  // State variables for company details
  const [companyDetails, setCompanyDetails] = useState({
    comapny_name: '',
    mobile: '',
    email: '',
    city: '',
    address: '',
    postcode: '',
    vat_no: '',
    bsb: '',
    company_logo:'',
    outlet_id:outlet_id
  });
 
  // Fetch company record when component mounts
  useEffect(() => {
    fetchData('/getCompanyRecord/' + outlet_id, setCategoryData, setError, setIsLoading);
  }, [outlet_id]);

  // Update company details state when categoryData changes
  useEffect(() => {
    if (categoryData && categoryData.list && categoryData.list.length > 0) {
      // Assuming only one company record is fetched
      const companyRecord = categoryData.list[0];
      setCompanyDetails({
        comapny_name: companyRecord.company_name,
        mobile: companyRecord.mobile,
        email: companyRecord.email,
        city: companyRecord.city,
        address: companyRecord.address,
        postcode: companyRecord.postcode,
        vat_no: companyRecord.vat_no,
        bsb: companyRecord.bsb,
        company_logo:companyRecord.company_logo,
        outlet_id:outlet_id

      });
    }
  }, [categoryData]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const { company_logo, ...updatedCompanyDetails } = companyDetails;
    // Handle form submission here
   //  console.log(updatedCompanyDetails); // This will log companyDetails without the 'company_logo' field
    // Call setCompanyDetails with updatedCompanyDetails

    // alert(`http://localhost:3000/api/getAllupdateStatus/${categoryId}`);
    
    const response = await fetch(`http://localhost:3000/api/updateCompany/${outlet_id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCompanyDetails),
    });
    const responseData = await response.json();

    const responseCode = responseData.responseCode;

    console.log(JSON.stringify(responseCode));

    if (responseCode== 0 ) {
      const message = 'Company Profile Updated';
      toast.success(message, {
        autoClose: 3000,
        draggable: true,
        position: 'top-right',
        hideProgressBar:false,
        closeButton: true,
        closeOnClick: true,
       
      });
      setTimeout(() => {
        
      }, 2000);
     
    }else{
      const message = 'Company Profile Not Updated';
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





  };



  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        
        <ToastContainer /> {/* Toast container must be rendered at the root level */}
    <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                 Company Detail 
                 
{/* Render the category data if it exists */}



  
                </h3>
              </div>
              <div className="p-7">

                
                  <div className="mb-5.5 flex ">
                    <div className="w-full sm:w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                      Company Name
                      </label>
                      <div className="relative">
                       
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="comapny_name"
                        
                         
                          placeholder="name"
                          onChange={(e) => setCompanyDetails({ ...companyDetails, comapny_name: e.target.value })}
                          
                          value={companyDetails.comapny_name}
                        />
                      </div>
                    </div>

                  
                  </div>
                  <div className="mb-5.5 flex ">
                    

                    <div className="w-full sm:full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="mobile"
                        
                        onChange={(e) => setCompanyDetails({ ...companyDetails, mobile: e.target.value })}
                        value={companyDetails.mobile}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                     
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-1 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                       
                        onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })}
                        value={companyDetails.email}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      City
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="city"
                      
                      onChange={(e) => setCompanyDetails({ ...companyDetails, city: e.target.value })}
                      value={companyDetails.city}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="address"
                     
                      onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                      value={companyDetails.address}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Postcode
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="postcode"
                      onChange={(e) => setCompanyDetails({ ...companyDetails, postcode: e.target.value })}
                      id="Username"
                      value={companyDetails.postcode}
                    />
                  </div>
                  
                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      ABN
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="vat_no"
                      onChange={(e) => setCompanyDetails({ ...companyDetails, vat_no: e.target.value })}
                      id="Username"
                      value={companyDetails.vat_no}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BSB
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="bsb"
                      onChange={(e) => setCompanyDetails({ ...companyDetails, bsb: e.target.value })}
                      id="Username"
                      value={companyDetails.bsb}
                    />
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
               
               
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Company Logo
                </h3>
              </div>
              <div className="p-7">
                
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-64 w-64 rounded-full">
                      <img src={`https://cygen.com.au/cygenwebretail/uploads/company/`+companyDetails.company_logo} alt="User" />
                    </div>
                    <div>
                     
                    </div>
                  </div>

                 
                 
               
              </div>
            </div>
          </div>
        </div>
        </form>
     
      </div>
    </DefaultLayout>
  );
};

export default Settings;
