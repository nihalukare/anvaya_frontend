import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Home from "./pages/Home";
import AddLead from "./pages/AddLead";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import SalesAgentManagement from "./pages/SalesAgentManagement";
import Reports from "./pages/Reports";
import LeadsByStatus from "./pages/LeadsByStatus";
import LeadsBySalesAgent from "./pages/LeadsBySalesAgent";

import { FormProvider } from "./context/FormContext";
import { FiltersProvider } from "./context/FiltersContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FiltersProvider>
                <Home />
              </FiltersProvider>
            }
          />
          <Route
            path="/addLead"
            element={
              <FormProvider>
                <AddLead />
              </FormProvider>
            }
          />
          <Route
            path="/leadManagement/:leadId"
            element={
              <FormProvider>
                <LeadManagement />
              </FormProvider>
            }
          />
          <Route
            path="/leadList"
            element={
              <FiltersProvider>
                <LeadList />
              </FiltersProvider>
            }
          />
          <Route
            path="/salesAgentManagement"
            element={<SalesAgentManagement />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/leadsByStatus"
            element={
              <FiltersProvider>
                <LeadsByStatus />
              </FiltersProvider>
            }
          />
          <Route
            path="/leadsBySalesAgent"
            element={
              <FiltersProvider>
                <LeadsBySalesAgent />
              </FiltersProvider>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
export default App;
