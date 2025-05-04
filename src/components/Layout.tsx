import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import TopBar from './TopBar';
import Footer from './Footer';
import LiveChatWidget from './LiveChatWidget';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
      <LiveChatWidget />
    </div>
  );
};

export default Layout;