// components/channel/ChannelHeader.jsx — FE-07
function ChannelHeader({ channel }) {
  const initials = channel.channelName?.[0]?.toUpperCase() || "C";

  return (
    <div className="channel-header">
      {/* Banner */}
      {channel.channelBanner ? (
        <div
          className="ch-banner"
          style={{ backgroundImage: `url(${channel.channelBanner})` }}
        />
      ) : (
        <div className="ch-banner ch-banner--default" />
      )}

      {/* Info row */}
      <div className="ch-info">
        <div className="ch-avatar">
          {channel.avatar
            ? <img src={channel.avatar} alt={channel.channelName} />
            : <span>{initials}</span>
          }
        </div>
        <div className="ch-text">
          <h1 className="ch-name">{channel.channelName}</h1>
          <p className="ch-handle">{channel.handle}</p>
          <p className="ch-sub-count">
            {(channel.subscribers || 0).toLocaleString()} subscriber
            {channel.subscribers !== 1 ? "s" : ""}
            {" · "}
            {(channel.videos?.length || 0)} video
            {channel.videos?.length !== 1 ? "s" : ""}
          </p>
          {channel.description && (
            <p className="ch-desc">{channel.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelHeader;
