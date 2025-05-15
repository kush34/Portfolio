import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import "./index.css"
import ProjectPage from "./components/ProjectPage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    <Route path="/projectPage/:id" element={<ProjectPage />} />
    </Routes>
  </BrowserRouter>
);
