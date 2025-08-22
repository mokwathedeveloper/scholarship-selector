import React from 'react';
import Link from 'next/link';
import { UploadCloud, Award, ShieldCheck, Plug } from 'lucide-react'; // Import Lucide icons

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

      {/* Promoters/Partners Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Our Valued Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <img src="https://via.placeholder.com/150x80?text=Partner+1" alt="Partner 1" className="mx-auto opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <img src="https://via.placeholder.com/150x80?text=Partner+2" alt="Partner 2" className="mx-auto opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <img src="https://via.placeholder.com/150x80?text=Partner+3" alt="Partner 3" className="mx-auto opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <img src="https://via.placeholder.com/150x80?text=Partner+4" alt="Partner 4" className="mx-auto opacity-75 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <UploadCloud className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Applicants</h3>
              <p className="text-gray-600">Easily upload diverse applicant data including resumes and assessments.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <Award className="text-green-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Ranking</h3>
              <p className="text-gray-600">Leverage advanced AI to rank candidates based on predefined criteria.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <ShieldCheck className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Transparency & Fairness</h3>
              <p className="text-gray-600">Ensure unbiased selection with transparent scoring and recommendations.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <Plug className="text-red-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">LMS Integration</h3>
              <p className="text-gray-600">Seamlessly integrate with LSETF's upcoming Learning Management System.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}