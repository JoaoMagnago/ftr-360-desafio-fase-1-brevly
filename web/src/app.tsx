import { ShortLinkForm } from './components/short-link-form';
import { ShortLinksList } from './components/short-links-list';

import logo from './assets/Logo.svg';

export function App() {
  return (
    <main className="h-dvh flex flex-col items-start gap-8 px-3">
      <div className="flex items-center justify-center gap-5 flex-col w-full mt-[5.5rem] lg:flex-row lg:items-start">
        <div className="flex flex-col items-start gap-8 w-full lg:max-w-[23.75rem]">
          <img src={logo} aria-label={'logo do brev.ly'} className="h-8" />
          <ShortLinkForm />
        </div>

        <ShortLinksList />
      </div>
    </main>
  );
}
