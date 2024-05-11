import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
import Loader from '../../components/Loader';
import { NavLink, useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import SalesComparisonGraph from './SalesComparisonGraph';
import fetchData from '../../components/fetchData';
import SalesDataComponent from './SalesDataComponent';
import SalesSummary from './SalesSummary';
import Chart from 'chart.js/auto';
const ECommerce: React.FC = () => {
  const [todayData, setTodayData] = useState<any>(null);
  const [lastWeekData, setLastWeekData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingdashboard, setIsLoadingdashboard] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [salesData, setSalesData] = useState<any>(null);
  const [todays_sales_amount, set_todays_sales_amount] = useState<any>(null);
  const [lastweek_sales_amount, set_lastweek_sales_amount] = useState<any>(null);
  const [totalSalesToday, set_totalSalesToday] = useState<any>(null);
  const [totalSalesLastWeek, set_totalSalesLastWeek] = useState<any>(null);
  const [single_payment_data, set_single_payment_data] = useState<any>(null);
  const [hour_click, set_hour_click] = useState<any>(null);
  const [session_outlet, set_session_outlet] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('week');
  const [reportTabSale, setReportTabSale] = useState(null);

  const [reportTabSaleCount, setReportTabSaleCount] = useState(null);

  const [lowstock, set_lowstock] = useState(null);
  const [expired_product, set_expired_product] = useState(null);

  const [dashboard_count, set_dashboard_count] = useState(null);
  const [dashboard_count_home, setDashboardData] = useState(null);
  const [isLoadingExp, setIsLoadingExp] = useState<boolean>(false);
  let storedStoreId:any = localStorage.getItem('selectedStore');
  if(storedStoreId=='' || storedStoreId=='10'){
    storedStoreId=0;
  }
  useEffect(() => {
    set_session_outlet(localStorage.getItem('outlet_id'));
    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const outlet_id = localStorage.getItem('outlet_id');
        const response = await fetch('http://localhost:3000/api/getHourlySales/' + outlet_id);
        const response_amount = await fetch('http://localhost:3000/api/getPaymenttypeSales/' + outlet_id);
        if (!response.ok && !response_amount.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTodayData(data.today);
        setLastWeekData(data.lastWeek);

        const data_amount = await response_amount.json();
        set_todays_sales_amount(data_amount.today);
        set_lastweek_sales_amount(data_amount.lastWeek);
        set_totalSalesToday(data_amount.totalSalesToday);
        set_totalSalesLastWeek(data_amount.totalSalesLastWeek);
        
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataFromAPI();
  }, []);

  // useEffect(() => {
  //   if (todays_sales_amount && lastweek_sales_amount) {
  //     console.log("Today's Sales Amount: ", todays_sales_amount);
  //     console.log("Last Week's Sales Amount: ", lastweek_sales_amount);

  //     const dataForGraph = {
  //       today: todays_sales_amount,
  //       lastWeek: lastweek_sales_amount,
  //     };
  //     console.log("Data for Graph:yyyyyyyyy ", dataForGraph);
  //   } else {
  //     console.log("Sales data not yet loaded");
  //   }
  // }, [todays_sales_amount, lastweek_sales_amount]);

  const alignedData = todayData && todayData.map((todayEntry: { hour: any; sales: any; }, index: number) => ({
    hour: todayEntry.hour,
    lastWeekSales: lastWeekData[index]?.sales || 0 ,
    todaySales: todayEntry.sales,
  }));


  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (hour:any,payment_date:any) => {
   
    const outlet_id = localStorage.getItem('outlet_id');
    const sda ='/getSingleHourlySales/'+outlet_id+'/'+payment_date+'/'+hour;
  
    fetchData('/getSingleHourlySales/'+outlet_id+'/'+payment_date+'/'+hour, set_single_payment_data, setError, setIsLoading);
    // Call the fetchData function when the component mounts
    //console.log(single_payment_data);
    if(single_payment_data!=''){
      setIsOpen(!isOpen);
    }


  };



  useEffect(() => {

    const outlet_id = localStorage.getItem('outlet_id');
    fetchData('/getAllItemslowstock/'+outlet_id+"/5", set_lowstock, setError, setIsLoading);
    fetchData('/getAllItemsexpired/'+outlet_id+'/1/5', set_expired_product, setError, setIsLoading);
    //fetchData('/getDashboardCount/'+outlet_id+'/1/'+storedStoreId, set_dashboard_count, setError, setIsLoadingdashboard);

   
    // Simulated response data
    const responseData = {
      "status": "SUCCESS",
      "responseCode": "0",
      "message": "Records retrieved successfully",
      "reportSales": {
          "total_sales_amount": 162807.12,
          "total_discount_amount": 4187.28,
          "payment_detail": [
              {
                  "totalSales": 149584.19,
                  "payment_type": "Card"
              },
              {
                  "totalSales": 13222.93,
                  "payment_type": "Cash"
              }
          ],
          "total_invoice": 8980,
          "total_tax": 7090.77
      }
    };

    // Extract data for plotting
    const paymentDetail = responseData.reportSales.payment_detail;
    const labels = paymentDetail.map((payment: any) => payment.payment_type);
    const data = paymentDetail.map((payment: any) => payment.totalSales);

    // Construct dataset for the chart
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Total Sales Amount',
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB'], // Colors for Card and Cash respectively
        },
      ],
    };

    setSalesData(chartData);
  }, []);

  useEffect(() => {
    if (salesData) {
      const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: salesData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [salesData]);



  
  useEffect(() => {
    const fetchDataForTab = async () => {
      try {
        let responseTab;
        let ourlet_val = localStorage.getItem('outlet_id');
        switch (activeTab) {
          case 'today':
          //  console.log('http://localhost:3000/api/getSalesDataReport/'+localStorage.getItem('outlet_id')+'/1');
            responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/1');
            break;
          case 'week':
            responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/2');
            break;
          case 'month':
            responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/3');
            break;
          
            case 'lastthreemonth':
              responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/4');
              break;

              case 'year':
                responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/5');
                break;
          default:
            responseTab = await fetch('http://localhost:3000/api/getSalesDataReport/'+ourlet_val+'/1');
        }
        
        // Check if response is successful
        if (!responseTab.ok) {
          throw new Error(`HTTP error! Status: ${responseTab.status}`);
        }
        
        // Convert response to JSON
        const data_reporttab = await responseTab.json();
        setReportTabSale(data_reporttab);
        // Update state with fetched data
       
      } catch (error) {
        // Handle errors
       
      } finally {
       
      }
    };
  
   fetchDataForTab();
  }, [activeTab]); // Fetch data whenever activeTab changes
  




// for dashboard count muna

const [activeTabCount, setactiveTabCount] = useState('today');
useEffect(() => {
  const fetchDataForTabCount = async () => {
    try {
      let responseTabCount;
      let ourlet_val = localStorage.getItem('outlet_id');
      console.log("-------------------------------------->"+activeTabCount);
      switch (activeTabCount) {
        case 'today':
          setIsLoadingdashboard(true);
        responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/1/'+storedStoreId);
      
          break;
        case 'week':
          setIsLoadingdashboard(true);
          responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/2/'+storedStoreId);
          break;
        case 'month':
          setIsLoadingdashboard(true);
          responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/3/'+storedStoreId);
          break;
        
          case 'lastthreemonth':
            setIsLoadingdashboard(true);
            responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/4/'+storedStoreId);
            break;

            case 'year':
              setIsLoadingdashboard(true);
              responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/5/'+storedStoreId);
              break;
        default:
          setIsLoadingdashboard(true);
          responseTabCount = await fetch('http://localhost:3000/api/getDashboardCount/'+ourlet_val+'/1/'+storedStoreId);
      }
      
      // Check if response is successful
      if (!responseTabCount.ok) {
        throw new Error(`HTTP error! Status: ${responseTabCount.status}`);
      }
      
      // Convert response to JSON
      const data_reporttabCount = await responseTabCount.json();
      setIsLoadingdashboard(false);
      console.log("data all--------------------------->"+JSON.stringify(data_reporttabCount));
      setReportTabSaleCount(data_reporttabCount);
      // Update state with fetched data
     
    } catch (error) {
      // Handle errors
     
    } finally {
     
    }
  };

  fetchDataForTabCount();
}, [activeTabCount]); // Fetch data whenever activeTab changes





// for dashboard expired count kuna

const [activeTabExp, setactiveTabExp] = useState('today');
useEffect(() => {
  const fetchDataForTabExp = async () => {
    try {
      
      let ourlet_val = localStorage.getItem('outlet_id');
      console.log("-------------------------------------->"+activeTabCount);
      switch (activeTabExp) {
        case 'today':
          setIsLoadingExp(true);
        
        fetchData('/getAllItemsexpired/'+ourlet_val+'/1/5', set_expired_product, setError, setIsLoadingExp);
        break;
        case 'week':
          setIsLoadingExp(true);
          fetchData('/getAllItemsexpired/'+ourlet_val+'/2/5', set_expired_product, setError, setIsLoadingExp);
          break;
        case 'month':
         setIsLoadingExp(true);
          fetchData('/getAllItemsexpired/'+ourlet_val+'/3/5', set_expired_product, setError, setIsLoadingExp);
          break;
        
          case 'lastthreemonth':
            setIsLoadingExp(true);
            fetchData('/getAllItemsexpired/'+ourlet_val+'/4/5', set_expired_product, setError, setIsLoadingExp);
            break;

            case 'year':
              setIsLoadingExp(true);
              fetchData('/getAllItemsexpired/'+ourlet_val+'/4/5', set_expired_product, setError, setIsLoadingExp);
              break;
        default:
          setIsLoadingExp(false);
          fetchData('/getAllItemsexpired/'+ourlet_val+'/1/5', set_expired_product, setError, setIsLoadingExp);
      }
     
    } catch (error) {
      // Handle errors
     
    } finally {
     
    }
  };
   
  fetchDataForTabExp();
}, [activeTabExp]); // Fetch data whenever activeTab changes















  const [expire_date_single, set_expire_date_single] = useState<string | undefined>(undefined); // Updated type to string | undefined
  const handleExpiredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const expired_data = e.target.value;
    let target_value = expired_data!=""?expired_data:1;
    set_expire_date_single(expired_data);
    const outlet_id = localStorage.getItem('outlet_id');
    fetchData('/getAllItemsexpired/'+outlet_id+'/'+target_value+'/5', set_expired_product, setError, setIsLoading);
    // Reload the current page
    
  };


  const [dashboard_count_detail, set_dashboard_count_detail] = useState<string | undefined>(undefined); // Updated type to string | undefined
  const handleDashboardCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dashboard_data = e.target.value;
    let target_value = dashboard_data!=""?dashboard_data:1;
    //console.log("dashboard counts------------------------>"+dashboard_data);
    console.log("storedStoreId counts------------------------>"+storedStoreId);
    set_dashboard_count_detail(dashboard_data);
    const outlet_id = localStorage.getItem('outlet_id');
    fetchData('/getDashboardCount/'+outlet_id+'/'+target_value+'/'+storedStoreId, set_dashboard_count, setError, setIsLoadingdashboard);
    // Reload the current page
    
  };

  
  return (
    <DefaultLayout>
      
<div className="w-full items-end justify-between bg-white mt-4">




  <div className="w-full mx-auto">



    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">




      <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li className="mr-2" role="presentation">
          <button 
            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
              activeTabCount === 'today' ? 'active' : ''
            }`}  
            onClick={() => setactiveTabCount('today')}
          >
            Today
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button 
            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
              activeTabCount === 'yesterday' ? 'active' : ''
            }`}  
            onClick={() => setactiveTabCount('yesterday')}
          >
            Yesterday
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button 
            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
              activeTabCount === 'week' ? 'active' : ''
            }`}  
            onClick={() => setactiveTabCount('week')}
          >
            Week
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button 
            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
              activeTabCount === 'month' ? 'active' : '' 
            }`}  
            onClick={() => setactiveTabCount('month')}
          >
            Month
          </button>
        </li>
        <li role="presentation">
          <button 
            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
              activeTabCount === 'lastthreemonth' ? 'active' : ''
            }`}  
            onClick={() => setactiveTabCount('lastthreemonth')}
          >
            Last Three Month
          </button>
        </li>
        
      </ul>
    </div>
    <div className="tab-content pb-2">
      {isLoadingdashboard ? (
        <Loader/>
      ) : (
        <>
          {dashboard_count !== '' && dashboard_count !== '' ? (
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
                <SalesSummary data={reportTabSaleCount} />
             </div>
           
          ) : (
            null
          )}
        </>
      )}
    </div>
  </div>


</div>

          
         
   


<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>

       
     
      <div className="flex">
      
  <div className="w-2/3 mt-4 mr-2 items-end justify-between bg-white">
  <div className="w-full">
  <div className="flex">
  <div className="w-1/2"><h2 className="text-2xl font-bold mb-4 ml-10 p-2">Trasactions</h2></div>
  <div className="w-1/2"><h2 className="text-sm font-bold mb-4 ml-10 p-2 mt-2"><span className='text-green-500'>Today Sale : {totalSalesToday}</span> &nbsp;<span className='text-red-500'>Last Sale : {totalSalesLastWeek}</span></h2></div>
</div>
      
  </div>
 
  <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
           
           <ResponsiveContainer width="100%" height={400}>
            <LineChart
                 data={alignedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="todaySales" stroke="green" name="Today's Sales" />
                <Line type="monotone" dataKey="lastWeekSales" stroke="red" name="Last Week's Sales" />
            </LineChart>
        </ResponsiveContainer>
        </>
      )}
    </>

  </div>
  <div className="w-1/3 mt-4 items-end justify-between bg-white">
  <div className='mt-4'>
      
      <h2 className="text-2xl font-bold  ml-10 p-2">Payment by Tender</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        {todays_sales_amount!='' && lastweek_sales_amount!='' ? (
        
              <>
                  <SalesComparisonGraph today={todays_sales_amount} lastWeek={lastweek_sales_amount} /> 
              
              </>
        ):(
          <></>
        )}
      <div className="card">
      <div className="card-header">Today's Payment Detail</div>
      <div className="card-body">
        <ul>
          {todays_sales_amount && todays_sales_amount.map((item, index) => (
             <li className='text-primary' key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
              <strong> {item.payment_type} : {item.sales}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>

      </>
      )}
    </div>
    
  </div>
</div>



<div className="flex">
      
      <div className="w-1/2 mt-4 mr-2 items-end justify-between bg-white">
      <div className="w-full">
      <div className="flex">
      <div className="w-1/3"><h2 className="text-2xl font-bold mb-4 ml-10 p-2">Trasactions</h2></div>
      <div className="w-2/3"><h2 className="text-sm font-bold mb-4 ml-10 p-2 mt-2"><span className='text-green-500'>Today Sale : {totalSalesToday}</span> &nbsp;<span className='text-red-500'>Last Sale : {totalSalesLastWeek}</span></h2></div>
    </div>
          
      </div>
     
      <>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
       
 
       <table className="w-full divide-y divide-orange-400">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
       Date
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       Hour
      </th>
      
      
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Total Amount
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
    {todayData && todayData && todayData.map((category: any) => (
      (category.hour < 6 || category.payment_date == '0' || category.sales == '--') ? (
        <></>
      ) :(
      <tr key={category.hour} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
         <p className="text-sm text-black dark:text-white text-center">{category.payment_date}</p>
        </td>
     
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        {category.hour!=''?category.hour:'---'}
        </td>
       
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        <p className="text-sm text-black dark:text-white text-center item-center"> {category.sales!=''?category.sales:'---'}</p>
        </td>
       
        
       
         
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
                  <div className="text-sm text-black dark:text-white text-center item-center items-center">
                    <button className="hover:text-primary" onClick={() => toggleModal(category.hour,category.payment_date)}>
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
      )
    ))}
  </tbody>
</table>
     



              
            </>
          )}
        </>
    
      </div>


      <div className="w-1/2 items-end justify-between bg-white mt-4">
      <div className="w-full">
      <div className="flex">
      <div className="w-1/3"><h2 className="text-2xl font-bold mb-4 ml-10 p-2">Report</h2></div>
      <div className="w-2/3"><h2 className="text-sm font-bold mb-4 ml-10 p-2 mt-2"><span className='text-green-500'>Today Sale : {totalSalesToday}</span> &nbsp;<span className='text-red-500'>Last Sale : {totalSalesLastWeek}</span></h2></div>
    </div>
          
      </div>
    <div className="max-w-2xl mx-auto">
  <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
    <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
      <li className="mr-2" role="presentation">
        <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTab === 'today' ? 'active' : ''
        }`}  onClick={() => setActiveTab('today')}>
          Today
        </button>
     
      </li>
      <li className="mr-2" role="presentation">
        
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTab === 'week' ? 'active' : ''
        }`}  onClick={() => setActiveTab('week')}>
          Week
        </button>
      </li>
      <li className="mr-2" role="presentation">
        
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTab === 'month' ? 'active' : '' 
        }`}  onClick={() => setActiveTab('month')}>
          Month
        </button>
      </li>
      <li role="presentation">
        
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTab === 'lastthreemonth' ? 'active' : ''
        }`}  onClick={() => setActiveTab('lastthreemonth')}>
          Last Three Month
        </button>
      </li>
      <li role="presentation">
        
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTab === 'year' ? 'active' : ''
        }`}  onClick={() => setActiveTab('year')}>
          Year
        </button>
      </li>
    </ul>
  </div>
  
      <div className="tab-content">

       {/* Render loading spinner while data is being fetched */}
       {isLoading && <div>Loading...</div>}
    {/* Render error message if there was an error */}
    {error && <div>Error: {error}</div>}

   <SalesDataComponent reportSales={reportTabSale} />;
   
      </div>
    </div>
        
      </div>
    




    </div>



  










<div className="flex">
<div className="w-1/2 mt-4 mr-2 items-end justify-between bg-white">



      <div className="w-full">



      <div className="flex">
      <div className="w-1/2"><h6 className="text-sm font-bold  ml-10 p-2 pt-4">Low Stocks Products</h6></div>
      <div className="w-1/2 flex justify-end">
        <div className=' font-bold   p-2 pt-4 justify-end'>

        <div className="flex justify-center">
    <NavLink to="/lowstock" className="inline-flex items-center text-center font-medium text-primary hover:bg-opacity-90 sm-w-full ">
      <span className="text-sm">View All Low Stocks Products</span>
    </NavLink>
  </div>
  </div>
       

      </div>



    </div>
          
      </div>
     

      <>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
       
 
       <div className="relative p-6 flex-auto overflow-x-auto overflow-y-auto  scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
  <table className="w-full divide-y divide-orange-400 mt-2">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
      <p className='text-left'>Item Name</p>
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Stock
      </th>
      
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
      {/* Render loading spinner while data is being fetched */}
      {isLoading && <div>Loading...</div>}
    {/* Render error message if there was an error */}
    {error && <div>Error: {error}</div>}
    {/* Render the category data if it exists */}
    {lowstock && lowstock.items && lowstock.items.map((items: any) => (
     
      <tr key={items.id} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
         <p className="text-sm text-black dark:text-white text-left">{items.item_name}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        <p className="text-sm text-primary dark:text-white text-center item-center"> {items.stock!=''?items.stock:'---'}</p>
        </td>

        
         
      </tr>
     
    ))}
  </tbody>
</table>




     </div>

              
            </>
          )}
        </>
    
      </div>


























  





      <div className="w-1/2 mt-4 mr-2 items-end justify-between bg-white">
      <div className="w-full">



<div className="flex">
<div className="w-1/2"><h6 className="text-sm font-bold  ml-10 p-2 pt-4">To be Expired Product's</h6></div>
<div className="w-1/2 flex justify-end">
  <div className=' font-bold   p-2 pt-4  justify-end'>
  <div className="flex justify-center">
    <NavLink to="/expired-products" className="inline-flex items-center text-center font-medium text-primary hover:bg-opacity-90 sm-w-full ">
      <span className="text-sm">View All Expired Product's</span>
    </NavLink>
  </div>


</div>
 

</div>


</div>
    
</div>






<div className="w-full mx-auto">



<div className="border-b border-gray-200 dark:border-gray-700 mb-4">




  <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
    <li className="mr-2" role="presentation">
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTabExp === 'today' ? 'active' : ''
        }`}  
        onClick={() => setactiveTabExp('today')}
      >
        Tomorrow
      </button>
    </li>
    
    <li className="mr-2" role="presentation">
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTabExp === 'week' ? 'active' : ''
        }`}  
        onClick={() => setactiveTabExp('week')}
      >
        Next Week
      </button>
    </li>
    <li className="mr-2" role="presentation">
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTabExp === 'month' ? 'active' : '' 
        }`}  
        onClick={() => setactiveTabExp('month')}
      >
        Month
      </button>
    </li>
    <li role="presentation">
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTabExp === 'lastthreemonth' ? 'active' : ''
        }`}  
        onClick={() => setactiveTabExp('lastthreemonth')}
      >
        Three Month
      </button>
    </li>
    {/* <li role="presentation">
      <button 
        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
          activeTabExp === 'year' ? 'active' : ''
        }`}  
        onClick={() => setactiveTabExp('year')}
      >
        Year
      </button>
    </li> */}
  </ul>
</div>
<div className="tab-content pb-2">
  {isLoadingExp ? (
    <Loader/>
  ) : (
    <>
      {expired_product !== ''? (
         
   
   
   <div className="relative p-6 flex-auto overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
<table className="w-full divide-y divide-orange-400">
<thead className="bg-gray-50">
<tr>
  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
  <p className='text-left'>Item Name</p>
  </th>
  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
   Date
  </th>
  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
   Stock
  </th>
</tr>
</thead>

<tbody className="bg-white divide-y divide-gray-300">
  {/* Render loading spinner while data is being fetched */}
  {isLoadingExp && <div>Loading...</div>}
  {/* Render error message if there was an error */}
  {error && <div>Error: {error}</div>}
  {/* Render the category data if it exists and has items */}
  {expired_product && expired_product.items && expired_product.items.length > 0 ? (
    // If there are items, map over them and render each item in a table row
    expired_product.items.map((items: any) => (
      <tr key={items.id} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          <p className="text-sm text-black dark:text-white  text-left">{items.item_name}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          <p className="text-sm text-primary dark:text-white text-center item-center">{items.expire_date !== '' ? items.expire_date : '---'}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
          {items.stock !== '' ? items.stock : '---'}
        </td>
      </tr>
    ))
  ) : (
    // If there are no items, display "No records found"
    <tr>
      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
        No records found
      </td>
    </tr>
  )}
</tbody>

</table>

 </div>

     
      ) : (
        null
      )}
    </>
  )}
</div>
</div>



















     
      























      </div>
     
    </div>







    <>
      
      {isOpen && (
        <div className="fixed inset-y-0 right-0  flex justify-center items-end  newzindex overflow-y-auto">
        <div className="relative w-auto max-w-md mx-auto my-6">
            {/* Modal content */}
            <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Modal Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-semibold">Order List</h3>
                <button onClick={toggleModal} className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Modal Body */}
              <div className="relative p-6 flex-auto overflow-x-auto overflow-y-auto h-94 scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
  <table className="w-full divide-y divide-orange-400">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
       Order Number
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       Total Amount
      </th>
     
      
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Payment Mode
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Order Mode
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
        Time
      </th>
      <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
       Discount
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
      {/* Render loading spinner while data is being fetched */}
      {isLoading && <div>Loading...</div>}
    {/* Render error message if there was an error */}
    {error && <div>Error: {error}</div>}
    {/* Render the category data if it exists */}
    {single_payment_data && single_payment_data.hourlySales && single_payment_data.hourlySales.map((category: any) => (
      <tr key={category.id} className="whitespace-nowrap">
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
<p className="text-sm text-black dark:text-white">{category.sales_code}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <p className="text-sm text-black dark:text-white">{category.payment}</p>
                </td>
                
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
<p className="text-sm text-black dark:text-white">{category.payment_type}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
<p className="text-sm text-black dark:text-white">{category.order_type}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
<p className="text-sm text-black dark:text-white">{category.created_time}</p>
        </td>
        <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center">
        
        <p className="text-sm text-black dark:text-white">{category.tot_discount_to_all_amt}</p>
                </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
              {/* Modal Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button onClick={toggleModal} className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : ''}`} onClick={toggleModal}></div>
    </>




      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          {/* <TableOne /> */}
        </div>
        {/* <ChatCard /> */}
      </div>

      <div>
      



    </div>



    </DefaultLayout>






  







  );
};

export default ECommerce;
// function setDashboardData(dashboard_reports: any) {
//   throw new Error('Function not implemented.');
// }

