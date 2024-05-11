import React from 'react';

interface CustomNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const CustomNavigation: React.FC<CustomNavigationProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
}) => {
  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className="custom-navigation">
      {currentStep > 0 && (
        <button className="custom-button" onClick={handlePrev}>
          Previous
        </button>
      )}
      {currentStep < totalSteps - 1 && (
        <button className="custom-button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default CustomNavigation;
