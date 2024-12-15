import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AdminPage from "@/pages/admin/Index";
import ApiKeysPage from "@/pages/ApiKeys";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/api-keys" element={<ApiKeysPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;