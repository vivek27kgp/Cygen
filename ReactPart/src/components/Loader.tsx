// AboutUsPage2.tsx

import React from 'react';
const Loader: React.FC = () => {
  return (
    <>
     <div className="border bg-gray-200 shadow rounded-md p-4 mt-10 max-w-sm  mx-auto w-full">
         <div className=" flex space-x-4 animate-pulse ">
           <div className="rounded-full  bg-slate-500 h-10 w-10"></div>
           <div className="flex-1 space-y-6 py-1">
             <div className="h-2 bg-slate-600 rounded"></div>
             <div className="space-y-3">
               <div className="grid grid-cols-3 gap-4">
                 <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                 <div className="h-2 bg-slate-600 rounded col-span-1"></div>
               </div>
               <div className="h-2 bg-slate-600 rounded"></div>
             </div>
           </div>
         </div>
       </div>
    </>
  );
};

export default Loader;
