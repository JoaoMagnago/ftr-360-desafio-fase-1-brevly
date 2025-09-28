import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteShortLink } from '../http/routes/delete-short-link'
import type { DeleteShortLinkParams } from '../types'

export const useDeleteShortLink = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (input: DeleteShortLinkParams) => deleteShortLink(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['short-links'] })
    },
  })

  if (mutation.isError) {
    console.log(mutation.error)
  }

  return mutation
}
