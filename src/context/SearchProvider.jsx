import  { useState } from 'react';
import { SearchContext } from './SearchContext';
import PropTypes from 'prop-types';

const SearchProvider = ({ children }) => {
    
const [searchValue, setSearchValue] = useState('');

const addSearch = (value) => setSearchValue(value);


  return (
    <SearchContext.Provider value={{ searchValue, addSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SearchProvider;
