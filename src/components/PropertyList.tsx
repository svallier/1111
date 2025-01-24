import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
}

export function PropertyList({ properties, onPropertyClick }: PropertyListProps) {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={onPropertyClick}
          compact
        />
      ))}
    </div>
  );
}