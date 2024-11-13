import { X, Mail, Phone, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Pet {
  name: string;
  breed: string;
  notes: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pets: Pet[];
  lastVisit: string;
  upcomingAppointment?: string;
}

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl text-blue-600 font-medium">
                    {customer.firstName[0]}
                    {customer.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {customer.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">Pets</h4>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Pet
                </Button>
              </div>
              <div className="space-y-4">
                {customer.pets.map((pet, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{pet.name}</h5>
                        <p className="text-sm text-gray-500">{pet.breed}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    {pet.notes && (
                      <p className="mt-2 text-sm text-gray-600">
                        Notes: {pet.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Appointments</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-500">Last visit:</span>
                  <span className="ml-2">
                    {new Date(customer.lastVisit).toLocaleDateString()}
                  </span>
                </div>
                {customer.upcomingAppointment && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-500">Next appointment:</span>
                    <span className="ml-2">
                      {new Date(customer.upcomingAppointment).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Schedule Appointment</Button>
        </div>
      </div>
    </div>
  );
}