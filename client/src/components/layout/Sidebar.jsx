// components/layout/Sidebar.jsx — pixel-perfect YT dark sidebar
import { NavLink } from "react-router-dom";

// SVG Icons — exact matches to YouTube's icon set
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const ShortsIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25l1.2.5L6 14.93c-1.84.97-2.53 3.23-1.56 5.07.97 1.83 3.23 2.53 5.07 1.56l8.49-4.5c1.29-.68 2.07-2.03 2-3.48-.07-1.42-.94-2.68-2.23-3.26zM10 14.65v-5.3L15 12l-5 2.65z"/>
  </svg>
);
const SubscriptionsIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zm-2 10H4v-8h16v8z"/>
  </svg>
);
const YouChannelIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);
const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/>
  </svg>
);
const PlaylistsIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"/>
  </svg>
);
const WatchLaterIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M22 8.98V4h-2v2.06C18.17 4.19 15.21 3 12 3 6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10c0-1.29-.26-2.51-.71-3.64L22 8.98zm-10 9.02c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm-5 5c-4.41 0-8-3.59-8-8s3.59-8 8-8c.97 0 1.89.18 2.75.5C9.55 8.24 9 9.56 9 11c0 2.24 1.29 4.17 3.16 5.12.52.26 1.07.43 1.64.53-.17.11-.35.21-.53.3l.88 1.88c-1.28.79-2.77 1.17-4.15 1.17zM11 14h2V8h-2v6z"/>
  </svg>
);
const LikedIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M21 7h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 0S7.08 6.85 7 7H2v13h17c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9c0-1.1-.9-2-2-2zM7 18H4V9h3v9zm14-7l-3 7H9V8.07l6.97-6.55-.95 4.48H21v5z"/>
  </svg>
);
const YourVideosIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
);
const DownloadsIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);
const ShoppingIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zm4 10v3h-4v-3H8l4-4 4 4h-2z"/>
  </svg>
);
const MusicIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);
const MoviesIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
  </svg>
);
const PremiumIcon = () => (
  <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14H9V7h2v8zm4 0h-2V7h2v8z"/>
  </svg>
);
const ReportIcon = () => (
  <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

// Dummy subscription channel avatars
const SUBSCRIPTIONS = [
  { name: "ComicVerse", color: "#1a73e8", dot: true },
  { name: "UpDating", color: "#e91e63", dot: true },
  { name: "Raj Shamani", color: "#ff9800", dot: true },
  { name: "Programming Liv...", color: "#4caf50", dot: true },
  { name: "Career247", color: "#9c27b0", dot: true, active: true },
  { name: "PJ Explained", color: "#00bcd4", dot: true },
  { name: "Anubhav Choubey", color: "#ff5722", dot: true },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} role="button" aria-label="Close sidebar" tabIndex={-1} />
      )}

      <aside className={`yt-sidebar ${isOpen ? "yt-sidebar--open" : ""}`}>
        {/* ── Top nav ── */}
        <NavLink to="/" className={({ isActive }) => `yt-sidebar__item${isActive ? " yt-sidebar__item--active" : ""}`} end>
          <HomeIcon /><span>Home</span>
        </NavLink>
        <NavLink to="/?category=Shorts" className="yt-sidebar__item">
          <ShortsIcon /><span>Shorts</span>
        </NavLink>
        <NavLink to="/?category=Subscriptions" className="yt-sidebar__item">
          <SubscriptionsIcon /><span>Subscriptions</span>
        </NavLink>

        <div className="yt-sidebar__divider" />

        {/* ── You section ── */}
        <div className="yt-sidebar__section-header">
          <span>You</span>
          <ChevronRight />
        </div>
        <NavLink to="/channel/me" className="yt-sidebar__item">
          <YouChannelIcon /><span>Your channel</span>
        </NavLink>
        <NavLink to="/history" className="yt-sidebar__item">
          <HistoryIcon /><span>History</span>
        </NavLink>
        <NavLink to="/playlists" className="yt-sidebar__item">
          <PlaylistsIcon /><span>Playlists</span>
        </NavLink>
        <NavLink to="/watch-later" className="yt-sidebar__item">
          <WatchLaterIcon /><span>Watch later</span>
        </NavLink>
        <NavLink to="/liked" className="yt-sidebar__item">
          <LikedIcon /><span>Liked videos</span>
        </NavLink>
        <NavLink to="/your-videos" className="yt-sidebar__item">
          <YourVideosIcon /><span>Your videos</span>
        </NavLink>
        <NavLink to="/downloads" className="yt-sidebar__item">
          <DownloadsIcon /><span>Downloads</span>
        </NavLink>

        <div className="yt-sidebar__divider" />

        {/* ── Subscriptions ── */}
        <div className="yt-sidebar__section-header">
          <span>Subscriptions</span>
          <ChevronRight />
        </div>
        {SUBSCRIPTIONS.map((ch) => (
          <div key={ch.name} className={`yt-sidebar__item yt-sidebar__item--channel${ch.active ? " yt-sidebar__item--active" : ""}`}>
            <div className="yt-sidebar__ch-avatar" style={{ background: ch.color }}>
              {ch.name[0]}
            </div>
            <span className="yt-sidebar__ch-name">{ch.name}</span>
            {ch.dot && <span className="yt-sidebar__ch-dot" />}
          </div>
        ))}
        <button className="yt-sidebar__show-more">
          <ChevronDown /><span>Show more</span>
        </button>

        <div className="yt-sidebar__divider" />

        {/* ── Explore ── */}
        <div className="yt-sidebar__section-header">
          <span>Explore</span>
        </div>
        <div className="yt-sidebar__item">
          <ShoppingIcon /><span>Shopping</span>
        </div>
        <div className="yt-sidebar__item">
          <MusicIcon /><span>Music</span>
        </div>
        <div className="yt-sidebar__item">
          <MoviesIcon /><span>Movies</span>
        </div>
        <button className="yt-sidebar__show-more">
          <ChevronDown /><span>Show more</span>
        </button>

        <div className="yt-sidebar__divider" />

        {/* ── More from YouTube ── */}
        <div className="yt-sidebar__section-header">
          <span>More from YouTube</span>
        </div>
        <div className="yt-sidebar__item yt-sidebar__item--yt">
          <span className="yt-sidebar__yt-icon">
            <svg viewBox="0 0 90 20" height="14" width="32"><g><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/></g></svg>
          </span>
          <span>YouTube Premium</span>
        </div>
        <div className="yt-sidebar__item yt-sidebar__item--yt yt-sidebar__item--active">
          <span className="yt-sidebar__yt-icon yt-sidebar__yt-icon--music">
            <svg viewBox="0 0 24 24" height="18" width="18" fill="white"><circle cx="12" cy="12" r="10" fill="#FF0000"/><path d="M10 16.5l6-4.5-6-4.5v9z" fill="white"/></svg>
          </span>
          <span>YouTube Music</span>
        </div>
        <div className="yt-sidebar__item yt-sidebar__item--yt">
          <span className="yt-sidebar__yt-icon">
            <svg viewBox="0 0 90 20" height="14" width="32"><g><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/></g></svg>
          </span>
          <span>YouTube Kids</span>
        </div>

        <div className="yt-sidebar__divider" />

        <div className="yt-sidebar__item">
          <ReportIcon /><span>Report history</span>
        </div>

        <div className="yt-sidebar__divider" />

        {/* Footer */}
        <div className="yt-sidebar__footer">
          <p>About Press Copyright Contact us</p>
          <p>Creators Advertise Developers</p>
          <br/>
          <p>Terms Privacy Policy &amp; Safety</p>
          <p>How YouTube works</p>
          <p>Test new features</p>
          <br/>
          <p>© 2025 Google LLC</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
