
import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
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
      { headerName: 'Paid Amount', field: 'grand_total' },
      { headerName: 'Order Device', field: 'grand_total' },
      { headerName: 'Action', field: 'button' },
      
    ];
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

   
  
  const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string>(''); // State to manage error message
  const outlet_id = localStorage.getItem('outlet_id');
  
    useEffect(() => {
    fetchData('/getallsaleslist/'+outlet_id, setCategoryData, setError, setIsLoading);
    // Call the fetchData function when the component mounts
    console.log(categoryData);
    }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
      




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
                    <span className="text-sm">Add Sales</span>
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
      <span className="text-sm">Import Sales</span>
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
      <span className="text-sm">Sales Filter</span>
    </a>
  </div>
</div>



</div>

      </div>
    </div>


    {categoryData && categoryData.list && (
  <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
    <AgGridReact
      columnDefs={columnDefs}
      rowData={categoryData.list}
      pagination={true}
      paginationPageSize={10}
    />
  </div>
)}

    <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    
    </>
    
  );
};

export default Viewpage;
