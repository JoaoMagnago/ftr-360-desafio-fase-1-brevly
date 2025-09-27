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
      originalUrl: 'www.exemplo.com.br',
      shortUrl: 'brev.ly/exemplo',
      accessCount: 10,
    },
    {
      originalUrl: 'www.exemplo.com.br',
      shortUrl: 'brev.ly/exemplo',
      accessCount: 10,
    },
    {
      originalUrl: 'www.exemplo.com.br',
      shortUrl: 'brev.ly/exemplo',
      accessCount: 10,
    },
    {
      originalUrl: 'www.exemplo.com.br',
      shortUrl: 'brev.ly/exemplo',
      accessCount: 10,
    },
  ];

  return (
    <div className="flex items-center flex-col gap-5 p-8 rounded-lg bg-gray-100 w-full lg:max-w-[580px] lg:mt-16">
      <div className="flex justify-between w-full">
        <h2 className="text-xl/(line-height-xl) font-(weight:--font-bold) text-gray-600">
          Meus links
        </h2>

        <button className="flex items-center p-2 rounded-sm cursor-pointer gap-1.5 bg-gray-200 hover:brightness-101 ease-in-out active:scale-99 transition-all duration-50">
          <DownloadSimpleIcon fontSize={16} />
          <span className="text-sm font-(weight:--font-semibold) text-gray-500">
            Baixar CSV
          </span>
        </button>
      </div>

      {shortLinks.length > 0 ? (
        <div className="flex items-center justify-between py-4 w-full border-t-1 border-t-gray-200">
          <div className="flex flex-col justify-between">
            <span className="text-md/(line-height-md) font-(weight:--font-semibold) text-blue-base">
              www.youtube.com
            </span>
            <span className="text-sm/(line-height-sm) text-gray-500">
              Youtube
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm/(line-height-sm) text-gray-500 l">
              30 acessos
            </span>
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center p-2 rounded-sm bg-gray-200 hover:cursor-pointer active:scale-95 transition-all duration-100">
                <CopyIcon />
              </button>
              <button className="flex items-center justify-center p-2 rounded-sm bg-gray-200 hover:cursor-pointer active:scale-95 transition-all duration-100">
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 pt-4 pb-6 w-full border-t-1 border-t-gray-200">
          <LinkIcon fontSize={32} />

          <span className="text-xs/(--line-height-xs) text-gray-500 uppercase">
            Ainda não existem links cadastrados
          </span>
        </div>
      )}
    </div>
  );
};
