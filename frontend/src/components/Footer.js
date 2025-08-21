// frontend/src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Scholarship Selector. All rights reserved.</p>
      </div>
    </footer>
  );
}