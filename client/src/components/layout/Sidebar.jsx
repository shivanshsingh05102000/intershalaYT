// components/layout/Sidebar.jsx
// Rubric: Home Page UI/UX (40 marks) — static sidebar toggled by hamburger.
// TICKET-FE-03
//
// Fixed two bugs here:
// 1. Nav items used to link to categories (News/Sports/Movies/Technology/Trending)
//    that don't exist in the backend's category enum — clicking them always
//    returned zero videos. Now built from the same CATEGORIES constant the
//    backend, FilterBar, and UploadVideoPage all use.
// 2. These links navigated the URL, but nothing ever read the URL — HomePage
//    now reads `category` via useSearchParams, so these actually filter the
//    grid (see HomePage.jsx).

import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories.js";

const CATEGORY_ICONS = {
  "Web Development": "💻",
  JavaScript: "📜",
  "Data Structures": "🌳",
  Music: "🎵",
  Gaming: "🎮",
  Education: "🎓",
};

const NAV_ITEMS = [
  { icon: "🏠", label: "Home", to: "/" },
  ...CATEGORIES.map((cat) => ({
    icon: CATEGORY_ICONS[cat] || "▶️",
    label: cat,
    to: `/?category=${encodeURIComponent(cat)}`,
  })),
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile — tapping it closes the sidebar */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          role="button"
          aria-label="Close sidebar"
          tabIndex={-1}
        />
      )}

      <aside className={`yt-sidebar ${isOpen ? "yt-sidebar--open" : ""}`}>
        <nav>
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `yt-sidebar__item${isActive && to === "/" ? " yt-sidebar__item--active" : ""}`
              }
              end
            >
              <span className="yt-sidebar__icon">{icon}</span>
              <span className="yt-sidebar__label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="yt-sidebar__divider" />

        <p className="yt-sidebar__footer">
          © 2024 YTClone
        </p>
      </aside>
    </>
  );
}

export default Sidebar;
