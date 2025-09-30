import { zodResolver } from '@hookform/resolvers/zod'
import { WarningIcon } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useCreateShortLink } from '../hooks/create-short-link'
import type { CreateShortLinkParams } from '../types'
import { checkShortUrlFormat } from '../utils/string'
import { Button } from './ui/button'

const createShortLinkSchema = z.object({
  originalUrl: z.url({ error: 'Informe uma url válida.' }).min(1).max(2048),
  shortUrl: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => checkShortUrlFormat(val), {
      message: 'Informe uma url com palavras separadas por hífen, primeiras letras maiúsculas e sem espaço/caracter especial.',
    }),
})

type CreateShortLinkFormValues = z.infer<typeof createShortLinkSchema>

export function ShortLinkForm() {
  const {
    control,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm<CreateShortLinkFormValues>({
    resolver: zodResolver(createShortLinkSchema),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  })
  
  const createShortLinkMutation = useCreateShortLink()

  const handleCreateShortLink = (data: CreateShortLinkParams) => {
    createShortLinkMutation.mutate(data)
  }

  const onSubmit = async (data: CreateShortLinkFormValues) => {
    try {
      handleCreateShortLink(data)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  const originalUrl = watch('originalUrl')
  const shortUrl = watch('shortUrl')

  return (
    <form
      id={"create-short-link-form"}
      className="flex flex-col p-8 gap-6 bg-gray-100 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg text-gray-600">Novo link</h2>

      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name={'originalUrl'}
          render={({ field: { value, onChange } }) => (
            <div className="group flex flex-col gap-2">
              <span
                className={`${
                  errors.originalUrl
                    ? 'text-xs-bold text-danger'
                    : 'text-xs-regular text-gray-500 group-focus-within:text-xs-bold group-focus-within:text-blue-base'
                } uppercase`}
              >
                Link original
              </span>
              <input
                value={value}
                className={`${
                  errors.originalUrl
                    ? 'border-danger'
                    : 'border-gray-300 focus-visible:border-blue-base'
                } h-12 w-full px-4 py[0.9375rem] text-md-regular text-gray-600 border-[1px] rounded-lg focus-visible:outline-none placeholder:text-gray-400`}
                placeholder="www.exemplo.com.br"
                spellCheck={false}
                onChange={onChange}
              />
              {errors.originalUrl && (
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <WarningIcon fontSize={12} color="var(--color-danger)" />
                  <span className="text-sm-regular">
                    {errors.originalUrl.message}
                  </span>
                </div>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name={'shortUrl'}
          render={({ field: { value, onChange } }) => (
            <div className="group flex flex-col gap-2">
              <span
                className={`${
                  errors.shortUrl
                    ? 'text-xs-bold text-danger'
                    : 'text-xs-regular text-gray-500 group-focus-within:text-xs-bold group-focus-within:text-blue-base'
                } uppercase`}
              >
                Link encurtado
              </span>
              <div
                className={`${
                  errors.shortUrl
                    ? 'border-danger'
                    : 'border-gray-300 group-focus-within:border-blue-base'
                } flex align-center h-12 w-full px-4 py[0.9375rem] text-md-regular border-1 rounded-lg`}
              >
                <span className="self-center h-fit text-gray-600">
                  brev.ly/
                </span>
                <input
                  value={value}
                  className="w-full text-gray-600 focus-visible:outline-none"
                  spellCheck={false}
                  onChange={onChange}
                />
              </div>
              {errors.shortUrl && (
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <WarningIcon fontSize={12} color="var(--color-danger)" />
                  <span className="text-sm-regular">
                    {errors.shortUrl.message}
                  </span>
                </div>
              )}
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        form="create-short-link-form"
        size="md"
        color="secondary"
        disabled={originalUrl.length === 0 || shortUrl.length === 0}
        isLoading={createShortLinkMutation.isPending}
      >
        <span className='text-md-semibold text-white'>Salvar Link</span>
      </Button>
    </form>
  )
}
