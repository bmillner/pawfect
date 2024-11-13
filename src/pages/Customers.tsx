import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CustomerList } from '@/components/customers/CustomerList';
import { CustomerForm } from '@/components/customers/CustomerForm';

export function Customers() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your customer relationships</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Customer
        </Button>
      </div>

      <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          className="ml-2 flex-1 border-0 bg-transparent focus:outline-none focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CustomerList searchQuery={searchQuery} />

      {isCreating && (
        <CustomerForm onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
}

export default Customers;