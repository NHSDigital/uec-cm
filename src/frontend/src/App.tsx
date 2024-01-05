import React from 'react';
import './App.css';
import Header from './components/header';

function App() {
  return (
    // @ts-ignore
    <div>
      <Header />
      <div className="centered-text">
          <h3>Hello and welcome to UEC Capacity Management</h3>
      </div>
    </div>
  );
}

export default App;