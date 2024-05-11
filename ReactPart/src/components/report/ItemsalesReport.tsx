import React, { useEffect, useRef, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CsvExportParams } from 'ag-grid-community';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import Loader from '../Loader';
const ItemsalesReport: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'id':true,
    'item_name': true,
    'category_name': true,
    'total_amount':true,
    'total_sales_qty': true,
    'stock': true,
    
  });
  const [showColumnToggles, setShowColumnToggles] = useState(false); // State to control visibility of column toggles
 function showCheckbox(showColumnToggles: boolean){
  setShowColumnToggles(!showColumnToggles);
 }
  const columnDefs = [
    { headerName: 'Product Name',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'item_name', filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['item_name'] },
    
    
    { headerName: 'Category',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'category_name',filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['category_name'] },
    
    { headerName: 'Qty',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'total_sales_qty',filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['total_sales_qty'] },
    { headerName: 'Stock',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'stock',
    filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['stock'] },
    { headerName: 'Total Sales',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'total_amount',
    filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['total_amount'] },

  ];

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  let storedStoreId:any = localStorage.getItem('selectedStore');
  if(storedStoreId=='' || storedStoreId=='10'){
    storedStoreId=0;
  }
  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const outlet_id = localStorage.getItem('outlet_id');
  // Create a new Date object to represent the current date and time
const currentDate = new Date();

// Get the time zone offset for Sydney (in minutes)
const sydneyOffset = 10 * 60; // UTC+10 in minutes
// Adjust the end date by adding the Sydney time zone offset
const adjustedEndDate = new Date(currentDate.getTime() + (sydneyOffset * 60000));
// Convert the adjusted end date to ISO string format
const today = adjustedEndDate.toISOString().split('T')[0];

  useEffect(() => {

    fetchData('/getItemWiseSalesReport/'+outlet_id+'/'+today+'/'+today+'/'+storedStoreId, setCategoryData, setError, setIsLoading);



  }, []);

  let gridApi: any;

  const onGridReady = (params: any) => {
    gridApi = params.api;
  };

  const exportCsv = () => {
    const params: CsvExportParams = {
      fileName: 'exported_data.csv'
    };
    gridApi.exportDataAsCsv(params);
  };

  const exportPdf = () => {
    const params: CsvExportParams = {
      fileName: 'exported_data.pdf'
    };
    gridApi.exportDataAsPdf(params);
  };


  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const toggleDateRangePicker = () => {
        setShowDateRangePicker(!showDateRangePicker);
    };

    const handleDateRangeChange = (ranges: any) => {
        setSelectedDateRange(ranges.selection);
    };


const handleFilter = async () => {
// const startDate = selectedDateRange.startDate.toISOString();      
const endDate = selectedDateRange.endDate;
// Get the time zone offset for Sydney (in minutes)
const sydneyOffset = 10 * 60; // UTC+10 in minutes
// Adjust the end date by adding the Sydney time zone offset
const adjustedEndDate = new Date(endDate.getTime() + (sydneyOffset * 60000));
// Convert the adjusted end date to ISO string format
const endDateString = adjustedEndDate.toISOString().split('T')[0];


const startDate = selectedDateRange.startDate;
// Get the time zone offset for Sydney (in minutes)
// Adjust the end date by adding the Sydney time zone offset
const adjustedStartDate = new Date(startDate.getTime() + (sydneyOffset * 60000));
// Convert the adjusted end date to ISO string format
const startDateString = adjustedStartDate.toISOString().split('T')[0];


        fetchData(`/getItemWiseSalesReport/${outlet_id}/${startDateString}/${endDateString}/${storedStoreId}`, setCategoryData, setError, setIsLoading);
        setShowDateRangePicker(false);
    };

    const dateRangePickerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Add event listener to close date range picker when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
          if (dateRangePickerRef.current && !dateRangePickerRef.current.contains(event.target as Node)) {
            setShowDateRangePicker(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      

  return (
    <>
       <DefaultLayout>
      <Breadcrumb pageName="Product sales report " />
      {isLoading && <div className='text-center w-full items-center flex'><Loader/></div>}
      {categoryData && categoryData.stockEntries && (
        <div>
          <div className="mt-4">
       
      </div>

      
<div className='mt-4 flex items-end justify-end' style={{ position: 'relative' }}>

<div style={{ position: 'relative' }}>
  {showDateRangePicker && (
    <div className=" fixed top-20 right-20 z-999999 bg-white " style={{ position: 'absolute', top: '100%', right: '0', background: '#fff', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: '10000000', marginTop: '1px' }} ref={dateRangePickerRef}>
      <DateRangePicker
        onChange={handleDateRangeChange}
        ranges={[selectedDateRange]}
      />
      <button className="filtercls inline-flex items-center justify-left bg-primary py-1 px-8 text-left  font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={handleFilter} style={{ marginTop: '1rem' }}>Filter</button>
    </div>
  )}

  {!showDateRangePicker && (
    <div className="z-99999 fixed top-28 right-60">
      <button className="inline-flex items-center justify-left bg-primary py-1 px-6 text-left mb-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mr-8" onClick={toggleDateRangePicker}>Select Date Range</button>
    </div>
  )}
</div>



  {/* <button className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right mb-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => setShowColumnToggles(!showColumnToggles)} style={{ marginRight: '10px' }}>Filter Table Columns</button> */}
  {/* Toggle button */}
  <div className={`column-toggles ${showColumnToggles ? '' : 'hidden'}`} style={{ position: 'absolute', top: '100%', right: '0', background: '#fff', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: '10000000', marginTop: '1px' }}>
  <ul className="list-none p-0">
  {Object.keys(showColumns).map(fieldName => (
    <li key={fieldName} className="mb-5">
      <label className="block">
        <input
          type="checkbox"
          className="mr-2 leading-tight"
          checked={showColumns[fieldName]}
          onChange={() => setShowColumns(prevState => ({
            ...prevState,
            [fieldName]: !prevState[fieldName]
          }))}
        />
        <span className="text-sm">{fieldName}</span>
      </label>
    </li>
  ))}
</ul>

  </div>
</div>
    


          <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={categoryData.stockEntries}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              groupHeaders={true}
              autoGroupColumnDef={{
                headerName: 'Product Details',
                field: 'group',
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: { checkbox: true }
              }}
              groupDefaultExpanded={2}
            />
          </div>
        </div>
      )}
      
      </DefaultLayout>
    </>
  );
};

export default ItemsalesReport;
