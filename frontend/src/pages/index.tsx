import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { UploadCloud, Award, ShieldCheck, Plug, ChevronDown } from 'lucide-react'; // Import Lucide icons

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const faqs = [
    {
      question: 'What is the Scholarship Selector?',
      answer: 'It's an AI-powered platform that streamlines scholarship applicant selection for LSETF/PLP programs.',
    },
    {
      question: 'How does it ensure fairness?',
      answer: 'By using predefined criteria and transparent AI ranking, it minimizes human bias in the selection process.',
    },
    {
      question: 'What kind of data does it analyze?',
      answer: 'It processes resumes, cover letters, assessments, and other relevant applicant data.',
    },
    {
      question: 'Can it integrate with existing systems?',
      answer: 'Yes, it's designed for smooth integration with LSETF's upcoming LMS and other systems.',
    },
    {
      question: 'Is my data secure?',
      answer: 'We prioritize data security and privacy, employing robust measures to protect all applicant information.',
    },
  ];

  const termsAndConditions = `
    Welcome to Scholarship Selector. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully. Our service provides an AI-powered tool for scholarship applicant selection. We strive for fairness and transparency in all our processes. Data submitted to the platform will be used solely for the purpose of applicant evaluation and will be handled in accordance with our Privacy Policy. We reserve the right to modify these terms at any time. Your continued use of the platform constitutes acceptance of the updated terms. For any questions, please contact us.
  `;

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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-5 font-semibold text-lg text-left text-gray-800 focus:outline-none focus:bg-gray-100 transition duration-300"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : 'rotate-0'}`}
                    size={24}
                  />
                </button>
                {openFAQ === index && (
                  <div className="p-5 pt-0 text-gray-600 border-t border-gray-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Terms and Conditions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 text-left line-clamp-3">
            {termsAndConditions}
          </p>
          <button
            onClick={() => setShowTermsModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      </section>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
            <p className="text-gray-700 whitespace-pre-wrap text-left mb-6">{termsAndConditions}</p>
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 font-inter">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <p className="text-lg font-semibold">Contact Us:</p>
            <p className="text-gray-400">Email: info@scholarshipselector.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Scholarship Selector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}