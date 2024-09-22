import React, { useState } from 'react';

  function ResponseDisplay({ data }) {
    const [filters, setFilters] = useState([]);

    const handleFilterChange = (e) => {
      const value = e.target.value;
      const checked = e.target.checked;
      
      setFilters(prev => 
        checked
          ? [...prev, value]
          : prev.filter(item => item !== value)
      );
    };

    const renderData = (key) => {
      if (!filters.includes(key)) return null;

      const value = Array.isArray(data[key]) 
        ? data[key].join(', ')
        : data[key];

      return (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      );
    }

    return (
      <div className="response">
        <h3>Filtered Response</h3>
        <div>
          <label>
            <input
              type="checkbox" 
              value="alphabets"
              checked={filters.includes('alphabets')}
              onChange={handleFilterChange}
            /> Alphabets
          </label>
          <label>
            <input 
              type="checkbox"
              value="numbers"
              checked={filters.includes('numbers')}
              onChange={handleFilterChange} 
            /> Numbers  
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet" 
              checked={filters.includes('highest_lowercase_alphabet')}
              onChange={handleFilterChange}
            /> Highest lowercase alphabet
          </label>
        </div>
        {renderData('alphabets')}
        {renderData('numbers')}  
        {renderData('highest_lowercase_alphabet')}
      </div>
    );
  }

  export default ResponseDisplay;