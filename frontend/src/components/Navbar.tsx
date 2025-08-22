import Link from 'next/link';
import { Home as HomeIcon, UploadCloud, Award, LayoutGrid, Users, ClipboardList, LogIn, UserPlus } from 'lucide-react'; // Import Lucide icons

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white fixed top-0 w-full z-50 shadow-md font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Award className="mr-2" size={24} /> Scholarship Selector
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-gray-300 flex items-center">
            <HomeIcon className="mr-1" size={18} /> Home
          </Link>
          <Link href="/upload" className="hover:text-gray-300 flex items-center">
            <UploadCloud className="mr-1" size={18} /> Upload
          </Link>
          <Link href="/rank" className="hover:text-gray-300 flex items-center">
            <Award className="mr-1" size={18} /> Rank
          </Link>
          <Link href="/programs" className="hover:text-gray-300 flex items-center">
            <LayoutGrid className="mr-1" size={18} /> Programs
          </Link>
          <Link href="/applicants" className="hover:text-gray-300 flex items-center">
            <Users className="mr-1" size={18} /> Applicants
          </Link>
          <Link href="/audits" className="hover:text-gray-300 flex items-center">
            <ClipboardList className="mr-1" size={18} /> Audits
          </Link>
          <Link href="/login" className="hover:text-gray-300 flex items-center">
            <LogIn className="mr-1" size={18} /> Login
          </Link>
          <Link href="/register" className="hover:text-gray-300 flex items-center">
            <UserPlus className="mr-1" size={18} /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
}