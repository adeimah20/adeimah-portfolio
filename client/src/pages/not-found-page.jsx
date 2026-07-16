import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-obsidian text-neutral-400 flex flex-col justify-center items-center px-6">
      <h1 className="text-6xl text-white font-bold mb-4 font-mono">404</h1>
      <h2 className="text-2xl text-white font-semibold mb-6">Page Not Found</h2>
      <p className="text-neutral-500 mb-8 max-w-md text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 hover:scale-[1.02] transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
