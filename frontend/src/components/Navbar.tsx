// frontend/src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Scholarship Selector
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/upload" className="hover:text-gray-300">
            Upload
          </Link>
          <Link href="/rank" className="hover:text-gray-300">
            Rank
          </Link>
        </div>
      </div>
    </nav>
  );
}