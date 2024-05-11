
import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
interface SalesDetail {
  status: string;
  responseCode: string;
  message: string;
  list: {
      id: number;
      subtotal: number;
      payment_status: string;
      order_type: number;
      reference_id: string;
      sales_code: string;
      sales_date: string;
      grand_total: number;
      created_time: string;
      customer_id: number;
      tot_discount_to_all_amt: number;
      Customer: {
          id: number;
          email: string;
          mobile: string;
          customer_name: string;
      };
      SalesItem: {
          id: number;
          sales_id: number;
          sales_status: string;
          item_id: number;
          description: string;
          sales_qty: number;
          price_per_unit: number;
          tax_type: string;
          tax_id: number;
          tax_amt: number | null;
          unit_discount_per: number | null;
          discount_amt: number;
          unit_total_cost: number;
          total_cost: number;
          status: number;
          cat_id: number;
          subcat_id: number;
          brand_id: number;
          offer_flag: number;
          outlet_id: string;
          product_weight: string;
          offer_exist: number;
          offer_text: string;
          offer_discount: number;
          cal_total: number;
          item_added_sales_date: string;
      }[];
      SalesPayment: {
          id: number;
          sales_id: number;
          payment_date: string;
          payment_type: string;
          payment: number;
          payment_note: string;
          change_return: number;
          system_ip: string;
          system_name: string;
          created_time: string;
          created_date: string;
          created_by: any; // Update this to the actual type if available
          status: number;
          user_id: number;
          session_id: number;
          card_mobile: string;
          card_name: string;
          card_number: string;
          price_id: string;
          outlet_id: string;
          payment_other: number;
          card_type: string;
          transaction_id: string;
          payment_id: string;
      }[];
      GroceryDelAddr: null;
  };
}

const Viewpage: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const columnDefs = [
      { headerName: 'Order Id', field: 'id' },
      { headerName: 'Date', field: 'sales_date' },
      { headerName: 'Customer Name', field: 'Customer.customer_name' },
      { headerName: 'Total amount', field: 'grand_total' },
      { headerName: 'Payment Status', field: 'payment_status' },
      { headerName: 'Discount', field: 'tot_discount_to_all_amt' },
      { headerName: 'Paid Amount', field: 'paid_amount' },
      { headerName: 'Order Device', field: 'order_device' },
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
      const optionsUnit = [
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

  
  const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string>(''); // State to manage error message
  const outlet_id = localStorage.getItem('outlet_id');
  let storedStoreId:any = localStorage.getItem('selectedStore');
  if(storedStoreId=='' || storedStoreId=='10'){
    storedStoreId=0;
  }
    useEffect(() => {
    fetchData('/getallsaleslist/'+outlet_id+'/'+storedStoreId, setCategoryData, setError, setIsLoading);
    // Call the fetchData function when the component mounts
    console.log(categoryData);
    }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
      

   

  // code for item_detail

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [item_detail, set_item_detail] = useState();
  const [item_detail_loading, setIsLoading_item] = useState(true);
  const toggledetailModal = (id:any) => {
  const outlet_id = localStorage.getItem('outlet_id');
    fetchData(
      '/getPrintBill/'+id,
      (response) => {
        set_item_detail(response.list); // Set storedata to just the list array
      },
      setError,
      setIsLoading,
    );
      console.log("---------------------------------->####"+JSON.stringify(item_detail));
      setIsOpenDetail(!isOpenDetail);

  };

  const toggledetailModalclose = () => {
   
      setIsOpenDetail(!isOpenDetail);

  };




  return (
    <>
    
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
        
      <div className="flex justify-end items-center flex-wrap">
  {/* Links for Excel and PDF */}
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center ">
                {/* <a href="/react/template/product-list" className="mr-4 mb-2">
                    <img src={excelimg} alt="Excel" />
                </a>
                <a href="/react/template/product-list" className="mr-4 mb-2">
                    <img src={pdfimg} alt="PDF" />
                </a> */}
                {/* Button to add a new product */}
                {/* <a href="/ui/buttons" className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 mb-2" onClick={togglePopup}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle mr-1 iconsize">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span className="text-sm">Add Sales</span>
                </a> */}
            </div>

  {/* Button to import a product */}
  <div className="sm:flex">
    {/* <a href="/ui/buttons" className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 sm-w-full mb-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle mr-1 iconsize">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span className="text-sm">Import Sales</span>
    </a> */}
  </div>

  {/* Button to trigger product filter */}
  <div className="sm:flex">
    {/* <a onClick={togglePopup} className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mb-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter filter-icon">
        <g>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </g>
      </svg>
      <span className="text-sm">Sales Filter</span>
    </a> */}
  </div>
</div>



  <table className="w-full divide-y divide-orange-400">
  <thead className="bg-gray-50 ">
    <tr>
    <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Store
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Order Id 
      </th>
      
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Date 
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Customer Name 
      </th>
    
      {/* <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Mobile 
      </th> */}
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Total amount 
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Payment Status 
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Discount 
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Paid Amount
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Order Device
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
        {/* Render loading spinner while data is being fetched */}
        {isLoading && <div>Loading...</div>}
    {/* Render error message if there was an error */}
    {error && <div>Error: {error}</div>}
    {/* Render the category data if it exists */}
    {categoryData && categoryData.list && categoryData.list.map((category: any) => (

      <tr key={category.id} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.Store.store_name}&nbsp;({category.Store.id})</p></div>
       </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.id}</p></div>
        </td>
     
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.sales_date}&nbsp; {category.created_time}</p></div>
       </td>
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.Customer.customer_name}&nbsp; {category.Customer.mobile}</p></div>
       </td>
       
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.grand_total}</p></div>
       </td>
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.payment_status}</p></div>
       </td>
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.tot_discount_to_all_amt}</p></div>
       </td>
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">{category.paid_amount}</p></div>
       </td>
       <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center"><p className="text-sm text-black dark:text-white">POS</p></div>
       </td>

       
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
                  <div className="flex items-center space-x-3.5 text-center">
                    <button className="hover:text-primary"  onClick={() => toggledetailModal(category.id)}>
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
                    


                  </div>
                </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

      </div>
    </div>




    <>
      
      {isOpenDetail && (
        <div className="fixed   flex justify-center items-end  newzindex overflow-y-auto top-5 w-[70%]">
        <div className="relative w-full">
            {/* Modal content */}
            <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Modal Header */}
              <div className="flex items-start justify-between  border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-semibold"> Invoice Detail</h3>
                <button onClick={toggledetailModalclose} className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Modal Body */}
              <div className="relative p-6 flex-auto overflow-x-auto overflow-y-auto h-94 scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>


{item_detail && (
  <div className="container-fluid">
    <div className="">
      
      <div className="flex flex-wrap items-center justify-between gap-6 py-4">
        <h5 className="text-base font-normal"><span className="font-bold">Date:</span> {item_detail.sales_date}</h5>
        <h5 className="text-base font-normal"><span className="font-bold">Invoice No:</span> {item_detail.id}</h5>
      </div>
      <hr />
      <div className="flex flex-wrap items-center justify-between gap-6 mt-1">
        <div>
          <h4 className="text-base font-bold">Customer Detail:</h4>
          <p className="font-sm font-normal">
            {item_detail.Customer.customer_name},<br />
            {item_detail.Customer.email},<br />
            {item_detail.Customer.mobile}
          </p>
        </div>
        <div className="text-end">
          {/* <h4 className="text-base font-bold">Pay To:</h4>
          <p className="font-sm font-normal">
           
          </p> */}
        </div>
      </div>
      <div className="overflow-x-auto">

        <table className="border-collapse table-auto w-full text-sm mt-2 mb-2 whitespace-pre">
          <thead>
            <tr className="bg-primary text-white text-center">
              
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Item Description</th>
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Price</th>
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Qty</th>
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {item_detail && item_detail.SalesItem && item_detail.SalesItem.map((item) => (
  <tr key={item.id} className="text-center">
    <td className="p-2 text-base font-medium border-s-2 border-white">{item.description}</td>
    <td className="p-2 text-base font-medium border-s-2 border-white">{item.price_per_unit}</td>
    <td className="p-2 text-base font-medium border-s-2 border-white">{item.sales_qty}</td>
    <td className="p-2 text-base font-medium border-s-2 border-white">{item.total_cost}</td>
  </tr>
))}

            
            <tr>
              <td colSpan={4} className="p-4 pb-0 border border-white text-base font-normal text-end"><span className="pe-12 font-bold">Sub Total:</span>{item_detail.subtotal}</td>
            </tr>
            <tr>
              <td colSpan={4} className="pe-5 border border-white text-base font-normal text-end"><span className="pe-12 font-bold">Tax:</span>{'0.00'}</td>
            </tr>
            <tr>
              <td colSpan={4} className="pe-5 border border-white text-base font-normal text-end"><span className="pe-12 font-bold">Total:</span>{item_detail.grand_total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between gap-6 mt-28">
        <div>
          <span className="w-full text-lg font-bold">Payment Info:</span>
          
        <table className="border-collapse table-auto w-full text-sm mt-2 mb-2 whitespace-pre">
          <thead>
            <tr className="bg-primary text-white text-center">
              
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Pyment Mode</th>
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Amount</th>
              <th className="p-2 uppercase text-base font-semibold border-s-2 border-white">Change Return</th>
             
            </tr>
          </thead>
          <tbody className="bg-white">
          {item_detail && item_detail.SalesPayment && item_detail.SalesPayment.map((payment) => (
  <tr key={payment.id} className="text-center">
    <td className="p-2 text-base font-medium border-s-2 border-white">{payment.payment_type}</td>
    <td className="p-2 text-base font-medium border-s-2 border-white">{payment.payment}</td>
    <td className="p-2 text-base font-medium border-s-2 border-white">{payment.change_return}</td>
 
  </tr>
))}

            
           
          </tbody>
        </table>
        </div>
        <div>
         
          
        </div>
      </div>
    </div>
  </div>

)}

              </div>
              {/* Modal Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button onClick={toggledetailModalclose} className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${isOpenDetail ? 'opacity-25 fixed inset-0 z-40 bg-black' : ''}`} onClick={toggledetailModal}></div>
    </>





    <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    
    </>
    
  );
};

export default Viewpage;
