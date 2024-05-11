import React, { useState } from 'react';

const ViewModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // State variable to track whether the modal is open

  const handleCloseModal = () => {
    setIsOpen(false); // Set the state to close the modal
  };

  return (
    <>
   
      
        <div className="modal-overlay">
          <div className="modal fixed  flex justify-center items-end newzindex overflow-y-auto ">
            <div className="modal-content">
              <h3 className="text-xl font-semibold">Stock Transfer</h3>
              <div className="p-6">Hi Modal here, Hi Modal Here</div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  onClick={handleCloseModal} // Call handleCloseModal function when the button is clicked
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default ViewModal;
