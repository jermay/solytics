import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-12 min-h-screen">
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <i>{error?.statusText || error?.message}</i>
    </section>
  );
}
