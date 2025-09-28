import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoIcon from '../assets/Logo_Icon.svg';
import { getShortLinkByShortUrl } from '../http/routes/get-short-link-by-short-url';

export const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl?: string }>()
  const navigate = useNavigate()

  const enabled = typeof shortUrl === 'string' && shortUrl.length > 0

  const { data, isError } = useQuery({
    queryKey: ['short-link-by-short-url', shortUrl],
    queryFn: () => {
      if (!shortUrl) {
        console.log('Error fetching original url')
        return
      }
      return getShortLinkByShortUrl({ shortUrl })
    },
    enabled,
    retry: false,
  })

  const originalUrl = useMemo(() => data?.originalUrl, [data])

  useEffect(() => {
    if (isError) {
      navigate('/404')
    }
  }, [isError, navigate])

  useEffect(() => {
    if(originalUrl) {
      window.location.href = originalUrl
    }
  }, [originalUrl])

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
              href={`https://${originalUrl}`}
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
