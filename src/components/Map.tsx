import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '../types';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  className: 'selected-marker'
});

interface MapProps {
  properties: Property[];
  onMarkerClick: (id: string) => void;
  selectedPropertyId?: string | null;
}

// Coordonnées approximatives des villes françaises
const cityCoordinates: Record<string, [number, number]> = {
  'Paris': [48.8566, 2.3522],
  'Lyon': [45.7578, 4.8320],
  'Marseille': [43.2965, 5.3698],
  'Bordeaux': [44.8378, -0.5792],
  'Toulouse': [43.6047, 1.4442],
  'Nantes': [47.2184, -1.5536],
  'Strasbourg': [48.5734, 7.7521],
  'Lille': [50.6292, 3.0573],
  'Montpellier': [43.6108, 3.8767],
  'Rennes': [48.1173, -1.6778]
};

export function PropertyMap({ properties, onMarkerClick, selectedPropertyId }: MapProps) {
  return (
    <MapContainer
      center={[46.603354, 1.888334]} // Centre de la France
      zoom={6}
      className="w-full h-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => {
        const coords = cityCoordinates[property.location.city];
        if (!coords) return null;
        
        const isSelected = selectedPropertyId === property.id;
        
        return (
          <Marker
            key={property.id}
            position={coords}
            icon={isSelected ? selectedIcon : icon}
            eventHandlers={{
              click: () => onMarkerClick(property.id)
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.price.toLocaleString()} €</p>
                <p className="text-gray-600">{property.area} m² - {property.rooms} pièces</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}