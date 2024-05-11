import React from 'react';

interface ConfirmButtonsProps {
  handleConfirm: () => void;
  closeToast: () => void;
}

const ConfirmButtons: React.FC<ConfirmButtonsProps> = ({ handleConfirm, closeToast }) => {
  return (
    <div>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={closeToast}>No</button>
    </div>
  );
};

export default ConfirmButtons;
