import React from 'react';
import { Label } from 'nhsuk-react-components';
import './App.css';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header />
      <div role="main" className="centered-text">
        <Label isPageHeading={true} size={'l'}>
          Hello and welcome to UEC Capacity Management
        </Label>
      </div>
    </div>
  );
}

export default App;
