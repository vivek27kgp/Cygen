
import React, { useState } from 'react';
import productimg from '../../images/product/rice.jpg';
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import Popup from '../Charts/Popup';
const Productpagelowstock: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const columns = ['Product Name', 'Barcode', 'SKU', 'Category', 'Brand', 'Unit', 'Purchase Price', 'Sales Price', 'TAX', 'Status', 'Display Device'];

    const data = [
      { productName: 'Sonamasuri Rice', barcode: '07418529635', sku: '#147852963', category: 'Grocery', brand: 'Lotus', unit: 'Kg', purchasePrice: 120, salesPrice: 150, tax: 'GST', status: 'Active', displayDevice: 'Web' },
      // Add more data objects here as needed
    ];
  
    const handleEdit = (row) => {
      console.log('Edit', row);
      // Implement your edit logic here
    };
  
    const handleDelete = (row) => {
      console.log('Delete', row);
      // Implement your delete logic here
    };
  
    const actions = [
      { label: 'Edit', onClick: handleEdit },
      { label: 'Delete', onClick: handleDelete },
    ];
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

    const optionsProduct = [
        { value: 'apple', label: 'Rice' },
        { value: 'banana', label: 'Atta' },
        { value: 'orange', label: 'Dal' },
       
      ];
    const options = [
        { value: 'apple', label: 'Rice' },
        { value: 'banana', label: 'Grocery' },
        { value: 'orange', label: 'Atta' },
       
      ];
      const optionsBrand = [
        { value: 'apple', label: 'Lotus' },
        { value: 'banana', label: 'Ayers' },
        { value: 'orange', label: 'Mrchi' },
       
      ];
      const optionstAX = [
        { value: 'FREE', label: 'FREE' },
        { value: 'GST', label: 'GST' },
      ];
      const optionstSORTING = [
        { value: 'higher', label: 'Higher' },
        { value: 'lower', label: 'Lower' },
      ];
      const optionstStatus = [
        { value: 'higher', label: 'Active' },
        { value: 'lower', label: 'Inactive' },
      ];
  let status='Paid';
  return (
    <>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
        
      <div className="flex justify-end items-center flex-wrap">
  {/* Links for Excel and PDF */}
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center ">
                <a href="/react/template/product-list" className="mr-4 mb-2">
                    <img src={excelimg} alt="Excel" />
                </a>
                <a href="/react/template/product-list" className="mr-4 mb-2">
                    <img src={pdfimg} alt="PDF" />
                </a>
                {/* Button to add a new product */}
                <a href="/ui/buttons" className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 mb-2" onClick={togglePopup}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle mr-1 iconsize">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span className="text-sm">Add Product</span>
                </a>
            </div>

  {/* Button to import a product */}
  <div className="sm:flex">
    <a href="/ui/buttons" className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 sm-w-full mb-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle mr-1 iconsize">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span className="text-sm">Import Product</span>
    </a>
  </div>

  {/* Button to trigger product filter */}
  <div className="sm:flex">
    <a onClick={togglePopup} className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mb-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter filter-icon">
        <g>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </g>
      </svg>
      <span className="text-sm">Product Filter</span>
    </a>
  </div>
</div>



  <table className="w-full divide-y divide-orange-400">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
       Product Name
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Barcode
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
        Stock
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Category
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Brand
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Unit
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Purchase Price
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Sales Price
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        TAX
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Status
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Display Device
      </th>
      
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
    {[...Array(5)].map((_, index) => (
      <tr key={index} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="h-12.5 w-15 rounded-md"> <img src={productimg} className='w-12 h-12' /> </div><p className="text-sm text-black dark:text-white">Sonamasuri Rice</p></div>
        </td>
     
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          07418529635
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          -105
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
          Grocery
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          Lotus
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          Kg
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          120
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          150
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          GST
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      status === 'Paid'
                        ? 'bg-success text-success'
                        : status === 'Unpaid'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    Active
                  </p>
                </td>
         <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
          Web
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
  <svg
    className="fill-current"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-4c-.6 0-1.13-.24-1.51-.63l-3.54 3.54L6.63 15.5l3.54-3.54A2.986 2.986 0 0 1 12 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3v1.86l-4.5 4.5L5.63 19.5 10.5 14.7c-.39-.38-.88-.6-1.41-.6zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
  </svg>
</button>


                  </div>
                </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

      </div>
    </div>




    <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    
    </>
    
  );
};

export default Productpagelowstock;