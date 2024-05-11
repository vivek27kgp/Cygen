import React, { useState } from 'react';

interface SelectGroupOneProps {
  categoryType: string; // Define the type for categoryType prop
}

const Textarea: React.FC<SelectGroupOneProps> = ({ categoryType }) => {
  return (
    <>
    
<div className="w-full  mb-1">
<label className="mb-1.5 block text-black dark:text-white fotnlabel">
{categoryType}
</label>
<textarea
rows={6}
placeholder={categoryType}
className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
></textarea>
</div>
    </>
  );
};

export default Textarea;
