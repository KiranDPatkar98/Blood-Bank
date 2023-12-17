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
      <div className="mt-5 mb-5 pt-3" style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
