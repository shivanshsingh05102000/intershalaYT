// client/src/pages/VideoPlayerPage.jsx — FE-06
// Two-column layout: player+info left, filter chips + suggested videos right
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import LikeDislikeButtons from "../components/video/LikeDislikeButtons.jsx";
import CommentSection from "../components/comments/CommentSection.jsx";
import { getVideoById, getVideos, likeVideo, dislikeVideo } from "../services/videoService.js";
import { getCommentsForVideo, addComment, updateComment, deleteComment } from "../services/commentService.js";
import { useAuth } from "../hooks/useAuth.js";
import { formatViews, formatDate } from "../utils/formatViews.js";

const SUGGESTION_CHIPS = ["All", "Related", "For you", "Recently uploaded", "Watched"];

const FALLBACK_THUMB = "https://placehold.co/168x94/1a1a1a/ffffff?text=No+Thumbnail";

function formatDuration(s) {
  if (!s || isNaN(s)) return null;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  return `${m}:${String(sec).padStart(2,"0")}`;
}

function VideoPlayerPage() {
  const { id } = useParams();
  const { user, isAuthed } = useAuth();

  const [video, setVideo]             = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError]   = useState(false);
  const [comments, setComments]       = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeChip, setActiveChip]   = useState("All");
  const [descExpanded, setDescExpanded] = useState(false);

  const [likesCount, setLikesCount]       = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userHasLiked, setUserHasLiked]   = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const [likeLoading, setLikeLoading]     = useState(false);

  useEffect(() => {
    let cancelled = false;
    setVideoLoading(true);
    setVideoError(false);
    getVideoById(id)
      .then((res) => {
        if (cancelled) return;
        const v = res.data.video;
        setVideo(v);
        setLikesCount(v.likes?.length ?? 0);
        setDislikesCount(v.dislikes?.length ?? 0);
      })
      .catch(() => { if (!cancelled) setVideoError(true); })
      .finally(() => { if (!cancelled) setVideoLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!video || !user) { setUserHasLiked(false); setUserHasDisliked(false); return; }
    const matchesUser = (uid) => uid === user._id || uid?._id === user._id;
    setUserHasLiked(video.likes?.some(matchesUser) ?? false);
    setUserHasDisliked(video.dislikes?.some(matchesUser) ?? false);
  }, [video, user]);

  useEffect(() => {
    let cancelled = false;
    getCommentsForVideo(id)
      .then((res) => { if (!cancelled) setComments(res.data.comments); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [id]);

  // Fetch suggestions
  useEffect(() => {
    getVideos({ limit: 20 })
      .then((res) => {
        const vids = res.data.videos || [];
        setSuggestions(vids.filter((v) => v._id !== id).slice(0, 12));
      })
      .catch(() => {});
  }, [id]);

  const handleLike = async () => {
    if (!isAuthed || likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await likeVideo(id);
      setLikesCount(res.data.likesCount);
      setDislikesCount(res.data.dislikesCount);
      setUserHasLiked(res.data.userHasLiked);
      setUserHasDisliked(false);
    } catch (_) {}
    finally { setLikeLoading(false); }
  };

  const handleDislike = async () => {
    if (!isAuthed || likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await dislikeVideo(id);
      setLikesCount(res.data.likesCount);
      setDislikesCount(res.data.dislikesCount);
      setUserHasDisliked(res.data.userHasDisliked);
      setUserHasLiked(false);
    } catch (_) {}
    finally { setLikeLoading(false); }
  };

  const handleAddComment    = async (videoId, text) => { const res = await addComment({ video: videoId, text }); setComments((p) => [res.data.comment, ...p]); };
  const handleEditComment   = async (commentId, text) => { const res = await updateComment(commentId, { text }); setComments((p) => p.map((c) => (c._id === commentId ? res.data.comment : c))); };
  const handleDeleteComment = async (commentId) => { await deleteComment(commentId); setComments((p) => p.filter((c) => c._id !== commentId)); };

  if (videoLoading) return <div className="vpp-loading">Loading video…</div>;
  if (videoError || !video) return (
    <div className="vpp-error"><p>Video not found or failed to load.</p><Link to="/">← Back to home</Link></div>
  );

  const channelName = video.channel?.channelName || "Unknown Channel";
  const channelId   = video.channel?._id;

  return (
    <div className="vpp-layout">
      {/* ── Left: player + info ── */}
      <div className="vpp-main">
        <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />

        <h1 className="vpp-title">{video.title}</h1>

        <div className="vpp-meta">
          <div className="vpp-channel-info">
            <div className="vpp-channel-avatar">{channelName[0]?.toUpperCase()}</div>
            <div>
              <Link to={channelId ? `/channel/${channelId}` : "#"} className="vpp-channel-name">
                {channelName}
              </Link>
              <p className="vpp-views">{formatViews(video.views)} · {formatDate(video.createdAt)}</p>
            </div>
          </div>
          <LikeDislikeButtons
            likesCount={likesCount} dislikesCount={dislikesCount}
            userHasLiked={userHasLiked} userHasDisliked={userHasDisliked}
            onLike={handleLike} onDislike={handleDislike}
            disabled={!isAuthed || likeLoading}
          />
        </div>

        {video.description && (
          <div className="vpp-description">
            <p className={descExpanded ? "" : "vpp-description--clamped"}>{video.description}</p>
            {video.description.length > 200 && (
              <button className="vpp-desc-toggle" onClick={() => setDescExpanded((p) => !p)}>
                {descExpanded ? "Show less" : "...more"}
              </button>
            )}
          </div>
        )}

        <CommentSection
          videoId={id} comments={comments}
          onAdd={handleAddComment} onEdit={handleEditComment} onDelete={handleDeleteComment}
        />
      </div>

      {/* ── Right: chips + suggestions ── */}
      <aside className="vpp-sidebar">
        <div className="vpp-chips">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip}
              className={`vpp-chip${activeChip === chip ? " vpp-chip--active" : ""}`}
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="vpp-suggestions">
          {suggestions.map((v) => (
            <Link key={v._id} to={`/video/${v._id}`} className="vpp-suggestion-card">
              <div className="vpp-suggestion-thumb-wrap">
                <img
                  src={v.thumbnailUrl || FALLBACK_THUMB}
                  alt={v.title}
                  className="vpp-suggestion-thumb"
                  loading="lazy"
                  onError={(e) => { e.target.src = FALLBACK_THUMB; }}
                />
                {v.duration && (
                  <span className="vpp-suggestion-duration">{formatDuration(v.duration)}</span>
                )}
              </div>
              <div className="vpp-suggestion-info">
                <p className="vpp-suggestion-title">{v.title}</p>
                <p className="vpp-suggestion-channel">{v.channel?.channelName || "Unknown"}</p>
                <p className="vpp-suggestion-stats">{formatViews(v.views)} · {formatDate(v.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default VideoPlayerPage;
