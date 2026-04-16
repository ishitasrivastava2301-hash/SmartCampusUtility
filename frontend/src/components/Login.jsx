import { useState } from 'react';

function Login({ onAuth, apiBase }) {
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('Student123!');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setSubmitting(true);

    const res = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.message || 'Unable to login');
      return;
    }

    setStatus('Login successful — redirecting you now.');
    onAuth(data);
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-brand">
          <span className="brand-pill">Smart Campus</span>
          <h1>Campus utilities in one place</h1>
          <p>Sign in to track issues, read announcements, and keep your campus connected.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@campus.edu"
              autoComplete="username"
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="message error">{error}</p>}
          {status && <p className="message success">{status}</p>}
          <button type="submit" className="primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="auth-help">
          <p>Use a demo account to explore the app instantly.</p>
          <p className="muted">Student: student@campus.edu / Student123! | Admin: admin@campus.edu / Admin123!</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
