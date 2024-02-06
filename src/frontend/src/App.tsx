import React from 'react';
import Header from './components/header';
import OrganisationsPage from './pages/organisations';

function App() {
  return (
    <>
        <Header />
        <div role="main">
          <OrganisationsPage />
        </div>
    </>
  );
}

export default App;
