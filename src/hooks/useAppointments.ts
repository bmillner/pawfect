import { useQuery, useMutation, useQueryClient } from 'react-query';
import { appointments } from '@/lib/api';

export function useAppointments() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery('appointments', appointments.getAll);

  const createAppointment = useMutation(appointments.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const updateAppointment = useMutation(
    ({ id, data }: { id: string; data: any }) => appointments.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
      },
    }
  );

  const deleteAppointment = useMutation(appointments.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  return {
    appointments: data,
    isLoading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}