import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AddressAutocomplete = ({ onAddressChange }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Latitude and Longitude:', latLng);
    } catch (error) {
      console.error('Error:', error);
    }
    onAddressChange(selectedAddress);
  };

  return (
    <div>
      <label htmlFor="address" className="block mb-1.5 text-black dark:text-white fotnlabel">
        Address
      </label>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              id="address"
              {...getInputProps({
                placeholder: 'Search your address from Google',
                className: 'block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500',
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#e2e8f0' : '#ffffff',
                  cursor: 'pointer',
                  padding: '0.5rem',
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AddressAutocomplete;
