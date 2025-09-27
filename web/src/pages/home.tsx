import { ShortLinkForm } from '../components/short-link-form';
import { ShortLinksList } from '../components/short-links-list';

import logo from '../assets/Logo.svg';

export const Home = () => {
  return (
    <main className="h-dvh flex flex-col items-center gap-8 px-3">
      <div className="flex flex-1 items-center justify-center gap-5 flex-col w-full mt-[5.5rem] lg:max-w-[75%] lg:flex-row lg:items-start">
        <div className="flex flex-col items-start gap-8 w-full">
          <img src={logo} aria-label={'logo do brev.ly'} className="h-8" />
          <ShortLinkForm />
        </div>

        <ShortLinksList />
      </div>
    </main>
  );
};
