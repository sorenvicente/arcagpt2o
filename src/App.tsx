import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/auth/Login";
import AdminPage from "@/pages/admin/Index";
import DashboardPage from "@/pages/admin/Dashboard";
import ApiKeysPage from "@/pages/ApiKeys";
import SystemSettingsPage from "@/pages/admin/Settings";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/settings" element={<SystemSettingsPage />} />
          <Route path="/api-keys" element={<ApiKeysPage />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;