import React, { useState, useRef, useEffect } from 'react';
import { Euro, Calculator } from 'lucide-react';
import { calculateMaxLoanAmount } from '../utils/loanCalculator';
import { FilterState } from '../types';

interface LoanCalculatorProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  standalone?: boolean;
}

export function LoanCalculator({ filters, onFilterChange, standalone = false }: LoanCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [currentDebt, setCurrentDebt] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(standalone);
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calculatorRef.current && !calculatorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen && !standalone) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, standalone]);

  const handleValidate = () => {
    if (monthlyIncome > 0) {
      const maxLoan = calculateMaxLoanAmount(monthlyIncome, currentDebt);
      onFilterChange({ 
        ...filters, 
        loanAmount: maxLoan,
        downPayment: downPayment
      });
      if (!standalone) setIsOpen(false);
    }
  };

  const totalBudget = filters.loanAmount + filters.downPayment;

  const calculator = (
    <div className={standalone ? '' : 'absolute z-20 mt-2 p-4 bg-white rounded-lg shadow-lg border w-80'}>
      {!standalone && <h3 className="font-semibold mb-4">Calculateur de capacité d'emprunt</h3>}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Revenus mensuels nets
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border rounded-md"
              value={monthlyIncome || ''}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              placeholder="0"
            />
            <Euro className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mensualités de crédit en cours
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border rounded-md"
              value={currentDebt || ''}
              onChange={(e) => setCurrentDebt(Number(e.target.value))}
              placeholder="0"
            />
            <Euro className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apport personnel
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border rounded-md"
              value={downPayment || ''}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              placeholder="0"
            />
            <Euro className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleValidate}
          disabled={monthlyIncome <= 0}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Calculer
        </button>

        {filters.loanAmount > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Votre budget total est de:
            </p>
            <p className="text-lg font-semibold text-blue-900">
              {(filters.loanAmount + filters.downPayment).toLocaleString()}€
            </p>
            <div className="text-xs text-blue-600 mt-1 space-y-1">
              <p>Capacité d'emprunt: {filters.loanAmount.toLocaleString()}€</p>
              <p>Apport: {filters.downPayment.toLocaleString()}€</p>
              <p>Taux: 4.5% sur 25 ans</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (standalone) {
    return calculator;
  }

  return (
    <div className="relative" ref={calculatorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:border-gray-400 focus:outline-none"
      >
        <Calculator className="w-4 h-4" />
        <span>Budget total: {totalBudget ? `${(totalBudget / 1000).toFixed(0)}k€` : 'Non calculé'}</span>
      </button>

      {isOpen && calculator}
    </div>
  );
}