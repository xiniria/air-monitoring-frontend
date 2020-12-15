import React from 'react';
import Adapter from  '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';

configure({adapter: new Adapter()});

test('renders correctly address input', () => {
  const addressInput = shallow(<AddressAutocomplete />).find(AddressAutocomplete);
  expect(addressInput).toMatchSnapshot();
});

test('displays input', () => {
  const wrapper = shallow(<AddressAutocomplete />);
  expect(wrapper.find('input')).toHaveLength(1);
});

test('calls handleInput on change to set to the new value', () => {
  const wrapper = shallow(<AddressAutocomplete />);
  wrapper
    .find('input')
    .simulate('change', { currentTarget: { value: '1 rue Joliot Curie' } });
  expect(wrapper.find('input').props().value).toContain('1 rue Joliot Curie');
});
