import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-fuchsia-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-400 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
      </div>

      <div className="space-y-4">
        <Link to="/" className="btn btn-primary btn-lg px-8">
          Go Back Home
        </Link>
      </div>

      <div className="mt-12 text-6xl">🛒</div>
    </div>
  );
};

export default NotFound;
