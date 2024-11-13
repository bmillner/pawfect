import { useAuthStore } from '@/store/auth';
import { Calendar, Users, Receipt } from 'lucide-react';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.firstName}!</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                  <dd className="text-lg font-semibold text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-indigo-500/10">
                  <Users className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd className="text-lg font-semibold text-gray-900">248</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Receipt className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                  <dd className="text-lg font-semibold text-gray-900">$4,200</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;