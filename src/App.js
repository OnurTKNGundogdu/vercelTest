import React, { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch('https://nodejsappdeploytest.onrender.com/jokes'); // GET by default
      const data = await res.json();
      setResponse(data.jokes.join('\n\n'));
    } catch (err) {
      setResponse('⚠️ Error fetching from API');
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='container'>
      <h1 className='title'>React API Demo</h1>

      <button className='call-button' onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Call API'}
      </button>

      <div className={`result-box ${response ? 'show' : ''}`}>
        <p>{response || 'Click the button to get response.'}</p>
        {response && (
          <button className='copy-button' onClick={handleCopy}>
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
