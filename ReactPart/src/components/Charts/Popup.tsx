import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
   
  ];
const options = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Grocery' },
    { value: 'orange', label: 'Atta' },
   
  ];
  const optionsBrand = [
    { value: 'apple', label: 'Lotus' },
    { value: 'banana', label: 'Ayers' },
    { value: 'orange', label: 'Mrchi' },
   
  ];
  const optionstAX = [
    { value: 'FREE', label: 'FREE' },
    { value: 'GST', label: 'GST' },
  ];
  const optionstSORTING = [
    { value: 'higher', label: 'Higher' },
    { value: 'lower', label: 'Lower' },
  ];
  const optionstStatus = [
    { value: 'higher', label: 'Active' },
    { value: 'lower', label: 'Inactive' },
  ];
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isVisible) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = ''; // Restore scrolling when the popup is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is restored when the component is unmounted
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <>
          <div className="overlay fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-500"></div>
          <div ref={popupRef} className="fixed inset-x-0 bottom-0  flex justify-center items-end  newzindex">
            <div className="bg-white p-6  shadow-lg animate__animated animate__bounceInUp w-full">
            <button onClick={onClose} className="absolute top-0 right-0 m-3 rounded-full bg-primary text-white hover:bg-primary-300 mt-6 mb-2 md:mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            <div className="w-full flex flex-col md:flex-row p-2 sm:p-0">
  <div className="flex gap-1 w-full md:w-1/2 p-2 md:p-1">
    <Select
      options={optionsProduct}
      isSearchable={true}
      placeholder="Select Product..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={options}
      isSearchable={true}
      placeholder="Select Category..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={optionsBrand}
      isSearchable={true}
      placeholder="Select Subcategory..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={optionsBrand}
      isSearchable={true}
      placeholder="Select Brand..."
      className="w-full"
    />
  </div>
</div>

<div className="w-full flex flex-col md:flex-row  p-2 sm:p-0">
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={optionstStatus}
      isSearchable={true}
      placeholder="Select Status..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={optionstSORTING}
      isSearchable={true}
      placeholder="Select Price..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
    <Select
      options={optionstSORTING}
      isSearchable={true}
      placeholder="Select Stock..."
      className="w-full"
    />
  </div>
  <div className="flex gap-1 w-full md:w-1/2  p-2 sm:p-1">
  <button className="w-full md:w-full flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10 md:ml-2 mt-2 md:mt-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search mr-2 md:mr-0 md:ml-2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <span className="text-sm hidden md:inline-block">Search</span>
  </button>
  
</div>

</div>

             
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Popup;
