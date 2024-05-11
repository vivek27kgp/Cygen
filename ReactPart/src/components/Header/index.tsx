import { Link, NavLink } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useEffect, useState } from 'react';
import fetchData from '../fetchData';
import Logo from '../../images/logo/Cygen.png';
import smallogo from '../../images/favicon.svg';
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [storeData, setStoreData] = useState<any>(null);
  const [storeSelectSingle, setStoreSelectSingle] = useState<string | undefined>(undefined); // Updated type to string | undefined

  useEffect(() => {
    const outlet_id = localStorage.getItem('outlet_id');
    fetchData(
      '/getAllStoresOptions/' + outlet_id,
      setStoreData,
      () => {}, // Empty function for error handling
      () => {}  // Empty function for loading state management
    );
  }, []);

  useEffect(() => {
    const storedStoreId:any = localStorage.getItem('selectedStore');
    setStoreSelectSingle(storedStoreId);
  }, []);

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStoreId = e.target.value;
    localStorage.setItem('selectedStore', selectedStoreId);
    setStoreSelectSingle(selectedStoreId);

    // Reload the current page
    window.location.reload();
  };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link> */}
        </div>

        <div className="logodiv hidden sm:block">
        <NavLink to="/dashboard">
<img src={Logo} alt="Logo" />
</NavLink>

        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
        
          <ul className="flex items-center gap-2 2xsm:gap-4">

     <div>
       
     <select
  id="countries"

  onChange={handleStoreChange}
  value={storeSelectSingle}
  className="bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-slate-900 bg-opacity-20 w-fit py-1 px-3 border border-gray-300 text-sm rounded-lg focus:outline-none"
>
  <option className="text-gray-700 dark:text-gray-300 hover:bg-green-300" value="0">All Store</option>
  
  {storeData &&
    storeData.list &&
    storeData.list.map((storeData: any) => (
      <option
        selected={storeSelectSingle === storeData.id ? true : false}
        className="text-gray-700 dark:text-gray-300 hover:bg-green-300"
        key={storeData.id}
        value={storeData.id}
      >
        {storeData.store_name}  {/* Displaying store name and storeSelectSingle */}
      </option>
    ))
  }
</select>

</div>



            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
