import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ReportIssuePage from './pages/ReportIssuePage.jsx';
import IssuesPage from './pages/IssuesPage.jsx';
import AnnouncementsPage from './pages/AnnouncementsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { auth } = useAuth();
  if (auth.user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="report" element={<ReportIssuePage />} />
        <Route path="issues" element={<IssuesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="booking" element={<BookingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
