import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddOrganisationPage from './pages/organisations/add';
import OrganisationsPage from './pages/organisations';

function App() {
  return (
    <>
        <Header />
        <div role="main">
          <Routes>
              <Route path="/organisations/add" element={<AddOrganisationPage/>} />
              <Route path="*" element={<OrganisationsPage />} />
          </Routes>
        </div>
    </>
  );
}

export default App;

