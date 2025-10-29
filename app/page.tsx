'use client';

import MainContent from '@/layout/MainContent';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
