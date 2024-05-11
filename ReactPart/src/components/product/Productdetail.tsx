import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useParams } from "react-router-dom";
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface ItemDetail {
  // Define the structure of your item detail object
}

const Productdetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axiosInstance.get(`/getAllItemsSingle/${localStorage.getItem('outlet_id')}/${id}`)
        .then(response => {
          setItemDetail(response.data.items);
          setIsLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch item detail.');
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Detail" />
      <ToastContainer />
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {itemDetail && (
          <>
          
            <div className="relative p-6 flex-auto  scrollbar-thin scrollbar-thumb-bg-primary bg-white scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
               


            <h3 className="text-xl font-semibold"> Product Information</h3>

               <table className=" divide-y divide-orange-400 w-[100%]">
              <tbody className="bg-white divide-y divide-gray-300">
                {/* Render loading spinner while data is being fetched */}
               
               
                {itemDetail &&  itemDetail.map((row: any) => (
                  <>
                    <tr  key={row.id} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Product Name : <span className='text-primary'>{row.item_name}</span>
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Category :<span className='text-primary'>{row.category_name}</span> 
                        </td>
                    </tr>
                   
                    <tr  key={row.id} className="whitespace-nowrap">
                    <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                       Supplier : <span className='text-primary'>{row.supplier_name!=''?row.supplier_name:'--'}</span> 
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Brand: <span className='text-primary'>{row.brand_name!='' && row.brand_name!=null?row.brand_name:'--'}</span>
                        
                        </td>
                    </tr>
                    
                    <tr  key={row.id} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Unit: <span className='text-primary'>{row.unit_name}</span> 
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Tax : <span className='text-primary'>{row.tax_name}</span> 
                        </td>
                    </tr>
                    
                    <tr  key={row.id} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Sale price : <span className='text-primary'>{row.sales_price=='' || row.sales_price==null?0.00:row.sales_price.toFixed(2)}</span> 
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                       Purchase Price : <span className='text-primary'>{row.purchase_price.toFixed(2)}</span>  
                        </td>
                       
                    </tr>
                   
                    <tr  key={row.id} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Tax Type : <span className='text-primary'>{row.tax_type}</span>   
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                       Barcode :  <span className='text-primary'>{row.custom_barcode}</span>   
                        </td>
                    </tr>
                   
                    <tr  key={row.id} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Lot Number : <span className='text-primary'>{row.lot_number}</span>  
                        </td>
                        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Alert Qty : <span className='text-primary'>{row.lot_number}</span>   
                        </td>
                    </tr>
                    <tr  key={row.id} className="whitespace-nowrap">
                    
                    <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Profit margin <span className='text-primary'>{row.profit_margin}</span>
                    </td>
                    <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        Is Scalable <span className='text-primary'>{row.scale_weight_edit=='0'?'Yes':'No'}</span> 
                        </td>
                    </tr>
                   
                   
            
                 </>   
                    
            
            
            ))}
            
              </tbody>
            </table>
            
            
                          </div>
            
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Productdetail;
