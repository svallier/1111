import React from 'react';
import { Calculator, TrendingUp, Building2, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoanCalculator } from './LoanCalculator';

export function Tools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la recherche
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Outils d'investissement</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Calculateur de capacité d'emprunt */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Capacité d'emprunt</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Calculez votre capacité d'emprunt en fonction de vos revenus et charges actuelles.
            </p>
            <LoanCalculator 
              filters={{ 
                city: '', minPrice: 0, maxPrice: 0, minArea: 0, maxArea: 0,
                minCashflow: 0, maxCashflow: 0, propertyType: [], minGrossYield: 0,
                maxGrossYield: 0, minRooms: 0, loanAmount: 0, downPayment: 0
              }}
              onFilterChange={() => {}}
              standalone
            />
          </div>

          {/* Simulateur de rentabilité */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Simulateur de rentabilité</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Estimez la rentabilité de votre investissement en prenant en compte tous les frais.
            </p>
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              Bientôt disponible
            </button>
          </div>

          {/* Frais de notaire */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Frais de notaire</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Calculez les frais de notaire pour votre acquisition immobilière.
            </p>
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              Bientôt disponible
            </button>
          </div>

          {/* Estimation loyer */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold">Estimation loyer</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Estimez le loyer potentiel de votre bien en fonction du marché local.
            </p>
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              Bientôt disponible
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}