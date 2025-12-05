import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Render the page here */}
      </main>
      <Footer />
    </div>
  );
}
