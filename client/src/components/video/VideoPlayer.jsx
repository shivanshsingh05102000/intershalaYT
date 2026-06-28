// components/video/VideoPlayer.jsx — FE-06
import { useState } from "react";

function VideoPlayer({ src, poster }) {
  const [errored, setErrored] = useState(false);

  if (!src) {
    return (
      <div className="vp-no-src">
        <p>No video URL available.</p>
      </div>
    );
  }

  if (errored) {
    return (
      <div className="vp-no-src" style={{ position: "relative" }}>
        {poster && (
          <img
            src={poster}
            alt="Video thumbnail"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)",
          color: "#fff", borderRadius: "8px", gap: "8px"
        }}>
          <span style={{ fontSize: "2rem" }}>⚠️</span>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>Video could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vp-wrapper">
      <video
        className="vp-video"
        src={src}
        poster={poster || undefined}
        controls
        controlsList="nodownload"
        playsInline
        onError={() => setErrored(true)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;