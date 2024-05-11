import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CsvExportParams } from 'ag-grid-community';

const Viewpage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'id':true,
    'unit_name': true,
    'description': true,
    'status': true
    
  });
  const [showColumnToggles, setShowColumnToggles] = useState(false); // State to control visibility of column toggles
 function showCheckbox(showColumnToggles: boolean){
  setShowColumnToggles(!showColumnToggles);
 }
  const columnDefs = [
    { headerName: 'ID', field: 'id', 
    flex:2,
    alignItems: "center",
    justifyContent: "center",
    editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['id'] },
    { headerName: 'Unit Name',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'unit_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['unit_name'] },
    
    
    { headerName: 'Description',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'description', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['description'] },
    
    { 
      headerName: 'Status', 
      field: 'status',
      flex: 2,
      alignItems: "center",
    justifyContent: "center",
      filter: true,
      valueGetter: (params: { data: { status: number; }; }) => params.data.status === 1 ? 'Active' : 'Inactive',
      cellStyle: { textAlign: 'left' },
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
    fetchData('/unitlist/'+outlet_id, setCategoryData, setError, setIsLoading);



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



  const handleCellValueChanged = async (event: any) => {
    // Assuming 'event' contains the updated row data with changed values
    // You can now send this updated data to your backend API to update the database
    //console.log('Cell value changed:',JSON.stringify(event.data));
    const { data, colDef, newValue } = event;
   let  columnName='';
  // Check if the changed cell belongs to the desired column
  if (colDef.field === 'unit_name') {
    columnName = 'unit_name';
  //  console.log('Value of desired column changed:', newValue);
   // console.log('Row data:', JSON.stringify(data));
  }
  if (colDef.field === 'description') {
    columnName = 'description';
  //  console.log('Value of desired column changed:', newValue);
   // console.log('Row data:', JSON.stringify(data));
  }

  console.log("column name"+columnName);
  //updateItem
  let updatedCompanyDetails = {
    [columnName]: newValue,outlet_id:outlet_id
  };
  let id =data.id;
  console.log("-------------------------------id---------------->"+id);
  console.log("-------------------------------JSONDATA---------------->"+JSON.stringify(updatedCompanyDetails));
  console.log(JSON.stringify(updatedCompanyDetails));

  if(id!='' && id!='0' && columnName!=''){
  const response = await fetch(`http://localhost:3000/api/updateUnit/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCompanyDetails),
    });
    const responseData = await response.json();


    console.log('responseData:', JSON.stringify(responseData));
  }
  };

  const handleCellEditingStarted = (event: any) => {
    // Show alert or confirmation dialog
    const shouldAllowEditing = window.confirm('Are you sure you want to change this cell value?');
    if (!shouldAllowEditing) {
      // Prevent cell editing if the user cancels the action
      event.preventDefault();
    }
  };


  return (
    <>
      {categoryData && categoryData.list && (
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
              rowData={categoryData.list}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              onCellValueChanged={handleCellValueChanged}
              onCellEditingStarted={handleCellEditingStarted}
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

export default Viewpage;
