import {
  CopyIcon,
  DownloadSimpleIcon,
  LinkIcon,
  TrashIcon,
} from '@phosphor-icons/react';

interface ShortLink {
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
}

export const ShortLinksList = () => {
  const shortLinks: ShortLink[] = [
    {
      originalUrl: 'www.youtube.com.br',
      shortUrl: 'Youtube-Subscriptions',
      accessCount: 12,
    },
    {
      originalUrl: 'www.google.com.br',
      shortUrl: 'Google-Search',
      accessCount: 6,
    },
    {
      originalUrl: 'www.facebook.com.br',
      shortUrl: 'Facebook-Page',
      accessCount: 1,
    },
    {
      originalUrl: 'www.instagram.com.br',
      shortUrl: 'Instagram-Feed',
      accessCount: 37,
    },
  ];

  return (
    <div className="flex items-center flex-col gap-5 p-8 rounded-lg bg-gray-100 w-full lg:mt-16">
      <div className="flex justify-between w-full">
        <h2 className="text-lg text-gray-600">Meus links</h2>

        <button
          disabled={!shortLinks || shortLinks.length === 0}
          className="flex items-center p-2 rounded-sm cursor-pointer gap-1.5 bg-gray-200 border-1 border-transparent hover:border-blue-base disabled:cursor-not-allowed disabled:opacity-50 disabled:border-transparent transition-all duration-100"
        >
          <DownloadSimpleIcon fontSize={16} />
          <span className="text-sm-semibold font-(weight:--font-semibold) text-gray-500">
            Baixar CSV
          </span>
        </button>
      </div>

      <div className="flex flex-col w-full lg:max-h-[70vh] lg:overflow-y-auto">
        {shortLinks.length > 0 ? (
          shortLinks.map(({ shortUrl, originalUrl, accessCount }) => (
            <div className="flex items-center justify-between py-4 w-full border-t-1 border-t-gray-200">
              <div className="flex flex-col justify-between">
                <a
                  href={`/${shortUrl}`}
                  className="text-md-semibold font-(weight:--font-semibold) text-blue-base hover:cursor-pointer"
                >
                  brev.ly/{shortUrl}
                </a>
                <span className="text-sm-regular text-gray-500">
                  {originalUrl}
                </span>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-sm-regular text-gray-500">
                  {`${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`}
                </span>
                <div className="flex items-center gap-1">
                  <button className="flex items-center justify-center p-2 rounded-sm bg-gray-200 border-1 border-transparent hover:cursor-pointer hover:border-blue-base transition-all duration-100">
                    <CopyIcon />
                  </button>
                  <button className="flex items-center justify-center p-2 rounded-sm bg-gray-200 border-1 border-transparent hover:cursor-pointer hover:border-blue-base transition-all duration-100">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 pt-4 pb-6 w-full border-t-1 border-t-gray-200">
            <LinkIcon fontSize={32} />

            <p className="text-xs text-gray-500 uppercase">
              Ainda não existem links cadastrados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
