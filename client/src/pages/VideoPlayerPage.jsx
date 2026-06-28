// client/src/pages/VideoPlayerPage.jsx — FE-06
// Rubric: Video Player Page (50 marks) — player, title/desc, channel, like/dislike, comment CRUD.
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import LikeDislikeButtons from "../components/video/LikeDislikeButtons.jsx";
import CommentSection from "../components/comments/CommentSection.jsx";
import { getVideoById, likeVideo, dislikeVideo } from "../services/videoService.js";
import {
  getCommentsForVideo,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentService.js";
import { useAuth } from "../hooks/useAuth.js";
import { formatViews, formatDate } from "../utils/formatViews.js";

function VideoPlayerPage() {
  const { id } = useParams();
  const { user, isAuthed } = useAuth();

  const [video, setVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const [comments, setComments] = useState([]);

  // Track like/dislike state locally so UI updates immediately
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Fetch video on mount / id change
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
    if (!video || !user) {
      setUserHasLiked(false);
      setUserHasDisliked(false);
      return;
    }

    const matchesUser = (uid) => uid === user._id || uid?._id === user._id;
    setUserHasLiked(video.likes?.some(matchesUser) ?? false);
    setUserHasDisliked(video.dislikes?.some(matchesUser) ?? false);
  }, [video, user]);

  // Fetch comments on mount / id change
  useEffect(() => {
    let cancelled = false;
    getCommentsForVideo(id)
      .then((res) => { if (!cancelled) setComments(res.data.comments); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [id]);

  // Like handler
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

  // Dislike handler
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

  // Comment handlers
  const handleAddComment = async (videoId, text) => {
    const res = await addComment({ video: videoId, text });
    setComments((prev) => [res.data.comment, ...prev]);
  };

  const handleEditComment = async (commentId, text) => {
    const res = await updateComment(commentId, { text });
    setComments((prev) =>
      prev.map((c) => (c._id === commentId ? res.data.comment : c))
    );
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  // NOTE: Header used to be rendered directly on this page (and duplicated on
  // every other page). It now comes from the shared Layout — see App.jsx —
  // so the search bar and hamburger actually work here too instead of being
  // inert decoration.
  if (videoLoading) {
    return <div className="vpp-loading">Loading video…</div>;
  }

  if (videoError || !video) {
    return (
      <div className="vpp-error">
        <p>Video not found or failed to load.</p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const channelName = video.channel?.channelName || "Unknown Channel";
  const channelId = video.channel?._id;

  return (
    <div className="vpp-layout">
      {/* Left — player + info */}
      <div className="vpp-main">
        {/* Video player */}
        <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />

        {/* Title */}
        <h1 className="vpp-title">{video.title}</h1>

        {/* Meta row: channel + actions */}
        <div className="vpp-meta">
          <div className="vpp-channel-info">
            <div className="vpp-channel-avatar">
              {channelName[0]?.toUpperCase()}
            </div>
            <div>
              <Link
                to={channelId ? `/channel/${channelId}` : "#"}
                className="vpp-channel-name"
              >
                {channelName}
              </Link>
              <p className="vpp-views">
                {formatViews(video.views)} · {formatDate(video.createdAt)}
              </p>
            </div>
          </div>

          <LikeDislikeButtons
            likesCount={likesCount}
            dislikesCount={dislikesCount}
            userHasLiked={userHasLiked}
            userHasDisliked={userHasDisliked}
            onLike={handleLike}
            onDislike={handleDislike}
            disabled={!isAuthed || likeLoading}
          />
        </div>

        {/* Description */}
        {video.description && (
          <div className="vpp-description">
            <p>{video.description}</p>
          </div>
        )}

        {/* Comment section — full CRUD */}
        <CommentSection
          videoId={id}
          comments={comments}
          onAdd={handleAddComment}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
      </div>
    </div>
  );
}

export default VideoPlayerPage;
