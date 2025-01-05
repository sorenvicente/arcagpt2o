import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SalesPage from "@/pages/Sales";
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
          {/* Página inicial (Sales) como rota principal */}
          <Route path="/" element={<SalesPage />} />
          
          {/* Página de login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Interface principal para todos os usuários */}
          <Route path="/app" element={<IndexPage />} />
          
          {/* Rotas administrativas (protegidas) */}
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