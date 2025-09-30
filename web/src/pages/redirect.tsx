import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoIcon from '../assets/Logo_Icon.svg';
import { NOT_FOUND_ROUTE } from '../constants/routes';
import { getShortLinkByShortUrl } from '../http/routes/get-short-link-by-short-url';
import type { GetShortLinkByShortUrlResponse } from '../types';

const BASE_URL = import.meta.env.VITE_FRONTEND_URL

export const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl?: string }>()
  const navigate = useNavigate()

  const shortUrlExists = typeof shortUrl === 'string' && shortUrl.length > 0

  const { data, isSuccess } = useQuery<GetShortLinkByShortUrlResponse, Error>({
    queryKey: ['short-link-by-short-url', shortUrl],
    queryFn: () => {
      if (!shortUrlExists) throw new Error('Short URL not found')
      return getShortLinkByShortUrl({ shortUrl })
    },
    enabled: shortUrlExists,
    retry: false,
  })

  const originalUrl = useMemo(() => data?.originalUrl, [data])

  useEffect(() => {
    if (isSuccess && originalUrl) {
      window.location.href = originalUrl
      return
    }

    if (isSuccess && !data) {
      navigate(NOT_FOUND_ROUTE)
    }
  }, [isSuccess, originalUrl, data])

  if (!shortUrlExists) {
    navigate(NOT_FOUND_ROUTE)
    return
  }

  return (
    <main className="h-dvh flex items-center justify-center px-3">
      <div className="flex flex-col items-center gap-6 px-12 py-16 w-full max-w-[36.25rem] rounded-lg bg-white">
        <img src={logoIcon} aria-label={'Ícone do brev.ly'} className="h-12" />

        <h1 className="text-xl text-gray-600">Redirecionando...</h1>

        <div className="flex flex-col gap-1">
          <p className="text-md-semibold text-gray-500 text-center">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-md-semibold text-gray-500 text-center">
            Não foi redirecionado?{' '}
            <a
              href={isSuccess ? originalUrl : BASE_URL}
              className="text-blue-base underline hover:cursor-pointer"
            >
              Clique aqui
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};
