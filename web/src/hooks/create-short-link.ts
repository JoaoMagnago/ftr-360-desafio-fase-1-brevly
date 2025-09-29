import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShortLink } from '../http/routes/create-short-link'

export const useCreateShortLink = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createShortLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['short-links'] })
    },
  })

  if (mutation.isError) {
    console.log('[Create short link request error]: ', mutation.error)
  }

  return mutation
}
