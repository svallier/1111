export interface Property {
  id: string;
  title: string;
  type: 'house' | 'apartment' | 'building' | 'land';
  price: number;
  area: number;
  rooms: number;
  location: {
    city: string;
    region: string;
    address?: string;
  };
  images: string[];
  monthlyRent: number;
  expenses: {
    monthlyCharges: number;
    propertyTax: number;
    insurance: number;
  };
  metrics: {
    pricePerSqm: number;
    grossYield: number;
    netYield: number;
    netYieldWithLoan: number;
    cashflow: number;
    annualCashflow: number;
    cashflowYield: number;
    monthlyLoanPayment: number;
  };
  marketIndicators: {
    unemploymentRate: number;
    populationGrowth: number;
    averageIncome: number;
    rentalTension: number;
  };
  createdAt: string;
}

export type ExpenseType = 'monthlyCharges' | 'propertyTax' | 'insurance';
export type ScoreType = 'A' | 'B' | 'C' | 'D';

export interface FilterState {
  city: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minCashflow: number;
  maxCashflow: number;
  propertyType: Array<'house' | 'apartment' | 'building' | 'land'>;
  minGrossYield: number;
  maxGrossYield: number;
  minRooms: number;
  loanAmount: number;
  downPayment: number;
  includedExpenses: ExpenseType[];
  minScore?: ScoreType;
}