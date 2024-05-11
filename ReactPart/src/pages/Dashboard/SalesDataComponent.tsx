import React from 'react';
import { json } from 'react-router-dom';

const SalesDataComponent: React.FC<{ reportSales: any }> = ({ reportSales }) => {
  if (reportSales === null || reportSales === null) {
    return <div>No data available</div>
  }
  console.log("RESPONSE"+JSON.stringify(reportSales.reportSales));
  return (
   
    <div>
     
      <table  className="w-full divide-y divide-orange-400 border-spacing-1 "> 
       
        <tbody className="bg-white ">
            <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-500 text-white rounded-md">Total Sales</div>
            <div className="ml-auto text-md text-gray-400">{reportSales.reportSales.total_sales_amount}</div>
            </div>
            </button>
            </td>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">

            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-sky-500 text-white rounded-md"> Net Sales</div>
            <div className="ml-auto text-md text-gray-400 ">{reportSales.reportSales.total_sales_amount}</div>
            </div>
            </button>
            </td>
            </tr>
            <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-pink-500 text-white rounded-md">Total Invoice</div>
            <div className="ml-auto text-md text-gray-400">{reportSales.reportSales.total_invoice}</div>
            </div>
            </button>
            </td>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">

            <div className="flex items-center w-full">
            <div className="text-md py-1 px-2 leading-none dark:bg-gray-900 bg-cyan-400 text-white rounded-md"> Avg Sales</div>
            <div className="ml-auto text-md text-gray-400">{(reportSales.reportSales.total_sales_amount/reportSales.reportSales.total_invoice).toFixed(2)}</div>
            </div>
            </button>
            </td>
            </tr>
            <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-md py-1 px-2 leading-none dark:bg-gray-900 bg-primary text-white rounded-md">Total Tax</div>
            <div className="ml-auto text-md text-gray-400">{reportSales.reportSales.total_tax}</div>
            </div>
            </button>
            </td>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">

            <div className="flex items-center w-full">
            <div className="text-md py-1 px-2 leading-none dark:bg-gray-900 bg-lime-400 text-white rounded-md"> Total Discounts</div>
            <div className="ml-auto text-md text-gray-400">{reportSales.reportSales.total_discount_amount}</div>
            </div>
            </button>
            </td>
            </tr>
        </tbody>
      </table>

      <h2 className='pl-10'>Payment Details</h2>
      <table className="w-full  border-spacing-1 ">
       
        <tbody>
          {reportSales.reportSales.payment_detail.map((payment: any, index: number) => (
            

            <tr className="whitespace-nowrap" key={index}>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-700 text-white rounded-md">&nbsp;&nbsp;&nbsp;{payment.payment_type}&nbsp;&nbsp;&nbsp;</div>
            <div className="ml-auto text-md text-gray-400">{payment.totalSales}</div>
            </div>
            </button>
            </td>
            
            </tr>



              
          
          ))}
        </tbody>
      </table>
    
      <h2 className='pl-10'>Top Trending Products</h2>
      <table className="w-full  border-spacing-1 ">
       
        <tbody>
          {reportSales.reportSales.trading_product.map((payment: any, index: number) => (
            

            <tr className="whitespace-nowrap" key={index}>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-lime-400 text-white rounded-md">&nbsp;&nbsp;&nbsp;{payment.item_name}&nbsp;&nbsp;&nbsp;</div>
            <div className="ml-auto text-md text-gray-400">{payment.sales_qty}</div>
            </div>
            </button>
            </td>
            
            </tr>



              
          
          ))}
        </tbody>
      </table>
    


      <h2 className='pl-10'>Top Trending Categorys</h2>
      <table className="w-full  border-spacing-1 ">
       
        <tbody>
        {reportSales.reportSales.trading_category.map((payment: any, index: number) => (
            

            <tr className="whitespace-nowrap" key={index}>
            <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center"><button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-700 text-white rounded-md">&nbsp;&nbsp;&nbsp;{payment.category_name}&nbsp;&nbsp;&nbsp;</div>
            <div className="ml-auto text-md text-gray-400">{payment.sales_qty}</div>
            </div>
            </button>
            </td>
            
            </tr>



              
          
          ))}
        </tbody>
      </table>
    






    </div>
  );
};

export default SalesDataComponent;
