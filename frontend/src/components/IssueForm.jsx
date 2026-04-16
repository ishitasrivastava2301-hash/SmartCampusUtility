import { useState } from 'react';

function IssueForm({ token, apiBase, onCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Classroom');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const response = await fetch(`${apiBase}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category, description }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setStatus({ type: 'error', text: data.message || 'Unable to create issue' });
      return;
    }

    setTitle('');
    setDescription('');
    setStatus({ type: 'success', text: 'Issue reported successfully.' });
    onCreated();
  }

  return (
    <div className="card">
      <div className="section-header">
        <h2>Report a Campus Issue</h2>
        <p className="muted">Submit a new request for Wi-Fi, classroom, lab, or facility issues.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Projector not working" required />
        </div>
        <div className="field">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Classroom</option>
            <option>Wi-Fi</option>
            <option>Laboratory</option>
            <option>Facility</option>
          </select>
        </div>
        <div className="field full-width">
          <label>Description</label>
          <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail" required />
        </div>
        <div className="form-actions">
          <button className="primary" type="submit" disabled={submitting}>
            {submitting ? 'Reporting issue…' : 'Submit issue'}
          </button>
          {status && <span className={`message ${status.type}`}>{status.text}</span>}
        </div>
      </form>
    </div>
  );
}

export default IssueForm;
