import React, { useEffect, useState } from 'react';
import fetchData from '../fetchData';

interface ModalProps {
  selectedData: any;
  closeModal: (selectedCategory: any, categoryId: string,type:string) => void; // Modify closeModal to accept category ID
}

const ModalBrand: React.FC<ModalProps> = ({ selectedData, closeModal }) => {
  const [error, setError] = useState<string | null>(null);
  const outlet_id = localStorage.getItem('outlet_id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category_name, setCategory_name] = useState<string>(''); // State to store the selected option value

  const handleChange_category = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value; // Get the selected category ID
    //console.log("Selected Category ID:",JSON.stringify(categoryData.list));

    const selectedCategory = categoryData.list.find((category: any) => category.id === parseInt(selectedCategoryId));

   // console.log("Selected Category:", selectedCategory);
    setCategory_name(selectedCategory?.id || ''); // Update the selected option when it changes
     closeModal(selectedCategory, selectedCategoryId,'3'); // Pass selected category data and ID to closeModal
     setIsModalOpen(false); // Close the modal
    };

  useEffect(() => {
    fetchData('/getAllBrandsOptions/' + outlet_id, setCategoryData, setError, setIsLoading);
  }, []);

  //console.log("Category Data:", categoryData);

  return (
  <>
     
    <>
      <div className="overlay fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-500"></div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center items-end z-999999">
        {/* Modal content */}
        <div className="bg-white p-8 rounded-lg relative" style={{ width: '500px', height: '300px' }}>
          {/* Modal header */}
          <div className="flex justify-right items-right mb-4">
            <button
              className="text-primary hover:text-gray-700 absolute top-0 right-0 w-5 h-5 rounded-full"
              onClick={() => closeModal(selectedData, category_name,'3')} // Pass selected category data and ID when closing
            >
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M11.414 10l4.293-4.293a1 1 0 10-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 101.414-1.414L11.414 10z" />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="w-full mb-1">
            <label className="mb-1.5 block text-black dark:text-white fotnlabel">Supplier</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input fotnlabel"></div>
            {isLoading && <div>Loading...</div>}
            <select
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                isOptionSelected ? 'text-black dark:text-white fotnlabel' : ''
              }`}
              value={category_name}
              onChange={handleChange_category}
            >
              {categoryData &&
                categoryData.list &&
                categoryData.list.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.brand_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* Modal overlay */}
        <div className="fixed inset-0 bg-black opacity-0 transition-opacity" onClick={() => closeModal(selectedData, category_name,'3')}></div>
      </div>
     
    </>
   

</>
  );
};

export default ModalBrand;
