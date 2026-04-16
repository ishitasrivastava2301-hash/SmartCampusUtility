import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getIssues, updateIssue } from '../services/issueService.js';

const statusOptions = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'];
const categoryOptions = ['All categories', 'Classroom', 'Wi-Fi', 'Laboratory', 'Facility'];

function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const issueData = await getIssues();
        setIssues(issueData);
      } catch (err) {
        setError(err.message || 'Could not load issues');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (statusFilter !== 'ALL' && issue.status !== statusFilter) return false;
      if (categoryFilter !== 'All categories' && issue.category !== categoryFilter) return false;
      if (!issue.title.toLowerCase().includes(search.toLowerCase()) && !issue.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [issues, statusFilter, categoryFilter, search]);

  const handleStatusChange = async (issueId, status) => {
    setUpdating(true);
    try {
      await updateIssue(issueId, { status });
      setIssues((current) => current.map((issue) => (issue.id === issueId ? { ...issue, status } : issue)));
      toast.success('Issue status updated');
    } catch (err) {
      toast.error(err.message || 'Unable to update issue');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Issue management</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">All reported issues</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search issues..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option.replace('_', ' ')}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-[2rem] bg-rose-50 p-6 text-rose-700 dark:bg-rose-950/20 dark:text-rose-200">
          <p className="font-semibold">Unable to load issues</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}

      <div className="grid gap-6">
        {loading ? (
          [...Array(4)].map((_, idx) => (
            <div key={idx} className="h-36 rounded-[2rem] bg-slate-100 dark:bg-slate-800" />
          ))
        ) : filteredIssues.length === 0 ? (
          <div className="rounded-[2rem] bg-slate-100 p-8 text-center text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            No issues match your filters. Try adjusting the search or status selection.
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div key={issue.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/30">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{issue.category}</span>
                    <span>{issue.reporter?.name || 'Anonymous reporter'}</span>
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{issue.title}</h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">{issue.description}</p>
                </div>
                <div className="space-y-4">
                  <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    issue.status === 'OPEN'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'
                      : issue.status === 'IN_PROGRESS'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                  }`}
                  >
                    {issue.status.replace('_', ' ')}
                  </span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      onClick={() => handleStatusChange(issue.id, 'IN_PROGRESS')}
                      disabled={updating || issue.status === 'IN_PROGRESS' || issue.status === 'RESOLVED'}
                    >
                      In progress
                    </button>
                    <button
                      type="button"
                      className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      onClick={() => handleStatusChange(issue.id, 'RESOLVED')}
                      disabled={updating || issue.status === 'RESOLVED'}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IssuesPage;
