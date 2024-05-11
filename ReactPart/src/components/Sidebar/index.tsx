import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/Cygen.png';
import smallogo from '../../images/favicon.svg';
import { MdOutlineInventory2 } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TfiGallery } from "react-icons/tfi";
import { AiOutlineStock } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoStorefrontOutline } from "react-icons/io5";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFolderSimpleUser } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { CiMenuKebab } from "react-icons/ci";
import { BiPurchaseTag } from "react-icons/bi";
import { IoCubeOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosReturnLeft } from "react-icons/io";
import { RiGalleryLine } from "react-icons/ri";
import { RiGalleryUploadLine } from "react-icons/ri";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { PiStorefront } from "react-icons/pi";
import { CgUserList } from "react-icons/cg";
import { CgUserAdd } from "react-icons/cg";
import { GiNuclearWaste } from "react-icons/gi";
import { GoImage } from "react-icons/go";
import { PiCubeTransparentThin } from "react-icons/pi";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
   let mini:boolean = true ;
  function toggleSidebar(): void {
    if (mini) {
      console.log("opening sidebar");
      const sidebar = document.getElementById("mySidebar");
      // const main = document.getElementById("main");
      if (sidebar) {
        sidebar.style.width = "290px";
     //   main.style.marginLeft = "150px";
        
      }
      mini = false;
    } else {
      console.log("closing sidebar");
      const sidebar = document.getElementById("mySidebar");
     // const main = document.getElementById("main");
      if (sidebar) {
        sidebar.style.width = "80px";
      //  main.style.marginLeft = "80px";
      }
      mini = true;
    }
  }


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const [openbar, setOpenbar] = useState(true);
  useEffect(() => {
    const typeDataAll = localStorage.getItem('typeData');
    if (typeDataAll !== null) {
      // Parse the retrieved value to a boolean
      const typeDataBool = JSON.parse(typeDataAll);
      setOpenbar(!!typeDataBool); // Convert to boolean using double negation
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  function setExpandCollsapse(type: any) {
    const typeData = type === 1 ? false : true;
    localStorage.setItem('typeData', JSON.stringify(typeData));
    setOpenbar(typeData);
  }
  const handleMouseOver = () => {
    const typeDataAll :any= localStorage.getItem('typeData');
  //  console.log("data===========>"+typeDataAll);
    if(typeDataAll){
      console.log('Mouse left navbar');
      setOpenbar(typeDataAll);
    }
  };
  // Function to be called when mouse leaves the navbar
  const handleMouseOut = () => {
    //setOpenbar(false);
    const typeDataAll :any= localStorage.getItem('typeData');
    console.log("data===========>"+typeDataAll);
    if (typeDataAll === 'false') {
      console.log('Mouse left navbar');
      setOpenbar(false);
    }

  };
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0   ${openbar?'w-65':'w-20'}` }
    >
      {/* <!-- SIDEBAR HEADER -->  {` ${openbar?'':'hidden smleft-10'} */}
      <div className="flex items-center justify-between gap-2 logodiv ">
        {/* <NavLink to="/dashboard">
          <img src={openbar?Logo:smallogo} alt="Logo" />
        </NavLink> */}
 <div className='py-3 flex justify-end'>
      <div
        className={`  ${openbar?'':'ml-2 '} mt-4 w-10 h-10 flex justify-center items-center rounded-full bg-white`}
        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
       { (openbar ? (
  <HiMenuAlt2
    size={26}
    className='cursor-pointer'
    onClick={() => setExpandCollsapse(1)}
  />
) : (
  <CiMenuKebab
    size={26}
    className='cursor-pointer'
    onClick={() => setExpandCollsapse(2)}
  />
))}
      </div>
    </div>
            
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear" onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}>
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 " >
          {/* <!-- Menu Group --> */}
          <div>
           
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
             
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} ml--4 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : handleClick();
                        }}
                      >
                        <MdOutlineInventory2 size={24}/>
                        Inventory
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/Productlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`feather feather-box ${openbar ? '' : 'feather-boxcolorcls'}`} ><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> {!openbar?'':'Products'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/addproduct"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`feather feather-plus-square ${openbar ? '' : 'feather-boxcolorcls'}`} ><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> {!openbar?'':'Create Product'}
                            </NavLink>
                          </li>


                          <li>
                            <NavLink
                              to="/expired-products"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-codesandbox ${openbar ? '' : 'feather-boxcolorcls'}`} ><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>{!openbar?'':'Expired Products'}
                            </NavLink>
                          </li>



                          <li>
                            <NavLink
                              to="/lowstock"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-trending-down ${openbar ? '' : 'feather-boxcolorcls'}`}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>{!openbar?'':'Low Stocks'}
                            </NavLink>
                          </li>


                          <li>
                            <NavLink
                              to="/categorylist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-codepen ${openbar ? '' : 'feather-boxcolorcls'}`}><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg> {!openbar?'':'Category'}
                            </NavLink>
                          </li>





                         
                          <li>
                            <NavLink
                              to="/subcategorylist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-speaker ${openbar ? '' : 'feather-boxcolorcls'}`}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg> {!openbar?'':'Sub Category'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/brandview"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-tag ${openbar ? '' : 'feather-boxcolorcls'}`}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> {!openbar?'':'Brands'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/unitlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-speaker ${openbar ? '' : 'feather-boxcolorcls'}`}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg> {!openbar?'':'Units'}
                            </NavLink>
                          </li>
                       


                          <li>
                            <NavLink
                              to="/taxlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"   className={`feather feather-layers ${openbar ? '' : 'feather-boxcolorcls'}`}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>{!openbar?'':'Tax List'}
                            </NavLink>
                          </li>
                          
{/*  

                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> Coupon
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-justify"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg> Print Barcode
                            </NavLink>
                          </li>


                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg> Print QR Code
                            </NavLink>
                          </li> */}




                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}


                
             


 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : handleClick()
                        }}
                      >
                       <LiaFileInvoiceDollarSolid size={24} />
                        Sales
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/saleslist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-shopping-cart ${openbar ? '' : 'feather-boxcolorcls'}`}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> {!openbar?'':' Sales'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/saleslist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-layers ${openbar ? '' : 'feather-boxcolorcls'}`}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>{!openbar?'':'Online Sales'}
                            </NavLink>
                          </li>


                          <li>
                            <NavLink
                              to="/returnlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className={`feather feather-copy ${openbar ? '' : 'feather-boxcolorcls'}`}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>{!openbar?'':'Sales Return'}
                            </NavLink>
                          </li>
{/*                           
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>Quotation
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hard-drive"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>POS
                            </NavLink>
                          </li> */}


                       




                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}
                
            

 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : handleClick()
                        }}
                      >
                        <PiCubeTransparentThin  size={26}/>
                        Stock intake
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/purchaselist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <IoCubeOutline size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></IoCubeOutline> {!openbar?'':'Stock Intake'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/addpurchase"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <CiSquarePlus size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></CiSquarePlus> {!openbar?'':'Add Stock Intake'} 
                            </NavLink>
                          </li>
                          
                          {/* <li>
                            <NavLink
                              to="/purchaselists"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <GiNuclearWaste size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} /> {!openbar?'':'Purchase Return'}
                            </NavLink>
                          </li>
                           */}
                          
                          <li>
                            <NavLink
                              to="/addstock"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <GiNuclearWaste size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} /> {!openbar?'':'Stock Transfer'}
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}
                




 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/bannerlist' || pathname.includes('bannerlist')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/bannerlist' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : handleClick()
                        }}
                      >
                        <GoImage size={26}/>
                        Banner List
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/bannerlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <RiGalleryLine size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></RiGalleryLine> {!openbar?'':'Banner List'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/addbanner"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <RiGalleryUploadLine size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></RiGalleryUploadLine>{!openbar?'':'Add Banner '}
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}
                



 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/storelist' || pathname.includes('storelist')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/storelist' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IoStorefrontOutline size={26}/>
                        Store List
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/storelist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <HiOutlineBuildingStorefront/> {!openbar?'':'Store List'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/addstore"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                            <PiStorefront size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} />{!openbar?'':'Add Store '}
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}







 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/userlist' || pathname.includes('userlist')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/userlist' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                      <LiaUsersCogSolid size={28}/>
                        User's List
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/userlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <FaUsersViewfinder size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></FaUsersViewfinder> {!openbar?'':'Users List'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/adduser"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <FiUserPlus size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></FiUserPlus>{!openbar?'':'Add User '}
                            </NavLink>
                          </li> 
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}





 {/* <!-- Menu Item Forms --> */}
 <SidebarLinkGroup
                activeCondition={
                  pathname === '/supplietlist' || pathname.includes('supplietlist')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={` ${openbar?'':'hidden smleft-10'}  group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                          (pathname === '/supplietlist' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                       <PiFolderSimpleUser size={28}/>
                        Supplier List
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && openbar && 'hidden'
                        }`}
                      >
                        <ul className={` ${openbar?'':'smleft-100'} mt-4 mb-5.5 flex flex-col gap-2.5 pl-6`}>
                          <li>
                            <NavLink
                              to="/supplietlist"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           
                           <CgUserList size={28} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></CgUserList>
                           
                           {!openbar?'':'Supplier List'}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/addsupplier"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                           <CgUserAdd size={28} className={`${openbar ? '' : 'sidebaricon-hover'}`} ></CgUserAdd>{!openbar?'':'Add Supplier'} 
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}







              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={` ${openbar?'':'ml-2'} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium sidebarbg duration-300 ease-in-out hover:bghovermenu dark:hover:bg-meta-4 ${
                    pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <SlSettings size={26} className={`${openbar ? '' : 'sidebaricon-hover'}`}></SlSettings>
                  {!openbar?'':'Settings'}
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
         
         
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
	  
    </aside>
  );
};

export default Sidebar;
