import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toast";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import AdminPage from "@/pages/admin/Index";
import DashboardPage from "@/pages/admin/Dashboard";
import ApiKeysPage from "@/pages/ApiKeys";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/api-keys" element={<ApiKeysPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
