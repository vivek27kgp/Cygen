import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CsvExportParams } from 'ag-grid-community';

const Viewpageexpired: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'item_name': true,
    'stock': true,
    'category_name': true,
    'purchase_price': true,
    'sales_price': true,
    'status': true
  });
  const [showColumnToggles, setShowColumnToggles] = useState(false); // State to control visibility of column toggles
 function showCheckbox(showColumnToggles: boolean){
  setShowColumnToggles(!showColumnToggles);
 }
  const columnDefs = [
    { headerName: 'Product Name', field: 'item_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['item_name'] },
    { headerName: 'Stock', field: 'stock', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['stock'] },
    { headerName: 'Category', field: 'category_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['category_name'] },
    { headerName: 'Purchase Price', field: 'purchase_price', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['purchase_price'] },
    { headerName: 'Sales Price', field: 'sales_price', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['sales_price'] },
    { 
      headerName: 'Status', 
      field: 'status',
      filter: true,
      valueGetter: (params: { data: { status: number; }; }) => params.data.status === 1 ? 'Active' : 'Inactive',
      cellStyle: { textAlign: 'center' },
      hide: !showColumns['status']
    }
  ];

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const outlet_id = localStorage.getItem('outlet_id');
  
  useEffect(() => {
    fetchData('/getAllItemslowstock/'+outlet_id+"/400", setCategoryData, setError, setIsLoading);



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





  return (
    <>
      {categoryData && categoryData.items && (
        <div>
          <div className="mt-4">
       
      </div>
<div className='mt-4 flex items-end justify-end' style={{ position: 'relative' }}>
  <button className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right mb-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => setShowColumnToggles(!showColumnToggles)} style={{ marginRight: '10px' }}>Filter Table Columns</button>
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
              rowData={categoryData.items}
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
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};

export default Viewpageexpired;
