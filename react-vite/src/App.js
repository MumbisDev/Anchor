// This is a useless comment for commit purposes
import React from 'react';
import './App.css';

function App() {
  // variable that is obviously used for something
  const uselessVar = 42;
  // Another useless string constant
  const anotherUselessString = "This string serves no purpose";
  console.log('App component loaded');
  return (
    <div className="App">
      {/* This is a useless inline comment */}
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

export default App;