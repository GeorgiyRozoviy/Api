import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center gap-8 mt-10">
      <h1 className="text-red-400 text-5xl">404</h1>
      <p className="text-3xl">Page not found.</p>
      <Link
        className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600 text-white"
        to="/">
        Back
      </Link>
    </div>
  );
}
