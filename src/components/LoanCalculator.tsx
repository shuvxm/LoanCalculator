
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AmortizationTable from './AmortizationTable';

interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LoanCalculator = () => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 100000,
    interestRate: 8.5,
    loanTerm: 5
  });
  
  const [monthlyEMI, setMonthlyEMI] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [currency, setCurrency] = useState("USD");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanDetails({
      ...loanDetails,
      [name]: parseFloat(value) || 0
    });
  };

  const calculateEMI = () => {
    const P = loanDetails.loanAmount;
    const R = (loanDetails.interestRate / 12) / 100;
    const N = loanDetails.loanTerm * 12;
    
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setMonthlyEMI(emi);
    
    // Calculate amortization schedule
    let balance = P;
    const schedule: AmortizationRow[] = [];
    
    for (let month = 1; month <= N; month++) {
      const interestPayment = balance * R;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance
      });
    }
    
    setAmortizationSchedule(schedule);
  };

  const resetCalculator = () => {
    setMonthlyEMI(null);
    setAmortizationSchedule([]);
  };

  return (
    <div className="loan-calculator-container">
      <h1 className="text-4xl font-bold mb-8">Loan Calculator Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount
          </label>
          <Input
            id="loanAmount"
            name="loanAmount"
            type="number"
            value={loanDetails.loanAmount}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <Input
            id="interestRate"
            name="interestRate"
            type="number"
            step="0.01"
            value={loanDetails.interestRate}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
            Term (Years)
          </label>
          <Input
            id="loanTerm"
            name="loanTerm"
            type="number"
            value={loanDetails.loanTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <Button 
          variant="default" 
          onClick={calculateEMI}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          CALCULATE
        </Button>
      </div>
      
      {monthlyEMI !== null && (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Monthly EMI: ${monthlyEMI.toFixed(2)}
          </h2>
          
          <div className="flex justify-between mb-6">
            <div className="w-32">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="destructive"
              className="hover:bg-gray-400 border-2"
              style={{ backgroundColor: "white", color: "#9370DB", borderColor: "#D8BFD8" }} // Light purple border, medium purple text
              onClick={resetCalculator}
            >
              RESET TABLE
            </Button>
          </div>
          
          <AmortizationTable
            amortizationData={amortizationSchedule}
            currency={currency}
          />
        </>
      )}
    </div>
  );
};

export default LoanCalculator;
