import React, { ReactNode } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
