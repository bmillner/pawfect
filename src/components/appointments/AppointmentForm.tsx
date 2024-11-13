import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AppointmentFormProps {
  onClose: () => void;
}

export function AppointmentForm({ onClose }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    petName: '',
    service: 'full-groom',
    date: '',
    time: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement appointment creation
    console.log(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">New Appointment</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              id="petName"
              name="petName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.petName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              id="service"
              name="service"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="full-groom">Full Grooming</option>
              <option value="bath">Bath Only</option>
              <option value="nail-trim">Nail Trim</option>
              <option value="haircut">Haircut Only</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Appointment</Button>
          </div>
        </form>
      </div>
    </div>
  );
}