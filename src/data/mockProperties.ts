import { Property } from '../types';
import { calculateMonthlyPayment } from '../utils/loanCalculator';

// Helper function to generate random number between min and max
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(2);

// French cities with their rental tension data
const cities = [
  { city: 'Paris', region: 'Île-de-France', tension: 0.98 },
  { city: 'Lyon', region: 'Auvergne-Rhône-Alpes', tension: 0.95 },
  { city: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', tension: 0.88 },
  { city: 'Bordeaux', region: 'Nouvelle-Aquitaine', tension: 0.92 },
  { city: 'Toulouse', region: 'Occitanie', tension: 0.90 },
  { city: 'Nantes', region: 'Pays de la Loire', tension: 0.93 },
  { city: 'Strasbourg', region: 'Grand Est', tension: 0.89 },
  { city: 'Lille', region: 'Hauts-de-France', tension: 0.91 },
  { city: 'Montpellier', region: 'Occitanie', tension: 0.87 },
  { city: 'Rennes', region: 'Bretagne', tension: 0.94 }
];

// Property types with their typical characteristics
const propertyTypes = ['house', 'apartment', 'building', 'land'] as const;

// High-quality Unsplash real estate images
const images = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'
];

// Generate a property with realistic values
const generateProperty = (id: number): Property => {
  const type = propertyTypes[random(0, propertyTypes.length - 1)];
  const location = cities[random(0, cities.length - 1)];
  
  // Base price per m² depending on city and type
  let basePricePerSqm = random(3000, 12000);
  if (location.city === 'Paris') basePricePerSqm *= 2;
  if (type === 'apartment') basePricePerSqm *= 1.2;
  
  const area = type === 'building' 
    ? random(200, 1000)
    : type === 'house'
      ? random(80, 250)
      : random(20, 120);
  
  const price = Math.round(area * basePricePerSqm);
  
  // Adjust rental yield based on location and property type
  const baseYieldMultiplier = randomFloat(0.8, 1.2);
  const cityYieldMultiplier = location.city === 'Paris' ? 0.7 : 1;
  const typeYieldMultiplier = type === 'apartment' ? 0.9 : 1.1;
  
  const targetYield = (5 * baseYieldMultiplier * cityYieldMultiplier * typeYieldMultiplier) / 100;
  const monthlyRent = Math.round((price * targetYield) / 12);
  
  const monthlyCharges = Math.round(area * random(2, 5));
  const propertyTax = Math.round(price * 0.01);
  const insurance = Math.round(price * 0.001);
  
  const loanRate = 4.5;
  const loanYears = 25;
  const monthlyLoanPayment = calculateMonthlyPayment(price, loanRate, loanYears);
  
  const annualRent = monthlyRent * 12;
  const annualCharges = (monthlyCharges * 12) + propertyTax + insurance;
  const annualLoanPayments = monthlyLoanPayment * 12;
  
  const grossYield = +((annualRent / price) * 100).toFixed(2);
  const netYield = +((annualRent - annualCharges) / price * 100).toFixed(2);
  const netYieldWithLoan = +(((annualRent - annualCharges - annualLoanPayments) / price) * 100).toFixed(2);
  
  const cashflow = monthlyRent - monthlyCharges - (propertyTax / 12) - (insurance / 12) - monthlyLoanPayment;
  const annualCashflow = Math.round(cashflow * 12);
  const cashflowYield = +((annualCashflow / price) * 100).toFixed(2);

  const title = type === 'apartment' ? 'Bel appartement' :
                type === 'house' ? 'Maison charmante' :
                type === 'building' ? 'Immeuble de rapport' :
                'Terrain constructible';

  return {
    id: id.toString(),
    title: `${title} à ${location.city}`,
    type,
    price,
    area,
    rooms: type === 'land' ? 0 : Math.max(1, Math.floor(area / 25)),
    location: {
      city: location.city,
      region: location.region,
      address: `${random(1, 150)} rue ${['de la Paix', 'Victor Hugo', 'des Lilas', 'du Commerce', 'Saint-Michel'][random(0, 4)]}`
    },
    images: [images[random(0, images.length - 1)]],
    monthlyRent,
    expenses: {
      monthlyCharges,
      propertyTax,
      insurance
    },
    metrics: {
      pricePerSqm: Math.round(price / area),
      grossYield,
      netYield,
      netYieldWithLoan,
      cashflow: Math.round(cashflow),
      annualCashflow,
      cashflowYield,
      monthlyLoanPayment
    },
    marketIndicators: {
      unemploymentRate: +(random(50, 120) / 10).toFixed(1),
      populationGrowth: +(random(5, 25) / 10).toFixed(1),
      averageIncome: random(25000, 45000),
      rentalTension: location.tension * randomFloat(0.95, 1.05)
    },
    createdAt: new Date(Date.now() - random(0, 30) * 24 * 60 * 60 * 1000).toISOString()
  };
};

// Generate 100 properties
export const mockProperties = Array.from({ length: 100 }, (_, i) => generateProperty(i + 1));