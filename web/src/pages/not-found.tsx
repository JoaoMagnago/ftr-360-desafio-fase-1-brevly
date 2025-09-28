import { PageContainer } from '../components/page-container';

import notFound from '../assets/404.svg';

export const NotFound = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 px-12 py-16 w-full max-w-[36.25rem] rounded-lg bg-white">
        <img
          src={notFound}
          aria-label={'Código 404 para conteúdo não encontrado'}
          className="h-[5.3125rem]"
        />

        <h1 className="text-xl text-gray-600">Link não encontrado</h1>

        <p className="text-md-semibold text-gray-500 text-center">
          O link que você está tentando acessar não existe, foi removido ou é
          uma url inválida. Saiba mais em{' '}
          <a href="/" className="text-blue-base underline hover:cursor-pointer">
            brev.ly
          </a>
          .
        </p>
      </div>
    </PageContainer>
  );
};
