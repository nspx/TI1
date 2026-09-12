import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rateAgainstUSD: 1.0,
    label: 'USD ($)',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    rateAgainstUSD: 86.5,
    label: 'INR (₹)',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateAgainstUSD: 0.92,
    label: 'EUR (€)',
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rateAgainstUSD: 3.67,
    label: 'AED (د.إ)',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateAgainstUSD: 0.79,
    label: 'GBP (£)',
  },
};

export function formatPrice(amountUSD: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * currency.rateAgainstUSD;
  
  if (currencyCode === 'INR') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
