import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AdminPage from "@/pages/admin/Index";
import ApiKeysPage from "@/pages/ApiKeys";
import LoginPage from "@/pages/auth/Login";
import { useAuth } from "@/hooks/useAuth";

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'admin' | 'user' }) {
  const { isLoading } = useAuth(role);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/api-keys" 
          element={
            <ProtectedRoute role="admin">
              <ApiKeysPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;