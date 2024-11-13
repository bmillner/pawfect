import { useQuery, useMutation, useQueryClient } from 'react-query';
import { customers } from '@/lib/api';

export function useCustomers() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery('customers', customers.getAll);

  const createCustomer = useMutation(customers.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
    },
  });

  const updateCustomer = useMutation(
    ({ id, data }: { id: string; data: any }) => customers.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('customers');
      },
    }
  );

  const deleteCustomer = useMutation(customers.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
    },
  });

  return {
    customers: data,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}