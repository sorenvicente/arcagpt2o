import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sales from "./pages/Sales";
import Index from "./pages/admin/Index";
import Login from "./pages/auth/Login";
import AdminPage from "./pages/admin/Index";
import SystemSettings from "./pages/admin/Settings";
import ActionButtonsPage from "./pages/admin/ActionButtons";
import ApiKeys from "./pages/ApiKeys";

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/action-buttons" element={<ActionButtonsPage />} />
          <Route path="/api-keys" element={<ApiKeys />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;