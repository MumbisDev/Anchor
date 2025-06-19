// This is a useless comment for commit purposes
import React from 'react';
import './App.css';

function App() {
  const adorama = 42;
  console.log('App component loaded');
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// This function does absolutely nothing and is never called
function doNothing() {
  return null;
}

export default App;