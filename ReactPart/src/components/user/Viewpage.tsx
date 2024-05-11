import React, { useEffect, useState } from 'react';
import fetchData from '../../components/fetchData'; 
import Popup from '../Charts/Popup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CsvExportParams } from 'ag-grid-community';
import axiosInstancefile from '../AxiosInstancefile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Viewpage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>({
    'id':true,
    'username':true,
    'password_view': true,
    'firstname': true,
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
    { headerName: 'User Name',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'username', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['username'] },
    
    
    { headerName: 'Password',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'password_view', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['password_view'] },
    
    { headerName: 'Display Name',      alignItems: "center",
    justifyContent: "center", flex: 2,field: 'firstname', editable: true, filter: true, cellStyle: { textAlign: 'left' }, hide: !showColumns['firstname'] },
    
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
    fetchData('/getAllUsers/'+outlet_id, setCategoryData, setError, setIsLoading);



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





  // code for item_detail

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [item_detail, set_item_detail] = useState();
  const [item_detail_loading, setIsLoading_item] = useState(true);
  const toggledetailModal = (id:any) => {

  const outlet_id = localStorage.getItem('outlet_id');
  
    fetchData(
      '/getAllItemsSingle/' + outlet_id+'/'+id,
      (response) => {
        set_item_detail(response.items); // Set storedata to just the list array
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


  const [storedata, set_storedata] = useState<any[]>([]);
  const [stockall, set_stockall] = useState();
  const outlet_idAll = localStorage.getItem('outlet_id');
  const storedStoreId= localStorage.getItem('selectedStore');
  
  const [isitem_id, set_isitemid] = useState(false);
  const [isOpenStock, setIsOpenStock] = useState(false);

  const togglestockModal = (id:any,stock:any) => {
   
    const outlet_id = localStorage.getItem('outlet_id');
    set_isitemid(id);
    set_stockall(stock);
    console.log('/getStoreStock/' + outlet_id+'/'+id);
    fetchData(
      '/getStoreStock/' + outlet_id+'/'+id,
      (response) => {
        set_storedata(response.list); // Set storedata to just the list array
      },
      setError,
      setIsLoading,
    );
      console.log("---------------------------------->####"+JSON.stringify(storedata));
     
      



    setIsOpenStock(!isOpenStock);


  };
  const togglestockModalclose = () => {
   
    setIsOpenStock(!isOpenStock);


  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
   
    const outlet_id = localStorage.getItem('outlet_id');



    setIsOpen(!isOpen);
   

  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e: { target: { files: any[]; }; }) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.error("No file selected");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axiosInstancefile.post('/import-item', formData);
      console.log(JSON.stringify(response));

      
     
      const responseCode = response.data.responseCode;
      console.log(responseCode);
      if (responseCode== 0 ) {
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
          toggleModal();
          window.location.reload();
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
    














    } catch (error) {
      console.error(error);
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
