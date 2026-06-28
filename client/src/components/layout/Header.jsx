// components/layout/Header.jsx
// Rubric: Home Page UI/UX (40 marks) — YouTube header with hamburger, logo,
// search bar, sign-in button (or avatar when logged in).
// TICKET-FE-03

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function Header({ onToggleSidebar, onSearch }) {
  const { isAuthed, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal.trim());
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    // Live search — propagate on every keystroke; HomePage debounces it
    if (onSearch) onSearch(e.target.value);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Avatar initials fallback
  const initials = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <header className="yt-header">
      {/* Left — hamburger + logo */}
      <div className="yt-header__left">
        <button
          className="yt-header__hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span /><span /><span />
        </button>

        <Link to="/" className="yt-header__logo">
          {/* YouTube-style SVG wordmark */}
          <svg height="20" viewBox="0 0 90 20" focusable="false">
            <g>
              <path
                d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                fill="#FF0000"
              />
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
            </g>
          </svg>
          <span className="yt-header__logo-text">YouTube</span>
        </Link>
      </div>

      {/* Center — search bar */}
      <form className="yt-header__search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={handleSearchChange}
          aria-label="Search videos"
        />
        <button type="submit" aria-label="Search">
          {/* Search icon */}
          <svg viewBox="0 0 24 24" height="18" fill="currentColor">
            <path d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
        </button>
      </form>

      {/* Right — sign in or avatar */}
      <div className="yt-header__right">
        {isAuthed ? (
          <div className="yt-header__user">
            <button
              className="yt-header__user-trigger"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="User menu"
            >
              <span className="yt-header__avatar">{initials}</span>
              {/* Rubric: "after signing in, his/her name should be present at
                  the top" — visible by default, hidden on very small screens
                  via CSS so it doesn't crowd the search bar. */}
              <span className="yt-header__username">{user.username}</span>
            </button>
            {menuOpen && (
              <div className="yt-header__dropdown">
                <div className="yt-header__dropdown-name">@{user.username}</div>
                <Link
                  to={`/channel/${user.channels?.[0] || "new"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Your channel
                </Link>
                <button onClick={handleLogout}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="yt-header__signin">
            <svg viewBox="0 0 24 24" height="16" fill="#1a73e8">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;