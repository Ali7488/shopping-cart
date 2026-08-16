import { Link } from "react-router";

export default function ErrorElement() {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/">Go Back to Homepage</Link>
    </>
  );
}
