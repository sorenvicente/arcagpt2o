import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Sales from "./pages/Sales";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import ApiKeys from "./pages/ApiKeys";
import { Editor } from "./pages/Editor"; // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sales />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Index />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/api-keys" element={<ApiKeys />} />
        <Route path="/editor" element={<Editor />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
