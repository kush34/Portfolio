import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import "./index.css"
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import BlogPage from "./pages/BlogPage.js";
import Layout from "./layout/main.js";
import { HelmetProvider } from 'react-helmet-async'

const rootElement = document.getElementById("root")!;

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app); // react-snap prerendered
} else {
  ReactDOM.createRoot(rootElement).render(app); // normal dev/fallback
} 
