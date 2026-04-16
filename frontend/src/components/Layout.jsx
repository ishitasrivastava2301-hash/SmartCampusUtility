import { useState } from 'react';
import { FiBell, FiChevronDown, FiHome, FiLogOut, FiMessageCircle, FiMenu, FiPlusSquare, FiSliders, FiSun, FiMoon, FiCalendar } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import useDarkMode from '../hooks/useDarkMode.js';

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: FiHome },
  { label: 'Report Issue', to: '/report', icon: FiPlusSquare },
  { label: 'View Issues', to: '/issues', icon: FiSliders },
  { label: 'Announcements', to: '/announcements', icon: FiMessageCircle },
  { label: 'Resource Booking', to: '/booking', icon: FiCalendar },
];

function Layout() {
  const { auth, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useDarkMode();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:border-r xl:border-slate-200 xl:bg-white xl:dark:bg-slate-950 xl:dark:border-slate-800 xl:px-6 xl:py-8">
          <div className="mb-10 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-soft">
              SC
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Smart Campus</p>
              <h2 className="text-xl font-semibold">Utility Hub</h2>
            </div>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-soft shadow-slate-200 dark:bg-cyan-500 dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-auto rounded-3xl bg-slate-100 p-5 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <p className="text-sm font-semibold">Campus Assistant</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Keep your campus running with issue tracking, announcements, and booking workflows.
            </p>
          </div>
        </aside>

        {isOpen && (
          <div className="fixed inset-0 z-30 overflow-auto bg-slate-950/70 xl:hidden">
            <div className="mx-auto flex min-h-full max-w-md flex-col bg-slate-50 p-6 dark:bg-slate-950">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Navigation</p>
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Smart Campus</h2>
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-white dark:bg-cyan-500 dark:text-slate-950"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
              <nav className="space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <div className={`flex flex-1 flex-col ${isOpen ? 'overflow-hidden' : ''}`}>
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 xl:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="xl:hidden rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FiMenu className="h-5 w-5" />
                </button>
                <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
                >
                  <FiBell className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950">
                    {auth.user?.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{auth.user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{auth.user?.role}</p>
                  </div>
                  <FiChevronDown className="h-5 w-5 text-slate-400" />
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-soft shadow-emerald-500/20 transition hover:bg-emerald-600"
                  onClick={signOut}
                >
                  <FiLogOut className="mr-2 inline-block h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto px-4 py-6 xl:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
