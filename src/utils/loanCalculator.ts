export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
    / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(monthlyPayment);
}

export function calculateMaxLoanAmount(monthlyIncome: number, currentDebt: number = 0): number {
  const maxDebtRatio = 0.35; // 35% max debt ratio
  const maxMonthlyPayment = monthlyIncome * maxDebtRatio - currentDebt;
  const years = 25;
  const annualRate = 4.5; // Current average rate in France
  
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  const maxLoanAmount = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) 
    / (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  
  return Math.round(maxLoanAmount);
}