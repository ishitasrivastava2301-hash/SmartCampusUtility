import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

const demoAccounts = {
  student: { email: 'student@campus.edu', password: 'Student123!' },
  admin: { email: 'admin@campus.edu', password: 'Admin123!' },
};

function LoginPage() {
  const navigate = useNavigate();
  const { auth, signIn } = useAuth();
  const [mode, setMode] = useState('student');
  const [email, setEmail] = useState(demoAccounts.student.email);
  const [password, setPassword] = useState(demoAccounts.student.password);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth.user, navigate]);

  useEffect(() => {
    setEmail(demoAccounts[mode].email);
    setPassword(demoAccounts[mode].password);
  }, [mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signIn(email.trim(), password);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] bg-white/5 p-8 shadow-soft shadow-black/20 ring-1 ring-white/10 backdrop-blur-xl md:grid-cols-[1.2fr_1fr] lg:p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-500/10">
                Welcome to Smart Campus
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                One place to manage campus issues, announcements, and resources.
              </h1>
              <p className="text-slate-300">
                A modern student and administrator dashboard built for seamless collaboration and fast action.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/70 p-6 shadow-soft shadow-slate-950/40 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Fast access</p>
                <p className="mt-4 text-xl font-semibold text-white">Role-based workflows</p>
                <p className="mt-3 text-slate-400">Students report issues and admins monitor progress in one intuitive UI.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-6 shadow-soft shadow-slate-950/40 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Built for mobile</p>
                <p className="mt-4 text-xl font-semibold text-white">Responsive design</p>
                <p className="mt-3 text-slate-400">The application adapts cleanly from mobile to desktop devices.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950/95 p-8 shadow-soft shadow-slate-950/40 ring-1 ring-white/10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Login</p>
                <h2 className="text-2xl font-semibold text-white">Access your campus workspace</h2>
              </div>
              <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                {mode}
              </div>
            </div>

            <div className="mb-6 flex gap-3 rounded-3xl bg-slate-900/70 p-2">
              {['student', 'admin'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setMode(option)}
                  className={`w-full rounded-3xl py-3 text-sm font-semibold transition ${
                    mode === option ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-soft shadow-cyan-500/30 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Signing in…' : 'Sign in to Smart Campus'}
              </button>
            </form>

            <div className="mt-6 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-400 ring-1 ring-white/10">
              <p className="font-semibold text-slate-200">Demo accounts</p>
              <p className="mt-3">Student: <span className="text-cyan-300">student@campus.edu</span></p>
              <p>Admin: <span className="text-cyan-300">admin@campus.edu</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
