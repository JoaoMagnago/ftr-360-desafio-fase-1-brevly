import { useParams } from 'react-router-dom';

export const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  console.log('Redirectign to:', shortUrl);

  return <main>Redirect</main>;
};
