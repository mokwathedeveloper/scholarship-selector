import Navbar from './Navbar';

import { LayoutProps } from '../types/layout'; // Import the interface

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
    </div>
  );
}
