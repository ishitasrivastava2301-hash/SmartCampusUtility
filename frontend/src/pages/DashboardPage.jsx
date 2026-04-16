import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiBell, FiCheckCircle, FiFileText, FiMessageCircle } from 'react-icons/fi';
import { getAnnouncements } from '../services/announcementService.js';
import { getIssues } from '../services/issueService.js';

const summaryCards = [
  { label: 'Total issues', field: 'total', icon: FiFileText, accent: 'from-sky-500 to-cyan-500' },
  { label: 'Open', field: 'open', icon: FiBell, accent: 'from-emerald-400 to-teal-500' },
  { label: 'In progress', field: 'inProgress', icon: FiCheckCircle, accent: 'from-orange-400 to-amber-500' },
  { label: 'Announcements', field: 'announcements', icon: FiMessageCircle, accent: 'from-violet-500 to-fuchsia-500' },
];

function DashboardPage() {
  const [issues, setIssues] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [issuesData, announcementsData] = await Promise.all([getIssues(), getAnnouncements()]);
        setIssues(issuesData);
        setAnnouncements(announcementsData);
      } catch (err) {
        setError(err.message || 'Unable to load dashboard content');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const summary = useMemo(() => ({
    total: issues.length,
    open: issues.filter((item) => item.status === 'OPEN').length,
    inProgress: issues.filter((item) => item.status === 'IN_PROGRESS').length,
    resolved: issues.filter((item) => item.status === 'RESOLVED').length,
    announcements: announcements.length,
  }), [issues, announcements]);

  const chartData = useMemo(
    () => [
      { name: 'Open', value: summary.open },
      { name: 'In progress', value: summary.inProgress },
      { name: 'Resolved', value: summary.resolved },
    ],
    [summary.open, summary.inProgress, summary.resolved],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Campus snapshot</h1>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
              Monitor issue trends, announcements, and activity in one clean campus control panel.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
            <div className="mt-3 flex items-center gap-3 text-sm font-medium">
              <FiBell className="h-5 w-5 text-cyan-500" />
              <span>Live campus metrics updated automatically</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.field} className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
              <div className={`mb-5 inline-flex rounded-3xl bg-gradient-to-br ${card.accent} p-4 text-white shadow-soft shadow-slate-200/20`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{summary[card.field]}</h2>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Issue trend</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Weekly workload</h2>
            </div>
          </div>
          <div className="mt-8 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fill="url(#gradientArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Recent activity</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Latest updates</h2>
            </div>
            <button className="rounded-3xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:text-slate-200">
              View all
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="h-24 rounded-3xl bg-slate-100 dark:bg-slate-800" />
                ))}
              </div>
            ) : (
              (issues.slice(0, 3).concat(announcements.slice(0, 3))).map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title || item.name || 'Campus update'}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description || item.body || 'Latest campus announcement'}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">{item.status ? item.status : 'announcement'}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-[2rem] bg-rose-50 p-6 text-rose-700 dark:bg-rose-950/20 dark:text-rose-200">
          <p className="font-semibold">Unable to load dashboard data</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
