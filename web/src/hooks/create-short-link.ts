import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShortLink } from '../http/routes/create-short-link'

export const useCreateShortLink = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShortLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['short-links'] })
    },
  })
}
