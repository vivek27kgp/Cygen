
import React, { useState } from 'react';
import productimg from '../../images/product/oil.jpg';
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import Popup from '../Charts/Popup';
import Categoryformpage from './CollapsibleContactForm';
const Categorypage: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

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
  let status='Paid';
  return (
    <>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
      <div className="flex justify-end items-center flex-wrap">

</div>
<Categoryformpage></Categoryformpage>

</div>

      </div>
    </div>

    <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    
    </>
    
  );
};

export default Categorypage;
