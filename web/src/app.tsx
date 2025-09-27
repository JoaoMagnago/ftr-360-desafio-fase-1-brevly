import { ShortLinkForm } from './components/short-link-form';
import { ShortLinksList } from './components/short-links-list';

import logo from './assets/Logo.svg';

export function App() {
  return (
    <main className="h-dvh flex flex-col items-start gap-8 p-3">
      <img
        src={logo}
        aria-label={'logo do brev.ly'}
        className="h-8 mt-[88px] ml-[8%]"
      />
      <div className="flex items-center justify-center gap-5 flex-col w-full lg:flex-row lg:items-start">
        <ShortLinkForm />
        <ShortLinksList />
      </div>
    </main>
  );
}
