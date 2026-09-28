import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="font-telex text-center text-gray-700 dark:text-gray-50 pin-b p-6 text-md lg:text-lg">
      © {new Date().getFullYear()}, Built with ☕️ & 💖 by{' '}
      <Link className="font-bold hover:underline" href="/about">
        Aditya
      </Link>
    </footer>
  );
};
