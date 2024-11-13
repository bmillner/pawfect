import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Appointments } from '@/pages/Appointments';
import { Customers } from '@/pages/Customers';
import { useAuthStore } from '@/store/auth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AuthLayout
            title="Pawfect Grooming"
            subtitle="Professional pet grooming management"
          >
            <LoginForm />
          </AuthLayout>
        } />
        <Route path="/register/groomer" element={
          <AuthLayout
            title="Groomer Registration"
            subtitle="Create your professional grooming account"
          >
            <RegisterForm type="groomer" />
          </AuthLayout>
        } />
        <Route path="/register/customer" element={
          <AuthLayout
            title="Customer Registration"
            subtitle="Join Pawfect Grooming"
          >
            <RegisterForm type="customer" />
          </AuthLayout>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/appointments" element={
          <PrivateRoute>
            <DashboardLayout>
              <Appointments />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/customers" element={
          <PrivateRoute>
            <DashboardLayout>
              <Customers />
            </DashboardLayout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;