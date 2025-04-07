
// We need to add the Footer component to the existing PracticeSQL page
// Since this is a read-only file, we'll create a new wrapper component

import React from 'react';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

// Since we can't modify the original PracticeSQL component,
// we're creating this wrapper to surround it with our new footer
const PracticeSQLWithFooter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PracticeSQLWithFooter;
