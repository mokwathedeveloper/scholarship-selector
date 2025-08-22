import { Facebook, Twitter, Linkedin } from "lucide-react";
import { navLinks } from './NavLinks';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold text-white">Scholarship Selector</h2>
          <p className="mt-3 text-sm text-gray-400">
            AI-powered scholarship selection tool. 
            Transparent, fair, and efficient for institutions and applicants.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}><a href={link.href} className="hover:text-white transition">{link.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Email: <a href="mailto:info@scholarshipselector.com" className="hover:text-white">info@scholarshipselector.com</a></li>
            <li>Phone: <a href="tel:+11234567890" className="hover:text-white">+1 (123) 456-7890</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-blue-500 transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Scholarship Selector. All rights reserved.
      </div>
    </footer>
  );
}