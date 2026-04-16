import { useState } from 'react';
import toast from 'react-hot-toast';
import { createIssue } from '../services/issueService.js';

const categories = ['Classroom', 'Wi-Fi', 'Laboratory', 'Facility'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

function ReportIssuePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState(priorities[1]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createIssue({ title, description, category, priority });
      toast.success('Issue submitted successfully');
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      setPriority(priorities[1]);
      setFile(null);
    } catch (error) {
      toast.error(error.message || 'Unable to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Report Issue</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Create a new support ticket</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Send details of the campus issue and we’ll route it to the right team.</p>
        </div>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Issue title</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Projector not working in lecture hall"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Priority</span>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {priorities.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Description</span>
          <textarea
            rows="6"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the issue and the location where it occurs."
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          />
        </label>

        <label className="block rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
          <span className="block text-sm font-semibold">Upload screenshot (optional)</span>
          <span className="mt-2 block text-sm text-slate-500 dark:text-slate-400">Attach an image to help describe your issue. File upload is optional.</span>
          <input
            type="file"
            className="mt-4 w-full cursor-pointer opacity-0"
            accept="image/*"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          {file && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Selected file: {file.name}</p>}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-soft shadow-cyan-500/30 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Submitting issue…' : 'Submit issue'}
        </button>
      </form>
    </div>
  );
}

export default ReportIssuePage;
