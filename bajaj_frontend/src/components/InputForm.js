import React, { useState } from 'react';
import { processData } from '../api/apiService';
import ResponseDisplay from './ResponseDisplay';

function InputForm() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      JSON.parse(input); // Validate JSON
      const res = await processData(input);
      setResponse(res);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && <ResponseDisplay data={response} />}
    </div>
  );
}

export default InputForm;