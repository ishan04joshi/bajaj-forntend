// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate JSON
      JSON.parse(input);

      // Call the API
      const result = await axios.post('https://bajaj-round1.vercel.app/bfhl', JSON.parse(input));
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or API error.');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_alphabet } = response;

    let dataToRender = [];
    if (selectedOptions.includes('Alphabets')) dataToRender = dataToRender.concat(alphabets);
    if (selectedOptions.includes('Numbers')) dataToRender = dataToRender.concat(numbers);
    if (selectedOptions.includes('Highest alphabet')) dataToRender = dataToRender.concat(highest_alphabet);

    return (
      <div className="response">
        <h3>Response:</h3>
        <pre>{JSON.stringify(dataToRender, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Call</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={input}
          onChange={handleChange}
          placeholder='Enter JSON here, e.g., { "data": ["A", "C", "z"] }'
          className="input-field"
        />
        <br />
        <button type="submit" className="submit-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {response && (
        <div>
          <label>Select what to show:</label>
          <select multiple={true} onChange={handleSelectChange} className="select-dropdown">
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
