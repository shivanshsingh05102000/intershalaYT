// components/video/VideoCard.jsx
// Rubric: Home Page UI/UX — each card shows thumbnail, title, channel name, views.
// TICKET-FE-04

import { Link } from "react-router-dom";
import { formatViews, formatDate } from "../../utils/formatViews.js";

// Fallback thumbnail if the URL is broken
const FALLBACK_THUMB = "https://placehold.co/320x180/1a1a1a/ffffff?text=No+Thumbnail";

function VideoCard({ video }) {
  const {
    _id,
    title,
    thumbnailUrl,
    channel,
    views,
    createdAt,
  } = video;

  const channelName = channel?.channelName || "Unknown Channel";
  const channelAvatar = channel?.avatar;
  const avatarInitial = channelName[0]?.toUpperCase() || "C";

  return (
    <Link to={`/video/${_id}`} className="video-card">
      {/* Thumbnail */}
      <div className="video-card__thumb-wrap">
        <img
          className="video-card__thumb"
          src={thumbnailUrl || FALLBACK_THUMB}
          alt={title}
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_THUMB; }}
        />
      </div>

      {/* Info row */}
      <div className="video-card__info">
        {/* Channel avatar */}
        <div className="video-card__avatar">
          {channelAvatar
            ? <img src={channelAvatar} alt={channelName} />
            : <span>{avatarInitial}</span>
          }
        </div>

        {/* Text meta */}
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
