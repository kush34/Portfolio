import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

import "./index.css";

const App = lazy(() => import("./App.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const BlogPage = lazy(() => import("./pages/BlogPage.js"));
const Layout = lazy(() => import("./layout/main.js"));

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}