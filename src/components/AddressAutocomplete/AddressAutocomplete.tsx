import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import './AddressAutocomplete.css';

const AddressAutocomplete = (): JSX.Element => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.currentTarget.value);
  };

  const handleSelect = ({ description }: Suggestion) => async () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    try {
      const results = await getGeocode({ address: description });
      const coords = await getLatLng(results[0]);
      console.log('📍 Coordinates: ', coords);
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={id ? +index : index} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Choisissez un endroit..."
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default AddressAutocomplete;
