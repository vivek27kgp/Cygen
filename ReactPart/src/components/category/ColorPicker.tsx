import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleColorChange = (color) => {
    onChange(color.hex);
  };

  return (
    <div>
      <div
        onClick={() => setDisplayColorPicker(!displayColorPicker)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: color,
          cursor: 'pointer',
        }}
      ></div>
      {displayColorPicker && (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={() => setDisplayColorPicker(false)}
          />
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
