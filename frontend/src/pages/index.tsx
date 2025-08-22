import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Fair. Transparent. AI-powered Scholarship Selection.
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-0 animate-fade-in-up animation-delay-300">
            Revolutionizing the way scholarships are awarded, ensuring equity and efficiency.
          </p>
          <Link href="/upload" className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-600">
            Upload Applicants Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            About the Scholarship Selector
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            The Scholarship Selector is an AI-powered platform designed to streamline and enhance the applicant selection process for LSETF/PLP programs.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            It analyzes diverse applicant data, ranks candidates based on predefined criteria, and generates transparent recommendations, ensuring fairness and efficiency in scholarship allocation.
          </p>
        </div>
      </section>
    </div>
  );
}