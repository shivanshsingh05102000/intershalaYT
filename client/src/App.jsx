// client/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import UploadVideoPage from "./pages/UploadVideoPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Login/Register are full-bleed auth screens — no header/sidebar by design */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Everything else shares the Layout (Header + Sidebar) so search and the
          hamburger menu work the same way on every page, not just Home. */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPlayerPage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadVideoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload/:id"
          element={
            <ProtectedRoute>
              <UploadVideoPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
