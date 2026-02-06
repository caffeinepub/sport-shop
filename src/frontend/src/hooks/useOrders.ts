import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Order, CartItem } from '../backend';

export function useGetCallerOrders() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Order[]>({
    queryKey: ['callerOrders'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const orders = await actor.getAllOrders();
        return orders;
      } catch (error: any) {
        // If unauthorized (guest user), return empty array
        if (error.message?.includes('Unauthorized')) {
          return [];
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, totalCents }: { items: CartItem[]; totalCents: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      const orderId = await actor.createOrder(items, totalCents);
      return orderId;
    },
    onSuccess: () => {
      // Invalidate orders query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['callerOrders'] });
    },
  });
}
