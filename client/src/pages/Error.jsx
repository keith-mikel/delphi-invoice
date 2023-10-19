import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="hero is-fullheight is-danger is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </section>
  );
}
