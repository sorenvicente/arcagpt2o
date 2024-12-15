import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AdminPage from "@/pages/admin/Index";
import ApiKeysPage from "@/pages/ApiKeys";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'admin@example.com') {
        setIsAdmin(true);
      }
      setIsLoading(false);
    };
    
    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user?.email === 'admin@example.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/api-keys" 
          element={isAdmin ? <ApiKeysPage /> : <Navigate to="/" replace />} 
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;