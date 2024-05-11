import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEye, FaEdit } from 'react-icons/fa';
import axiosInstancefile from '../AxiosInstancefile';
import { toast } from 'react-toastify';
import ViewModal from './Modalstock';
import Loader from '../Loader';
import { json, useNavigate } from 'react-router-dom';
import Modal from '../subcategory/Modal';
import ModalSup from '../modaldata/ModalSup';
import ModalBrand from '../modaldata/ModalBrand';
import ModalUnit from '../modaldata/ModalUnit';
import ModalTax from '../modaldata/ModalTax';
import ModalTaxtype from '../modaldata/ModalTaxtype';

const Viewpage: React.FC = () => {
  const navigate = useNavigate(); // Move the hook call here
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSup, setIsModalOpenSup] = useState(false);
  const [IsModalOpenBrand, setIsModalOpenBrand] = useState(false);
  const [IsModalOpenUnit, setIsModalOpenUnit] = useState(false);
  const [IsModalOpenTax, setIsModalOpenTax] = useState(false);
  const [IsModalOpenTaxType, setIsModalOpenTaxType] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for selected category ID
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'item_name': true,
    'custom_barcode':true,
    'category_name': true,
    'supplier_name':false,
    'brand_name':false,
    'unit_name':false,
    'tax_name':false,
    'tax_type':false,
    'priority':false,
    'stock': true,
    'purchase_price': false,
    'sales_price': true,
    'status': false
  });
  const [showColumnToggles, setShowColumnToggles] = useState(false); // State to control visibility of column toggles
 function showCheckbox(showColumnToggles: boolean){
  setShowColumnToggles(!showColumnToggles);
 }
 const handleActionClick = (itemId: string) => {
  alert(itemId);
  // Open the popup and set the selected item ID
 // setIsPopupOpen(true);
  //setSelectedItemId(itemId);
};


  const columnDefs = [
    { headerName: 'Product Name', field: 'item_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['item_name'] },
    { headerName: 'Barcode', field: 'custom_barcode', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['custom_barcode'] },
    { headerName: 'Category', field: 'category_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['category_name'] },
   
    { headerName: 'Stock', field: 'stock', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['stock'] },
    
    
    { headerName: 'Purchase Price', field: 'purchase_price', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['purchase_price'] },
    { headerName: 'Sales Price', field: 'sales_price', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['sales_price'] },
    { headerName: 'Supplier', field: 'supplier_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['supplier_name'] },
    
    { headerName: 'Brand', field: 'brand_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['brand_name'] },
    { headerName: 'Unit', field: 'unit_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['unit_name'] },
    { headerName: 'Tax Name', field: 'tax_name', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['tax_name'] },
    { headerName: 'Tax Type', field: 'tax_type', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['tax_type'] },
    
    { headerName: 'Priority', field: 'priority', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['priority'] },
    
   
    { 
      headerName: 'Status', 
      field: 'status',
      filter: true,
      valueGetter: (params: { data: { status: number; }; }) => params.data.status === 1 ? 'Active' : 'Inactive',
      cellStyle: { textAlign: 'center' },
      hide: !showColumns['status']
    },{
      headerName: 'Action',
      cellRenderer: ActionCellRenderer,
      width: 100, // Adjust the width as needed
      // cellRendererParams: {
      //   onClick: handleActionClick // Pass the onClick function to the cellRendererParams
      // }
      cellRendererParams: {
        actions: [
          { icon: <FaEye />, action: handleViewClick }, // Using FaEye icon from react-icons
          // { icon: <FaEdit />, action: handleEditClick } // Using FaEdit icon from react-icons
          // Add more actions as needed
        ]
      }
    }
  ];

  function ActionCellRenderer111(params) {
    const { actions } = params.colDef.cellRendererParams;
  
    return (
      <div className="flex">
        {actions.map((action, index) => (
          <button
            key={index}
            className="mr-2"
            onClick={() => action.action(params.data)}
          >
            {action.icon} {/* Ensure that the icon component is rendered */}
          </button>
        ))}
      </div>
    );
  }
  function ActionCellRenderer(params) {
    const { actions } = params.colDef.cellRendererParams;
  
    return (
      <div className="flex">
        {actions.map((action, index) => (
          <button
            key={index}
            className="mr-6 text-center mt-2"
            onClick={() => action.action(params.data)}

          >
             {action.icon} {/* Ensure that the icon component is rendered */}
          </button>
        ))}
      </div>
    );
  }
  
  function handleViewClick(data) {
    alert('view')
    console.log('View clicked for data:', data);
    const id_val = data.id;
    navigate('/productdetail/'+id_val);
  }
  
  function handleEditClick(data) {
    alert('exit')
    console.log('Edit clicked for data:', data);
  }

  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const outlet_id = localStorage.getItem('outlet_id');
  const storedStoreId:any = localStorage.getItem('selectedStore')||0;
  let url ='';
  if(storedStoreId=='0' || storedStoreId==''){
    url ='/getAllItemsWithoutStore/'+outlet_id;
  }else{
    url ='/getAllItems/'+outlet_id+'/'+'0'+'/'+'0'+'/'+'0'+'/'+'0'+'/'+'0'+'/'+'0'+'/'+'0'+'/'+storedStoreId;
  }
  
  useEffect(() => {
    fetchData(url, setCategoryData, setError, setIsLoading);
  }, []);


 
  const handleCellValueChanged = async (event: any) => {
    // Assuming 'event' contains the updated row data with changed values
    // You can now send this updated data to your backend API to update the database
    //console.log('Cell value changed:',JSON.stringify(event.data));
    const { data, colDef, newValue } = event;
   let  columnName='';
  // Check if the changed cell belongs to the desired column
  if (colDef.field === 'custom_barcode') {
    columnName = 'custom_barcode';

    if (newValue && newValue.toString().length > 13) {
      alert('Barcode Maximum 13 Digit');
      // If the entered value exceeds the limit, truncate it to 10 characters
      const truncatedValue = newValue.toString().slice(0, 13);
      // Update the cell value with the truncated value
      event.node.setDataValue(colDef.field, truncatedValue);
        
        columnName='';
    }




  //  console.log('Value of desired column changed:', newValue);
   // console.log('Row data:', JSON.stringify(data));
  }
  if (colDef.field === 'item_name') {
    columnName = 'item_name';
  }
  if (colDef.field === 'purchase_price') {
    columnName = 'purchase_price';
  }
  if (colDef.field === 'sales_price') {
    columnName = 'sales_price';
  }
  if (colDef.field === 'stock') {
    columnName = 'stock';

  }
  if (colDef.field === 'priority') {
    columnName = 'priority';
  }
  console.log("column name"+columnName);
  //updateItem
  let updatedCompanyDetails = {
    [columnName]: newValue,outlet_id:outlet_id,store_id:storedStoreId
  };
  let id =data.id;
  console.log("ID--------------------->"+id);
  console.log(JSON.stringify(updatedCompanyDetails));

  if(id!='' && id!='0' && columnName!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCompanyDetails),
    });
    const responseData = await response.json();

    


    console.log('responseData:', JSON.stringify(responseData));
  }


  if (colDef.field === 'category_name' || colDef.field === 'supplier_name' || colDef.field === 'brand_name' || colDef.field === 'unit_name' || colDef.field === 'tax_name' || colDef.field === 'tax_type') {
    const updatedData = [...categoryData.items]; // Make a copy of the current data array
    const rowIndex = updatedData.findIndex((row: any) => row.id === data.id);
        updatedData[rowIndex][colDef.field] = newValue;
        setCategoryData({ ...categoryData, list: updatedData });
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

// for category chnage
const handleModalClose = async (selectedCategory: any, categoryId: string,type:string) => {
 if(type=='1'){
  let  columnName='category_id';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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

 }
 if(type=='2'){
  console.log('selectedCategory--------------------=============>'+JSON.stringify(selectedCategory));
  let  columnName='supplier_id';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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
    colDef: { field: 'supplier_name' }, // Assuming the column field is 'category_name'
    newValue: selectedCategory.supplier_name // Assuming selectedCategory contains the updated category data
  };
  // Call handleCellValueChanged with the event object
  handleCellValueChanged(event);
  setIsModalOpenSup(false);

 }


 if(type=='3'){
  let  columnName='brand_id';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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
    colDef: { field: 'brand_name' }, // Assuming the column field is 'category_name'
    newValue: selectedCategory.brand_name // Assuming selectedCategory contains the updated category data
  };
  // Call handleCellValueChanged with the event object
  handleCellValueChanged(event);
  setIsModalOpenBrand(false);

 }

 if(type=='4'){
  let  columnName='unit_id';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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
    colDef: { field: 'unit_name' }, // Assuming the column field is 'category_name'
    newValue: selectedCategory.unit_name // Assuming selectedCategory contains the updated category data
  };
  // Call handleCellValueChanged with the event object
  handleCellValueChanged(event);
  setIsModalOpenUnit(false);

 }
 
 if(type=='5'){
  let  columnName='tax_id';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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
    colDef: { field: 'tax_name' }, // Assuming the column field is 'category_name'
    newValue: selectedCategory.tax_name // Assuming selectedCategory contains the updated category data
  };
  // Call handleCellValueChanged with the event object
  handleCellValueChanged(event);
  setIsModalOpenTax(false);

 }


 if(type=='6'){
  console.log("selected data here ---------"+JSON.stringify(selectedCategory))
  let  columnName='tax_type';
  let updatedCompanyDetails = {
    [columnName]: categoryId,outlet_id:outlet_id
  };
  let id =selectedData.id;
  if(id!='' && id!='0' && columnName!='' && categoryId!=''){
  const response = await fetch(`http://localhost:3000/api/updateItem/${id}`, {
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
    colDef: { field: 'tax_type' }, // Assuming the column field is 'category_name'
    newValue: selectedCategory.tax_type // Assuming selectedCategory contains the updated category data
  };
  // Call handleCellValueChanged with the event object
  handleCellValueChanged(event);
  setIsModalOpenTaxType(false);

 }










};










const handleCellClicked = (params: any) => {
  if (params.colDef.field === 'category_name') {
    setSelectedData(params.data);
    setSelectedCategoryId(params.data.category_id); // Update selected category ID state
    setIsModalOpen(true);
  }
  if (params.colDef.field === 'supplier_name') {
    setSelectedData(params.data);
    setIsModalOpenSup(true);
  }
  if (params.colDef.field === 'brand_name') {
    setSelectedData(params.data);
    setIsModalOpenBrand(true);
  }
  if (params.colDef.field === 'unit_name') {
    setSelectedData(params.data);
    setIsModalOpenUnit(true);
  }
  if (params.colDef.field === 'tax_name') {
    setSelectedData(params.data);
    setIsModalOpenTax(true);
  }
  if (params.colDef.field === 'tax_type') {
    setSelectedData(params.data);
    setIsModalOpenTaxType(true);
  }

};


  return (
    <>
    {isLoading && <div className='text-center w-full items-center flex'><Loader/></div>}
      {categoryData && categoryData.items && (
        <div>
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
              onCellValueChanged={handleCellValueChanged}
         onCellEditingStarted={handleCellEditingStarted}
              domLayout="autoHeight"
              groupHeaders={true}
              onCellClicked={handleCellClicked}
              autoGroupColumnDef={{
                headerName: 'Product Details',
                field: 'group',
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: { checkbox: true }
              }}
              groupDefaultExpanded={2}
              frameworkComponents={{ actionCellRenderer: ActionCellRenderer }} // Register the custom cell renderer
            />
          </div>
        </div>
      )}
      {isModalOpen && <Modal selectedData={selectedData} closeModal={handleModalClose} />}
      {isModalOpenSup && <ModalSup selectedData={selectedData} closeModal={handleModalClose} />}
      {IsModalOpenBrand && <ModalBrand selectedData={selectedData} closeModal={handleModalClose} />}
      {IsModalOpenUnit && <ModalUnit selectedData={selectedData} closeModal={handleModalClose} />}
      {IsModalOpenTax && <ModalTax selectedData={selectedData} closeModal={handleModalClose} />}
      {IsModalOpenTaxType && <ModalTaxtype selectedData={selectedData} closeModal={handleModalClose} />}
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};
// Custom cell renderer component for the action column
// Custom cell renderer component for the action column


const ActionCellRenderer: React.FC<{ data: any }> = ({ data }) => {
  const [isOpenStock, setIsOpenStock] = useState(false);
  const navigate = useNavigate(); // Move the hook call here
 function toggleModalMofdal(){
  const id_val = data.id;
  navigate('/productdetail/'+id_val);
 }
  return (
    <>
       <button onClick={toggleModalMofdal}>Action</button>
     
      
    </>
  );
};

export default Viewpage;
