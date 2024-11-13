import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AppointmentCalendar } from '@/components/appointments/AppointmentCalendar';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import { Button } from '@/components/ui/Button';

export function Appointments() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your grooming appointments</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <AppointmentCalendar />
        </div>
      </div>

      {isCreating && (
        <AppointmentForm onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
}

export default Appointments;