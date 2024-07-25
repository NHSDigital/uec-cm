import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import AddOrganisationPage from "./pages/organisations/add";
import OrganisationsPage from "./pages/organisations";
import TestPage from "./pages/test";
import SearchOrganisationPage from "./pages/organisations/search";
import ViewOrganisationPage from "./pages/organisations/view";
import Footer from "./components/footer";
import buildConfig from "./buildconfig.json";
import "./styles/global.css";
import PrototypePage from "./prototype";
import HospitalList from "./prototype/hospitalList";
import HospitalUnits from "./prototype/hospitalUnits";
import HospitalDetail from "./prototype/hospitalDetail";
import HospitalQuestionnaire from "./prototype/hospitalQuestionnaire";
import QuestionnaireSummary from "./prototype/questionnaireSummary";
import AdminLandingPage from "./prototype/admin";
import ManageAccountSearch from "./prototype/admin/manageAccountSearch";
import SearchResult from "./prototype/admin/searchResult";
import AccountPermissions from "./prototype/admin/accountPermissions";

function App() {
  const { buildDate, commitHash } = buildConfig;

  return (
    <>
      <Header />
      <div role="main">
        <Routes>
          <Route path="/prototype" element={<PrototypePage />} />
          <Route path="/prototype/hospitalList" element={<HospitalList />} />
          <Route
            path="/prototype/hospitalUnits/:id"
            element={<HospitalUnits />}
          />
          <Route
            path="/prototype/hospitalDetail/:id"
            element={<HospitalDetail />}
          />
          <Route
            path="/prototype/questionnaireSummary/:id"
            element={<QuestionnaireSummary />}
          />
          <Route
            path="/prototype/hospitalQuestionnaire/:id"
            element={<HospitalQuestionnaire />}
          />
          <Route path="/prototype/admin" element={<AdminLandingPage />} />
          <Route
            path="/prototype/admin/manageAccountSearch"
            element={<ManageAccountSearch />}
          />
          <Route
            path="/prototype/admin/searchResult"
            element={<SearchResult />}
          />
          <Route
            path="/prototype/admin/accountPermissions/:id"
            element={<AccountPermissions />}
          />

          <Route
            path="/organisations/search"
            element={<SearchOrganisationPage />}
          />
          <Route path="/organisations/add" element={<AddOrganisationPage />} />
          <Route
            path="/organisations/view/:id"
            element={<ViewOrganisationPage />}
          />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<OrganisationsPage />} />
        </Routes>
      </div>
      <div className="app-footer">
        <Footer buildDate={buildDate} commitHash={commitHash.substring(0, 7)} />
      </div>
    </>
  );
}

export default App;
