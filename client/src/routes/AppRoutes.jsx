import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../components/AppShell';
import ProtectedRoute from '../components/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import { LoginPage, RegisterPage } from '../pages/AuthPages';
import DashboardPage from '../pages/DashboardPage';
import VisitorsPage from '../pages/VisitorsPage';
import ComplaintsPage from '../pages/ComplaintsPage';
import PaymentsPage from '../pages/PaymentsPage';
import BookingsPage from '../pages/BookingsPage';
import NoticesPage from '../pages/NoticesPage';
import { ForumPage, NotificationsPage, VehiclesPage } from '../pages/CommunityPages';
import ProfilePage from '../pages/ProfilePage';
import { EmergencyPage, ReportsPage, ResidentsPage } from '../pages/AdminPages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<LoginPage />} />
      <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="visitors" element={<VisitorsPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="facilities" element={<BookingsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="forum" element={<ForumPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<ProfilePage />} />
        <Route path="residents" element={<ResidentsPage />} />
        <Route path="units" element={<ResidentsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="emergency" element={<EmergencyPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
