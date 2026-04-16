import { useState } from 'react';

function IssueList({ issues, token, apiBase, user, onUpdated }) {
  const [error, setError] = useState(null);

  async function updateStatus(issueId, status) {
    setError(null);
    const response = await fetch(`${apiBase}/issues/${issueId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || 'Could not update issue');
      return;
    }
    onUpdated();
  }

  return (
    <div className="card">
      <div className="section-header">
        <div>
          <h2>Issue Tracker</h2>
          <p className="muted">Review reported issues and update their current status.</p>
        </div>
        <span>{issues.length} issues</span>
      </div>

      {issues.length === 0 && <div className="empty-state">No issues reported yet.</div>}
      {error && <div className="alert">{error}</div>}

      {issues.map((issue) => (
        <div key={issue.id} className="issue-card">
          <div className="issue-header">
            <div>
              <h3>{issue.title}</h3>
              <div className="issue-meta">
                <span className="tag">{issue.category}</span>
                <span>{issue.reporter?.name || 'Reporter unknown'}</span>
                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <span className={`status-chip ${issue.status}`}>{issue.status}</span>
          </div>
          <p>{issue.description}</p>
          <div className="issue-footer">
            <span>{issue.assignedTo ? `Assigned to ${issue.assignedTo}` : 'Unassigned'}</span>
            {user.role === 'admin' && (
              <div className="button-group">
                <button className="secondary small" onClick={() => updateStatus(issue.id, 'IN_PROGRESS')}>In progress</button>
                <button className="secondary small" onClick={() => updateStatus(issue.id, 'RESOLVED')}>Resolved</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssueList;
