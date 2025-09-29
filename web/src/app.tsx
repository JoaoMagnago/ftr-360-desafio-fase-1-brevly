import { Route, Routes } from 'react-router-dom';
import { HOME_ROUTE, NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './constants/routes';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Redirect } from './pages/redirect';

export function App() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={REDIRECT_ROUTE} element={<Redirect />} />
      <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
