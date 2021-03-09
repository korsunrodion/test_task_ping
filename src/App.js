import React, { useState } from 'react';
import Ping from './ping'
import './App.css';

// корректно работает для сайтов, у которых доступен favicon под стандартным именем /favicon.ico
function App() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState(' ')

  function handleChange(event) {
    setUrl(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let updUrl;
    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      updUrl = 'http://' + url;
    } else {
      updUrl = url;
    }

    if(/https?:\/\/.+\..+/.test(updUrl) === false) {
      setStatus('Wrong url')
      return;
    }

    setStatus('Checking..')

    var p = new Ping({multiplier: 0.3});
    p.ping(updUrl, (err, data) => {
      if (err) {
        setStatus("Were unable to ping server");
      } else {
        setStatus(`Took ${data} ms`);
      }
    })
  }

  return (
    <div className="App">
      <h1 className="header">Ping cheker</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Address:</label>
        <input type="text" value={url} onChange={handleChange} />
        <input type="submit" value="Check" />
      </form>
      <p className="status">{status}</p>
    </div>
  );
}

export default App;
