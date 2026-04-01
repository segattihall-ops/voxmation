import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import VsHubspotPage from "./pages/VsHubspotPage";
import VsSalesforcePage from "./pages/VsSalesforcePage";
import VsZohoPage from "./pages/VsZohoPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./dashboard/pages/LoginPage";
import RegisterPage from "./dashboard/pages/RegisterPage";
import DashboardLayout from "./dashboard/components/DashboardLayout";
import ProtectedRoute from "./dashboard/components/ProtectedRoute";
import DashboardPage from "./dashboard/pages/DashboardPage";
import AccountsPage from "./dashboard/pages/crm/AccountsPage";
import ContactsPage from "./dashboard/pages/crm/ContactsPage";
import LeadsPage from "./dashboard/pages/crm/LeadsPage";
import OpportunitiesPage from "./dashboard/pages/crm/OpportunitiesPage";
import PlansPage from "./dashboard/pages/billing/PlansPage";
import InvoicesPage from "./dashboard/pages/billing/InvoicesPage";
import CatalogsPage from "./dashboard/pages/delivery/CatalogsPage";
import InstancesPage from "./dashboard/pages/delivery/InstancesPage";
import CallLogsPage from "./dashboard/pages/voice/CallLogsPage";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="crm/accounts" element={<AccountsPage />} />
          <Route path="crm/contacts" element={<ContactsPage />} />
          <Route path="crm/leads" element={<LeadsPage />} />
          <Route path="crm/opportunities" element={<OpportunitiesPage />} />
          <Route path="billing/plans" element={<PlansPage />} />
          <Route path="billing/invoices" element={<InvoicesPage />} />
          <Route path="delivery/catalogs" element={<CatalogsPage />} />
          <Route path="delivery/instances" element={<InstancesPage />} />
          <Route path="voice/calls" element={<CallLogsPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="vs-hubspot" element={<VsHubspotPage />} />
          <Route path="vs-salesforce" element={<VsSalesforcePage />} />
          <Route path="vs-zoho" element={<VsZohoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
