import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sales from "./pages/Sales";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import AdminLayout from "./components/layouts/AdminLayout";
import SystemSettings from "./pages/admin/Settings";
import ActionButtonsPage from "./pages/admin/ActionButtons";
import ApiKeys from "./pages/ApiKeys";
import AdminIndex from "./pages/admin/Index";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Sales />} />
          <Route path="/app" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout><AdminIndex /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SystemSettings /></AdminLayout>} />
          <Route path="/admin/action-buttons" element={<AdminLayout><ActionButtonsPage /></AdminLayout>} />
          <Route path="/api-keys" element={<AdminLayout><ApiKeys /></AdminLayout>} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;