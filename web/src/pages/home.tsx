import { PageContainer } from '../components/page-container';
import { ShortLinkForm } from '../components/short-link-form';
import { ShortLinksList } from '../components/short-links-list';

import logo from '../assets/Logo.svg';

export const Home = () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-[3fr_5fr] items-center justify-center gap-5 flex-col h-dvh w-full mt-[15%] lg:max-w-[60%] lg:flex-row lg:items-start">
        <div className="flex flex-col items-start gap-8 w-full">
          <img src={logo} aria-label={'logo do brev.ly'} className="h-8" />
          <ShortLinkForm />
        </div>

        <ShortLinksList />
      </div>
    </PageContainer>
  );
};
