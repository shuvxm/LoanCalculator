
import React from 'react';
import Navbar from '@/components/Navbar';
import LoanCalculator from '@/components/LoanCalculator';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <LoanCalculator />
      </div>
    </div>
  );
};

export default Index;
