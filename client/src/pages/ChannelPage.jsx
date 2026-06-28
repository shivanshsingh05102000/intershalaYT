// client/src/pages/ChannelPage.jsx — FE-07
// Rubric: Channel Page (40 marks) — create channel, list videos, edit/delete own videos.
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ChannelHeader from "../components/channel/ChannelHeader.jsx";
import ChannelVideoList from "../components/channel/ChannelVideoList.jsx";
import CreateChannelForm from "../components/channel/CreateChannelForm.jsx";
import { getChannelById, createChannel } from "../services/channelService.js";
import { deleteVideo } from "../services/videoService.js";
import { useAuth } from "../hooks/useAuth.js";

function ChannelPage() {
  const { id } = useParams();
  const { user, isAuthed, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const isNew = id === "new";

  useEffect(() => {
    // "new" means the user has no channel yet — skip fetch
    if (isNew) {
      setLoading(false);
      // Only show the form if the user is logged in
      setShowCreateForm(isAuthed);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    getChannelById(id)
      .then((res) => {
        if (!cancelled) setChannel(res.data.channel);
      })
      .catch(() => {
        if (!cancelled) setError("Channel not found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id, isAuthed]);

  const isOwner = isAuthed && channel && user?._id === channel.owner?._id;

  const handleCreateChannel = async (payload) => {
    setCreating(true);
    setCreateError("");
    try {
      const res = await createChannel(payload);
      const newChannel = res.data.channel;
      // Re-fetch the user profile so AuthContext's `user.channels` includes
      // the new channel immediately — without this, the Header dropdown's
      // "Your channel" link stays pointed at the stale (pre-creation) list
      // until the next page refresh or login.
      await refreshUser();
      navigate(`/channel/${newChannel._id}`, { replace: true });
    } catch (err) {
      setCreateError(
        err.response?.data?.message || "Failed to create channel. Please try again."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video? This cannot be undone.")) return;
    try {
      await deleteVideo(videoId);
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete video.");
    }
  };

  // Render states
  if (loading) {
    return <div className="cp-loading">Loading channel…</div>;
  }

  // "new" channel route — not authed
  if (isNew && !isAuthed) {
    return (
      <div className="cp-gated">
        <p>You need to <Link to="/login">sign in</Link> to create a channel.</p>
      </div>
    );
  }

  // "new" channel route — authed, show create form
  if (isNew && showCreateForm) {
    return (
      <>
        {createError && <p className="cp-error">{createError}</p>}
        <CreateChannelForm onSubmit={handleCreateChannel} loading={creating} />
      </>
    );
  }

  if (error || !channel) {
    return (
      <div className="cp-error-page">
        <p>{error || "Channel not found."}</p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="cp-body">
      <ChannelHeader channel={channel} />

      <div className="cp-tabs">
        <button className="cp-tab cp-tab--active">Videos</button>
      </div>

      <div className="cp-content">
        <ChannelVideoList
          videos={channel.videos || []}
          isOwner={isOwner}
          onDelete={handleDeleteVideo}
        />
      </div>
    </div>
  );
}

export default ChannelPage;
