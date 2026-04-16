import { useState } from 'react';

function AdminPanel({ token, apiBase, onRefresh }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const response = await fetch(`${apiBase}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setStatus({ type: 'error', text: data.message || 'Unable to publish announcement' });
      return;
    }

    setTitle('');
    setBody('');
    setStatus({ type: 'success', text: 'Announcement published successfully.' });
    onRefresh();
  }

  return (
    <div className="card">
      <div className="section-header">
        <h2>Admin Controls</h2>
        <p className="muted">Publish announcements to keep students informed instantly.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label>Announcement Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title for the announcement" required />
        </div>
        <div className="field full-width">
          <label>Announcement Body</label>
          <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the announcement details" required />
        </div>
        <div className="form-actions">
          <button className="primary" type="submit" disabled={submitting}>
            {submitting ? 'Publishing…' : 'Publish announcement'}
          </button>
          {status && <span className={`message ${status.type}`}>{status.text}</span>}
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;
