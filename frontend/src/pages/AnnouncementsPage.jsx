import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createAnnouncement, getAnnouncements } from '../services/announcementService.js';

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const list = await getAnnouncements();
        setAnnouncements(list);
      } catch (err) {
        setError(err.message || 'Unable to load announcements');
      } finally {
        setLoading(false);
      }
    }

    load();
    const timer = setInterval(load, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const created = await createAnnouncement({ title, body });
      setAnnouncements((current) => [created, ...current]);
      setTitle('');
      setBody('');
      toast.success('Announcement published');
    } catch (err) {
      toast.error(err.message || 'Could not publish announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Announcements</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Campus news</h1>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Auto-refresh every 12 seconds
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.6fr_1.4fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Publish announcement</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Admins can share news, deadlines, and campus updates with all users.</p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Title</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="New safety protocol introduced"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Body</span>
              <textarea
                rows="5"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write the announcement details here..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-soft shadow-cyan-500/30 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Publishing…' : 'Publish announcement'}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          {loading ? (
            [...Array(3)].map((_, idx) => (
              <div key={idx} className="h-36 rounded-[2rem] bg-slate-100 dark:bg-slate-800" />
            ))
          ) : announcements.length === 0 ? (
            <div className="rounded-[2rem] bg-slate-100 p-8 text-center text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              No announcements have been published yet.
            </div>
          ) : (
            announcements.map((announcement) => (
              <article key={announcement.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-950/40">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{announcement.title}</h2>
                  <span className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Announcement</span>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{announcement.body}</p>
                <p className="mt-5 text-sm text-slate-500 dark:text-slate-500">Published on {new Date(announcement.createdAt).toLocaleString()}</p>
              </article>
            ))
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-[2rem] bg-rose-50 p-6 text-rose-700 dark:bg-rose-950/20 dark:text-rose-200">
          <p className="font-semibold">Announcements error</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default AnnouncementsPage;
