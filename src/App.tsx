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

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-chatgpt-main">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, isLoading, isAdmin } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<SalesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          } />
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