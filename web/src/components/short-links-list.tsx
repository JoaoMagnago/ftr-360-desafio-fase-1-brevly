import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';

export const ShortLinksList = ({
  shortLinks = [],
}: {
  shortLinks?: string[];
}) => {
  return (
    <div className="flex items-center flex-col gap-5 p-8 rounded-lg bg-gray-100  w-full max-w-[380px] lg:max-w-[580px]">
      <div className="flex justify-between w-full">
        <h2 className="text-xl/8 font-(weight:--font-bold) text-gray-600">
          Meus links
        </h2>

        <button className="flex items-center p-2 rounded-sm cursor-pointer gap-1.5 bg-gray-200 hover:brightness-101 ease-in-out">
          <DownloadSimpleIcon fontSize={16} />
          <span className="text-sm font-(weight:--font-semibold) text-gray-500">
            Baixar CSV
          </span>
        </button>
      </div>

      {shortLinks.length > 0 ? (
        <></>
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
