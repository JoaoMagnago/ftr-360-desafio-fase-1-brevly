import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Redirect } from './pages/redirect';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortUrl" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
