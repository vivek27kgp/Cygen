import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <div className="group inline-block">
        {children}
        <div className="hidden group-hover:block absolute bg-gray-800 text-black text-xs py-5 px-5 rounded-lg shadow-md">
          {text}
          <svg
            className="absolute text-gray-800 h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
