import { useEffect, useMemo, useState } from 'react';
import IssueForm from './IssueForm.jsx';
import IssueList from './IssueList.jsx';
import AnnouncementFeed from './AnnouncementFeed.jsx';
import AdminPanel from './AdminPanel.jsx';

function Dashboard({ user, token, onLogout, apiBase }) {
  const [issues, setIssues] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const summary = useMemo(() => ({
    total: issues.length,
    open: issues.filter((issue) => issue.status === 'OPEN').length,
    inProgress: issues.filter((issue) => issue.status === 'IN_PROGRESS').length,
    resolved: issues.filter((issue) => issue.status === 'RESOLVED').length,
  }), [issues]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [issuesRes, annRes] = await Promise.all([
        fetch(`${apiBase}/issues`, { headers }),
        fetch(`${apiBase}/announcements`, { headers }),
      ]);

      if (!issuesRes.ok) {
        throw new Error('Failed to load issue data');
      }
      if (!annRes.ok) {
        throw new Error('Failed to load announcements');
      }

      setIssues(await issuesRes.json());
      setAnnouncements(await annRes.json());
    } catch (err) {
      setError(err.message || 'Unable to load dashboard');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="top-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Hi, {user.name}</h1>
          <p className="subtitle">Manage campus issues, announcements, and progress from a single dashboard.</p>
        </div>
        <div className="top-actions">
          <button className="secondary" onClick={onLogout}>Logout</button>
          <button className="primary outline" onClick={fetchData} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh'}</button>
        </div>
      </div>

      <div className="summary-grid">
        <div className="card small-card">
          <p className="summary-label">Role</p>
          <h3>{user.role}</h3>
          <span className="tag role-tag">{user.role}</span>
        </div>
        <div className="card small-card">
          <p className="summary-label">Total issues</p>
          <h3>{summary.total}</h3>
        </div>
        <div className="card small-card">
          <p className="summary-label">Open</p>
          <h3>{summary.open}</h3>
        </div>
        <div className="card small-card">
          <p className="summary-label">Resolved</p>
          <h3>{summary.resolved}</h3>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}
      {loading && <div className="loader">Loading campus data…</div>}

      <div className="panel-grid">
        <AnnouncementFeed announcements={announcements} />
        {user.role === 'student' && (
          <IssueForm token={token} apiBase={apiBase} onCreated={fetchData} />
        )}
        <IssueList issues={issues} token={token} apiBase={apiBase} user={user} onUpdated={fetchData} />
        {user.role === 'admin' && (
          <AdminPanel token={token} apiBase={apiBase} onRefresh={fetchData} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
