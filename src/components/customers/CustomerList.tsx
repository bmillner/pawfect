import { useState, useEffect } from 'react';
import { CustomerDetails } from './CustomerDetails';
import { cn } from '@/lib/utils';
import { customers } from '@/lib/api';
import type { z } from 'zod';
import type { CustomerSchema } from '@/lib/api';

type Customer = z.infer<typeof CustomerSchema>;

interface CustomerListProps {
  searchQuery: string;
}

export function CustomerList({ searchQuery }: CustomerListProps) {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customers.getAll();
        setCustomerList(data);
      } catch (err) {
        setError('Failed to load customers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customerList.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {filteredCustomers.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No customers found
        </div>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              className={cn(
                'hover:bg-gray-50 cursor-pointer',
                selectedCustomer?.id === customer.id && 'bg-blue-50'
              )}
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {customer.firstName[0]}
                          {customer.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-500">
                    <div>{customer.pets.length} pet{customer.pets.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}