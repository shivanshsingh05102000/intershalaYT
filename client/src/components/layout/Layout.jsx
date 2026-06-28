// components/layout/Layout.jsx
// Shared chrome for every "main app" page (Home, VideoPlayer, Channel, Upload, 404).
// Previously each page rendered its own <Header /> with different (often missing)
// props, so the search bar and hamburger menu silently did nothing outside the
// Home page. This component owns sidebar state and search routing ONCE, so every
// page that uses it gets a working header/sidebar for free.
//
// Login/Register intentionally do NOT use this layout — they're full-bleed auth
// screens by design (see App.jsx route tree).

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fires on every keystroke in the header search box (Header debounces nothing
  // itself — HomePage debounces the actual API call). This just keeps the URL in
  // sync so search works from ANY page: typing while on a video page takes you to
  // the filtered home grid, same as a real site search would.
  const handleSearch = (query) => {
    // Only carry over existing query params if we're already on "/" — otherwise
    // start fresh (no point keeping a stale category from a page we're leaving).
    const params = new URLSearchParams(location.pathname === "/" ? location.search : "");
    if (query) params.set("search", query);
    else params.delete("search");
    params.delete("category"); // a fresh search overrides any active category filter

    // replace: true — avoids pushing a new history entry on every single
    // keystroke, which would make the back button useless after a search.
    navigate({ pathname: "/", search: params.toString() }, { replace: true });
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="yt-app">
      <Header onToggleSidebar={toggleSidebar} onSearch={handleSearch} />

      <div className="yt-body">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className={`yt-main ${sidebarOpen ? "yt-main--shifted" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
