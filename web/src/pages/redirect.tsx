import { useParams } from 'react-router-dom';

import logoIcon from '../assets/Logo_Icon.svg';

export const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const originalUrl = `www.${shortUrl?.toLowerCase().replace('-', '')}.com`;
  console.log('Redirectign to:', originalUrl);

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
