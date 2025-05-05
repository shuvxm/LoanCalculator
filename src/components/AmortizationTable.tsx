
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface AmortizationTableProps {
  amortizationData: AmortizationRow[];
  currency: string;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ amortizationData, currency }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Amortization Schedule ({currency})</h2>
      
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-1">Month</TableHead>
              <TableHead className="px-1">Principal</TableHead>
              <TableHead className="px-1">Interest</TableHead>
              <TableHead className="px-1">Remaining Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {amortizationData.map((row) => (
              <TableRow key={row.month}>
                <TableCell className="px-1">{row.month}</TableCell>
                <TableCell className="px-1">{row.principal.toFixed(2)} {currency}</TableCell>
                <TableCell className="px-1">{row.interest.toFixed(2)} {currency}</TableCell>
                <TableCell className="px-1">{row.remainingBalance.toFixed(2)} {currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AmortizationTable;
