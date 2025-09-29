import {
  DownloadSimpleIcon,
  LinkIcon
} from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { exportShortLinks } from '../http/routes/export-short-links';
import { getShortLinks } from '../http/routes/get-short-links';
import { downloadUrl } from '../utils/downloadUrl';
import { ShortLinkItem } from './short-links-item';
import { Button } from './ui/button';

export const ShortLinksList = () => {
  const [shouldExportToCSV, setShouldExportToCSV] = useState(false)

  const { data: shortLinksData, isError: isShortLinksError, isLoading: isLoadingShortLinks } = useQuery({
    queryKey: ["short-links"],
    queryFn: getShortLinks,
  });

  useQuery({
    queryKey: ["export-short-links"],
    queryFn: () => {
      exportShortLinks()
        .then((response) => downloadUrl(response.reportUrl))
        .finally(() => setShouldExportToCSV(false))
    },
    enabled: shouldExportToCSV,
    retry: false
  });

  const shortLinks = useMemo(() => shortLinksData?.shortLinks ?? [], [shortLinksData]);

  return (
    <div className="flex items-center flex-col gap-5 p-8 rounded-lg bg-gray-100 w-full lg:mt-16">
      <div className="flex justify-between w-full">
        <h2 className="text-lg text-gray-600">Meus links</h2>

        <Button
          type="button"
          size={"sm"}
          color={"primary"}
          spinnerColor='text-gray-500'
          className='min-w-25'
          disabled={!shortLinks || shortLinks.length === 0}
          isLoading={shouldExportToCSV}
          onClick={() => setShouldExportToCSV(true)}
        >
          <DownloadSimpleIcon fontSize={16} />
          <span className="text-sm-semibold font-(weight:--font-semibold) text-gray-500">
            Baixar CSV
          </span>
        </Button>
      </div>

      <div className="flex flex-col w-full max-h-[400px] overflow-y-auto">
        {!!shortLinks && shortLinks.length > 0 && !isLoadingShortLinks && !isShortLinksError ? (
          shortLinks.map((link) => (
            <ShortLinkItem key={link.id} shortLink={link} />
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
