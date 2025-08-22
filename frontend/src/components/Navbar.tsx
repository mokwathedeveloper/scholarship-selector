import Link from 'next/link';
import React, { useEffect, useState } from 'react'; // Import React, useEffect, useState
import { Home as HomeIcon, UploadCloud, Award, LayoutGrid, Users, ClipboardList, LogIn, UserPlus, LogOut } from 'lucide-react'; // Import Lucide icons, add LogOut
import { navLinks } from './NavLinks';
import { isAuthenticated, getUserRole, logout } from '../utils/auth'; // Import auth helpers

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setUserRole(getUserRole());

    // Listen for changes in local storage (e.g., login/logout)
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
      setUserRole(getUserRole());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserRole(null);
    // Optionally redirect to home or login page
    // router.push('/'); // If using useRouter
  };

  return (
    <nav className="bg-gray-800 p-4 text-white fixed top-0 w-full z-50 shadow-md font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Award className="mr-2" size={24} /> Scholarship Selector
        </Link>
        <div className="space-x-4 flex items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gray-300 flex items-center">
              {link.name === "Home" && <HomeIcon className="mr-1" size={18} />}
              {link.name === "Upload" && <UploadCloud className="mr-1" size={18} />}
              {link.name === "Rank" && <Award className="mr-1" size={18} />}
              {link.name === "Programs" && <LayoutGrid className="mr-1" size={18} />}
              {link.name === "Applicants" && <Users className="mr-1" size={18} />}
              {link.name === "Audits" && <ClipboardList className="mr-1" size={18} />}
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              {userRole === 'user' && (
                <Link href="/user/dashboard" className="hover:text-gray-300 flex items-center">
                  <Users className="mr-1" size={18} /> Dashboard
                </Link>
              )}
              {userRole === 'admin' && (
                <Link href="/admin/dashboard" className="hover:text-gray-300 flex items-center">
                  <LayoutGrid className="mr-1" size={18} /> Admin
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-gray-300 flex items-center bg-transparent border-none text-white cursor-pointer">
                <LogOut className="mr-1" size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 flex items-center">
                <LogIn className="mr-1" size={18} /> Login
              </Link>
              <Link href="/register" className="hover:text-gray-300 flex items-center">
                <UserPlus className="mr-1" size={18} /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}