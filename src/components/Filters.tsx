import React from 'react';
import { Search, Euro, Home, MapPin, Maximize2, Grid, Settings2, Award } from 'lucide-react';
import { FilterState, ExpenseType, ScoreType } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const propertyTypes = [
  { value: 'house', label: 'Maison' },
  { value: 'apartment', label: 'Appartement' },
  { value: 'building', label: 'Immeuble' },
  { value: 'land', label: 'Terrain' }
] as const;

const expenseTypes: { value: ExpenseType; label: string }[] = [
  { value: 'monthlyCharges', label: 'Charges de copropriété' },
  { value: 'propertyTax', label: 'Taxe foncière' },
  { value: 'insurance', label: 'Assurance PNO' }
];

const scoreTypes: { value: ScoreType; label: string; color: string }[] = [
  { value: 'A', label: 'A et plus', color: 'bg-green-500' },
  { value: 'B', label: 'B et plus', color: 'bg-blue-500' },
  { value: 'C', label: 'C et plus', color: 'bg-orange-500' },
  { value: 'D', label: 'Tous', color: 'bg-red-500' }
];

export function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
      {/* Ligne 1 */}
      <div className="space-y-4">
        {/* Ville */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Ville</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={filters.city}
              onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Type de bien */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Type de bien</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  filters.propertyType.includes(value)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.propertyType.includes(value)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.propertyType, value]
                      : filters.propertyType.filter(t => t !== value);
                    onFilterChange({ ...filters, propertyType: newTypes });
                  }}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Ligne 2 */}
      <div className="space-y-4">
        {/* Prix */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Budget</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border rounded-lg"
              value={filters.minPrice || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                onFilterChange({
                  ...filters,
                  minPrice: value,
                  maxPrice: filters.maxPrice > 0 && value > filters.maxPrice ? value : filters.maxPrice
                });
              }}
              min="0"
              step="10000"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border rounded-lg"
              value={filters.maxPrice || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                onFilterChange({
                  ...filters,
                  maxPrice: value,
                  minPrice: value > 0 && filters.minPrice > value ? value : filters.minPrice
                });
              }}
              min={filters.minPrice}
              step="10000"
            />
          </div>
        </div>

        {/* Surface */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Maximize2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Surface (m²)</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border rounded-lg"
              value={filters.minArea || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                onFilterChange({
                  ...filters,
                  minArea: value,
                  maxArea: filters.maxArea > 0 && value > filters.maxArea ? value : filters.maxArea
                });
              }}
              min="0"
              step="5"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border rounded-lg"
              value={filters.maxArea || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                onFilterChange({
                  ...filters,
                  maxArea: value,
                  minArea: value > 0 && filters.minArea > value ? value : filters.minArea
                });
              }}
              min={filters.minArea}
              step="5"
            />
          </div>
        </div>
      </div>

      {/* Ligne 3 */}
      <div className="space-y-4">
        {/* Pièces */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Grid className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Nombre de pièces</span>
          </div>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={filters.minRooms}
            onChange={(e) => onFilterChange({ ...filters, minRooms: Number(e.target.value) })}
          >
            <option value="0">Tous</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}+ pièces</option>
            ))}
          </select>
        </div>

        {/* Score minimum */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Score minimum</span>
          </div>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={filters.minScore || 'D'}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              minScore: e.target.value as ScoreType 
            })}
          >
            {scoreTypes.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ligne 4 */}
      <div className="space-y-4">
        {/* Charges à inclure */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Charges à inclure</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expenseTypes.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  filters.includedExpenses.includes(value)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.includedExpenses.includes(value)}
                  onChange={(e) => {
                    const newExpenses = e.target.checked
                      ? [...filters.includedExpenses, value]
                      : filters.includedExpenses.filter(exp => exp !== value);
                    onFilterChange({ ...filters, includedExpenses: newExpenses });
                  }}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}