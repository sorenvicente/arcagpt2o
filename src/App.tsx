import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SalesPage from "@/pages/Sales";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/auth/Login";
import AdminPage from "@/pages/admin/Index";
import DashboardPage from "@/pages/admin/Dashboard";
import ApiKeysPage from "@/pages/ApiKeys";
import SystemSettingsPage from "@/pages/admin/Settings";
import { useAuth } from "@/hooks/useAuth";

// Create a client
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

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
          <Route path="/app" element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          } />
          
          {/* Rotas administrativas (protegidas) */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requireAdmin>
              <SystemSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/api-keys" element={
            <ProtectedRoute requireAdmin>
              <ApiKeysPage />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;