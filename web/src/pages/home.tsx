import logo from '../assets/Logo.svg';
import { PageContainer } from '../components/page-container';
import { ShortLinkForm } from '../components/short-link-form';
import { ShortLinksList } from '../components/short-links-list';

export const Home = () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 auto-rows-min items-center gap-5  -mt-50 w-full lg:max-w-[60%] lg:grid-cols-[3fr_5fr] lg:items-start lg:justify-center">
        <div className="flex flex-col items-start gap-8 w-full">
          <img src={logo} aria-label={'logo do brev.ly'} className="h-8" />
          <ShortLinkForm />
        </div>

          <ShortLinksList />
      </div>
    </PageContainer>
  );
};
