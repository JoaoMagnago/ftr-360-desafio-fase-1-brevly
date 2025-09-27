import { ShortLinkForm } from './components/short-link-form';
import { ShortLinksList } from './components/short-links-list';

export function App() {
  return (
    <main className="h-dvh flex items-center justify-center p-3">
      <div className="flex items-center justify-center gap-5 flex-col w-full lg:flex-row lg:items-start">
        <ShortLinkForm />
        <ShortLinksList />
      </div>
    </main>
  );
}
