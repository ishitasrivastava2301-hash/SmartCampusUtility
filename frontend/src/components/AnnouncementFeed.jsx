function AnnouncementFeed({ announcements }) {
  return (
    <div className="card">
      <div className="section-header">
        <div>
          <h2>Campus Announcements</h2>
          <p className="muted">Stay current with the latest campus news and updates.</p>
        </div>
        <span>{announcements.length} active</span>
      </div>

      {announcements.length === 0 && <div className="empty-state">No announcements available yet.</div>}
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement-item">
          <h3>{announcement.title}</h3>
          <p>{announcement.body}</p>
          <small>Published at {new Date(announcement.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default AnnouncementFeed;
