import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Property, FilterState } from './types';
import { PropertyCard } from './components/PropertyCard';
import { Filters } from './components/Filters';
import { PropertyMap } from './components/Map';
import { Building, LogIn, List, Map as MapIcon } from 'lucide-react';
import { mockProperties } from './data/mockProperties';
import { LoanCalculator } from './components/LoanCalculator';
import { InvestmentCart } from './components/InvestmentCart';
import { InvestmentGuide } from './components/InvestmentGuide';
import { Tools } from './components/Tools';
import { BrokerContact } from './components/BrokerContact';
import { ProjectChatbot } from './components/ProjectChatbot';

const initialFilters: FilterState = {
  city: '',
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,
  minCashflow: 0,
  maxCashflow: 0,
  propertyType: [],
  minGrossYield: 0,
  maxGrossYield: 0,
  minRooms: 0,
  loanAmount: 0,
  downPayment: 0,
  includedExpenses: ['monthlyCharges', 'propertyTax', 'insurance'],
  minScore: 'D'
};

function MainApp() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [cartProperties, setCartProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [currentView, setCurrentView] = useState<'search' | 'favorites'>('search');
  const [highlightedProperties, setHighlightedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  const handlePropertyClick = (id: string) => {
    setSelectedProperty(id);
  };

  const handleAddToCart = (property: Property) => {
    if (!cartProperties.find(p => p.id === property.id)) {
      setCartProperties([...cartProperties, property]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartProperties(cartProperties.filter(p => p.id !== id));
  };

  const handleToggleFavorite = (property: Property) => {
    if (favorites.find(p => p.id === property.id)) {
      setFavorites(favorites.filter(p => p.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  const handleUpdateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(current => ({
      ...current,
      ...newFilters
    }));
  };

  // Filter properties based on current filters
  const filteredProperties = mockProperties.filter(property => {
    if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    if (filters.minPrice > 0 && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice > 0 && property.price > filters.maxPrice) {
      return false;
    }

    if (filters.minArea > 0 && property.area < filters.minArea) {
      return false;
    }
    if (filters.maxArea > 0 && property.area > filters.maxArea) {
      return false;
    }

    if (filters.minRooms > 0 && property.rooms < filters.minRooms) {
      return false;
    }

    if (filters.minCashflow > 0 && property.metrics.cashflow < filters.minCashflow) {
      return false;
    }
    if (filters.maxCashflow > 0 && property.metrics.cashflow > filters.maxCashflow) {
      return false;
    }

    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
      return false;
    }

    const totalBudget = filters.loanAmount + filters.downPayment;
    if (totalBudget > 0 && property.price > totalBudget * 1.1) {
      return false;
    }

    return true;
  });

  const displayProperties = currentView === 'favorites' ? favorites : filteredProperties;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">InvestImmo</h1>
            </div>
            <div className="flex items-center space-x-6">
              <InvestmentGuide />
              <LoanCalculator filters={filters} onFilterChange={setFilters} />
              <nav className="flex space-x-4">
                <button 
                  onClick={() => setCurrentView('search')}
                  className={`${
                    currentView === 'search' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Recherche
                </button>
                <button 
                  onClick={() => setCurrentView('favorites')}
                  className={`${
                    currentView === 'favorites' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Favoris ({favorites.length})
                </button>
                <Link to="/tools" className="text-gray-500 hover:text-gray-900">
                  Nos outils
                </Link>
              </nav>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => console.log('Login clicked')}
              >
                <LogIn className="w-4 h-4" />
                <span>Connexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {currentView === 'search' && (
          <div className="mb-6">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>
        )}

        {/* View toggle and results count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {displayProperties.length} biens {currentView === 'favorites' ? 'favoris' : 'à vendre'}
          </div>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
              Liste
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setViewMode('map')}
            >
              <MapIcon className="w-4 h-4" />
              Carte
            </button>
          </div>
        </div>

        {/* Properties display */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={handlePropertyClick}
                loanAmount={filters.loanAmount}
                onAddToCart={handleAddToCart}
                isInCart={cartProperties.some(p => p.id === property.id)}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.some(p => p.id === property.id)}
                includedExpenses={filters.includedExpenses.reduce((acc, curr) => ({
                  ...acc,
                  [curr]: true
                }), {
                  monthlyCharges: false,
                  propertyTax: false,
                  insurance: false
                })}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 h-[800px]">
            {/* Liste des biens */}
            <div className="w-1/2 overflow-y-auto pr-4">
              <div className="space-y-4">
                {displayProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={handlePropertyClick}
                    loanAmount={filters.loanAmount}
                    onAddToCart={handleAddToCart}
                    isInCart={cartProperties.some(p => p.id === property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.some(p => p.id === property.id)}
                    includedExpenses={filters.includedExpenses.reduce((acc, curr) => ({
                      ...acc,
                      [curr]: true
                    }), {
                      monthlyCharges: false,
                      propertyTax: false,
                      insurance: false
                    })}
                    compact
                  />
                ))}
              </div>
            </div>

            {/* Carte */}
            <div className="w-1/2 h-full">
              <PropertyMap
                properties={displayProperties}
                onMarkerClick={handlePropertyClick}
                selectedPropertyId={selectedProperty}
              />
            </div>
          </div>
        )}
      </main>

      {/* Shopping Cart */}
      <InvestmentCart
        properties={cartProperties}
        onRemove={handleRemoveFromCart}
        loanAmount={filters.loanAmount}
      />

      {/* Chatbot */}
      <ProjectChatbot
        onUpdateFilters={handleUpdateFilters}
        onHighlightProperties={setHighlightedProperties}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact-broker" element={<BrokerContact />} />
      </Routes>
    </Router>
  );
}