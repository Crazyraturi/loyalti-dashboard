import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Pages
import LoyaltyDashboard from "./LoyaltyDashboard";
import UserManagement from "./UserManagementDashboard";
import Home from "./Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userManagement" element={<UserManagement/>} />
        <Route path="/loyalty" element={<LoyaltyDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
