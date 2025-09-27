import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const createShortLinkSchema = z.object({
  originalUrl: z.url(),
  shortUrl: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9-_]+$/),
});

type CreateShortLinkFormValues = z.infer<typeof createShortLinkSchema>;

export function ShortLinkForm() {
  const { control, watch } = useForm<CreateShortLinkFormValues>({
    resolver: zodResolver(createShortLinkSchema),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  });

  const originalUrl = watch('originalUrl');
  const shortUrl = watch('shortUrl');

  useEffect(() => {
    console.log({ originalUrl, shortUrl });
  }, [originalUrl, shortUrl]);

  return (
    <div className="flex flex-col p-8 gap-6 bg-gray-100 max-w-[380px] w-full rounded-lg">
      <h2 className="text-xl/8 font-(weight:--font-bold) text-gray-600">
        Novo link
      </h2>

      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name={'originalUrl'}
          render={({ field: { value, onChange } }) => (
            <div className="flex flex-col gap-2">
              <span className="text-xs/(--line-height-xs) text-gray-500 uppercase">
                Link original
              </span>
              <input
                value={value}
                className="h-12 w-full px-4 py[0.9375rem] text-md text-gray-600 border-[1px] border-gray-300 rounded-lg focus-visible:outline-none placeholder:text-gray-400"
                placeholder="www.exemplo.com.br"
                spellCheck={false}
                onChange={onChange}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name={'shortUrl'}
          render={({ field: { value, onChange } }) => (
            <div className="flex flex-col gap-2">
              <span className="text-xs/(--line-height-xs) text-gray-500 uppercase">
                Link encurtado
              </span>
              <div className="flex align-center h-12 w-full px-4 py[0.9375rem] text-md border-[1px] border-gray-300 rounded-lg">
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
            </div>
          )}
        />
      </div>

      <button
        disabled={originalUrl.length === 0 || shortUrl.length === 0}
        className="h-12 text-md text-white font-(weight:--font-semibold) cursor-pointer bg-blue-base rounded-lg hover:brightness-101 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out"
      >
        Salvar link
      </button>
    </div>
  );
}
