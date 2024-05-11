import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData';
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CsvExportParams } from 'ag-grid-community';
import Modal from './Modal'; 
import Status from './Status'; 
const Viewpage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'id': true,
    'subcategory_name': true,
    'category_name': true,
    'status': true
  });
  const [showColumnToggles, setShowColumnToggles] = useState(false);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenstatus, setIsModalOpenstatus] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for selected category ID
  const outlet_id = localStorage.getItem('outlet_id');
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null); // State for selected category ID

  useEffect(() => {
    fetchData('/subcategoryList/'+outlet_id, setCategoryData, setError, setIsLoading);
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id', flex:2, alignItems: "center", justifyContent: "center", editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['id'] },
    { headerName: 'Subcategory Name', alignItems: "center", justifyContent: "center", flex: 2, field: 'subcategory_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['subcategory_name'] },
    { headerName: 'Category Name', alignItems: "center", justifyContent: "center", flex: 2, field: 'category_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['category_name'] },
    { 
      headerName: 'Status', 
      field: 'status',
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      filter: true,
      valueGetter: (params: { data: { status: number; }; }) => params.data.status ==1 ? 'Active' : 'Inactive',
      cellStyle: { textAlign: 'left' },
      hide: !showColumns['status']
    }
  ];
  const handleCellValueChanged = async (event: any) => {
    const { data, colDef, newValue } = event;
    if (colDef.field === 'category_name') {
    const updatedData = [...categoryData.list]; // Make a copy of the current data array
    const rowIndex = updatedData.findIndex((row: any) => row.id === data.id);
        updatedData[rowIndex][colDef.field] = newValue;
        setCategoryData({ ...categoryData, list: updatedData });
  }
  if (colDef.field === 'status') {
    const updatedData = [...categoryData.list]; // Make a copy of the current data array
    const rowIndex = updatedData.findIndex((row: any) => row.id === data.id);
    if (rowIndex !== -1) {
        updatedData[rowIndex][colDef.field] = newValue;
        setCategoryData({ ...categoryData, list: updatedData });
    }
}
  let  columnName='';
  if (colDef.field === 'subcategory_name') {
    columnName = 'subcategory_name';
  }
  let updatedCompanyDetails = {
    [columnName]: newValue,outlet_id:outlet_id
  };
  let id =data.id;
  if(id!='' && id!='0' && columnName!=''){
  const response = await fetch(`http://localhost:3000/api/updateSubcategory/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCompanyDetails),
    });
    const responseData = await response.json();
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

  const handleCellClicked = (params: any) => {
    if (params.colDef.field === 'category_name') {
      setSelectedData(params.data);
      setSelectedCategoryId(params.data.category_id); // Update selected category ID state
      setIsModalOpen(true);
    }
    if (params.colDef.field === 'status') {
      setSelectedData(params.data);
      setSelectedStatus(params.data.status); // Update selected category ID state
      setIsModalOpenstatus(true);
    }
  };

  const handleModalClose = async (selectedCategory: any, categoryId: string) => {
    console.log(selectedCategory, categoryId);
    console.log("seled data"+JSON.stringify(selectedData));
    let  columnName='cat_id';
    let updatedCompanyDetails = {
      [columnName]: categoryId,outlet_id:outlet_id
    };
    let id =selectedData.id;
    if(id!='' && id!='0' && columnName!='' && categoryId!=''){
    const response = await fetch(`http://localhost:3000/api/updateSubcategory/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCompanyDetails),
      });
      const responseData = await response.json();
  
    }
    const event = {
      data: selectedData, // Assuming selectedData contains the row data for the selected category
      colDef: { field: 'category_name' }, // Assuming the column field is 'category_name'
      newValue: selectedCategory.category_name // Assuming selectedCategory contains the updated category data
    };
    // Call handleCellValueChanged with the event object
    handleCellValueChanged(event);
    setIsModalOpen(false);
  };
  
 
  const handleModalClosetatus = async (selectedCategory: any, categoryId: string) => {
    let  columnName='status';
    let updatedCompanyDetails = {
      [columnName]: categoryId,outlet_id:outlet_id
    };
    let id =selectedData.id;
    if(id!='' && id!='0' && columnName!='' && categoryId!=''){
    const response = await fetch(`http://localhost:3000/api/updateSubcategory/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCompanyDetails),
      });
      const responseData = await response.json();
  
    }
    const event = {
      data: selectedData, // Assuming selectedData contains the row data for the selected category
      colDef: { field: 'status' }, // Assuming the column field is 'category_name'
      newValue: selectedCategory.category_name // Assuming selectedCategory contains the updated category data
    };
    // Call handleCellValueChanged with the event object
    handleCellValueChanged(event);
    setIsModalOpenstatus(false);
  };
  

  return (
    <>
      {categoryData && categoryData.list && (
        <div>
          <div className="mt-4"></div>
          <div className='mt-4 flex items-end justify-end' style={{ position: 'relative' }}>
            <button className="inline-flex items-center justify-right bg-primary py-2 px-10 text-right mb-4 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => setShowColumnToggles(!showColumnToggles)} style={{ marginRight: '10px' }}>Filter Table Columns</button>
            <div className={`column-toggles ${showColumnToggles ? '' : 'hidden'}`} style={{ position: 'absolute', top: '100%', right: '0', background: '#fff', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: '10000000', marginTop: '1px' }}>
              <ul className="list-none p-0">
                {Object.keys(showColumns).map(fieldName => (
                  <li key={fieldName} className="mb-5">
                    <label className="block">
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={showColumns[fieldName]}
                        onChange={() => setShowColumns(prevState => ({ ...prevState, [fieldName]: !prevState[fieldName] }))}
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
              groupHeaders={true}
              onCellValueChanged={handleCellValueChanged}
              onCellEditingStarted={handleCellEditingStarted}
              onCellClicked={handleCellClicked}
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
      {isModalOpen && <Modal selectedData={selectedData} closeModal={handleModalClose} />}
      {isModalOpenstatus && <Status selectedData={selectedData} closeModal={handleModalClosetatus} />}
    </>
  );
};

export default Viewpage;
