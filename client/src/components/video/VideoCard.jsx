// components/video/VideoCard.jsx — YT dark card with duration badge
import { Link } from "react-router-dom";
import { formatViews, formatDate } from "../../utils/formatViews.js";

const FALLBACK_THUMB = "https://placehold.co/320x180/1a1a1a/ffffff?text=No+Thumbnail";

// Format seconds to MM:SS or H:MM:SS
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function VideoCard({ video }) {
  const { _id, title, thumbnailUrl, channel, views, createdAt, duration } = video;
  const channelName = channel?.channelName || "Unknown Channel";
  const channelAvatar = channel?.avatar;
  const avatarInitial = channelName[0]?.toUpperCase() || "C";
  const durationStr = formatDuration(duration);

  return (
    <Link to={`/video/${_id}`} className="video-card">
      <div className="video-card__thumb-wrap">
        <img
          className="video-card__thumb"
          src={thumbnailUrl || FALLBACK_THUMB}
          alt={title}
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_THUMB; }}
        />
        {durationStr && (
          <span className="video-card__duration">{durationStr}</span>
        )}
      </div>

      <div className="video-card__info">
        <div className="video-card__avatar">
          {channelAvatar
            ? <img src={channelAvatar} alt={channelName} />
            : <span>{avatarInitial}</span>
          }
        </div>
        <div className="video-card__meta">
          <p className="video-card__title">{title}</p>
          <p className="video-card__channel">{channelName}</p>
          <p className="video-card__stats">
            {formatViews(views)} · {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
