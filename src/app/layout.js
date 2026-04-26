import './globals.css';

export const metadata = {
  title: 'Accredian Enterprise | Professional Training & Certification',
  description: 'Recreate high-performance teams through expert learning. Specialized programs designed to fuel innovation.',
};

import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
