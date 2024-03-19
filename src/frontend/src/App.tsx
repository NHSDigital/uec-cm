import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddOrganisationPage from './pages/organisations/add';
import OrganisationsPage from './pages/organisations';
import TestPage from './pages/test';
import SearchOrganisationPage from './pages/organisations/search';
import './styles/global.css';

function App() {
  return (
    <>
        <Header />
        <div role="main">
          <Routes>
              <Route path="/organisations/search" element={<SearchOrganisationPage />} />
              <Route path="/organisations/add" element={<AddOrganisationPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="*" element={<OrganisationsPage />} />
          </Routes>
        </div>
    </>
  );
}

export default App;

