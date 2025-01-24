import React from 'react';
import { ShoppingCart, X, TrendingUp, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { useNavigate } from 'react-router-dom';

interface InvestmentCartProps {
  properties: Property[];
  onRemove: (id: string) => void;
  loanAmount: number;
}

export function InvestmentCart({ properties, onRemove, loanAmount }: InvestmentCartProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  if (properties.length === 0) return null;

  // Calculate global metrics
  const totalInvestment = properties.reduce((sum, p) => sum + p.price, 0);
  const totalAnnualCashflow = properties.reduce((sum, p) => sum + p.metrics.annualCashflow, 0);
  const globalYield = +(totalAnnualCashflow / totalInvestment * 100).toFixed(2);
  const totalMonthlyPayment = properties.reduce((sum, p) => sum + p.metrics.monthlyLoanPayment, 0);

  const handleValidateCart = () => {
    navigate('/contact-broker', { 
      state: { 
        properties,
        totalInvestment,
        totalMonthlyPayment,
        totalAnnualCashflow,
        globalYield
      } 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          {properties.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Mon portefeuille</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {properties.map(property => (
              <div key={property.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex-1">
                  <p className="font-medium text-sm">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.price.toLocaleString()}€</p>
                </div>
                <button
                  onClick={() => onRemove(property.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Investissement total:</span>
                <span className="font-semibold">{totalInvestment.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mensualité totale:</span>
                <span className="font-semibold">{totalMonthlyPayment.toLocaleString()}€/mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cashflow annuel:</span>
                <span className="font-semibold text-blue-600">
                  {totalAnnualCashflow > 0 ? '+' : ''}{totalAnnualCashflow.toLocaleString()}€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Rendement global:</span>
                </div>
                <span className="font-semibold text-blue-600">{globalYield}%</span>
              </div>
            </div>

            <button
              onClick={handleValidateCart}
              className="w-full mt-4 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Valider mon portefeuille</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}