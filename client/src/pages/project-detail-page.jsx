import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-obsidian text-neutral-400 flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
        Project Detail Page Placeholder
      </h1>
      <p className="text-glow-cyan font-mono mb-8">
        Project Slug: /projects/{slug}
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-neutral-900 border border-obsidian-border text-white rounded-xl hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ProjectDetailPage;
