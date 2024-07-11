import { useRouteError } from "react-router-dom";

useRouteError;

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Opps! Something Went Wrong!</h1>
      <h2>
        {err.status} : {err.statusText}
      </h2>
      <h2>{err.error.message}</h2>
    </div>
  );
};
export default Error;
