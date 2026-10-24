import React, { useState, useEffect } from 'react';

export interface PriceParts {
  main: string;
  separator?: string;
  cents?: string;
  currency?: string;
  hasDecimals: boolean;
}

// Live exchange rate cache (USD to MXN)
let cachedUsdMxnRate = 18.73;
let lastRateFetch = 0;
const RATE_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Fetches the current live USD to MXN exchange rate from the server proxy.
 */
export async function fetchLiveExchangeRate(): Promise<number> {
  const now = Date.now();
  if (now - lastRateFetch < RATE_CACHE_DURATION && cachedUsdMxnRate > 0) {
    return cachedUsdMxnRate;
  }
  try {
    const res = await fetch('/api/exchange-rate');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.rate === 'number' && data.rate > 0) {
        cachedUsdMxnRate = data.rate;
        lastRateFetch = now;
        return cachedUsdMxnRate;
      }
    }
  } catch (e) {
    // Ignore and fallback to cached/default rate
  }
  return cachedUsdMxnRate;
}

// Pre-fetch exchange rate in browser environment
if (typeof window !== 'undefined') {
  fetchLiveExchangeRate().catch(() => {});
}

export function getCachedUsdMxnRate(): number {
  return cachedUsdMxnRate;
}

/**
 * Parses numeric amount from an MXN price string like "$193,03 MXN", "$136 MXN", "$359 MXN"
 */
export function parseMxnAmount(priceStr: string | undefined | null): number | null {
  if (!priceStr || typeof priceStr !== 'string') return null;
  const trimmed = priceStr.trim();
  if (!trimmed) return null;

  // Check if it's in MXN or Mexican Pesos (or default $ currency)
  const isMxn = /mxn|pesos|m\.n\./i.test(trimmed) || (trimmed.includes('$') && !trimmed.toUpperCase().includes('USD') && !trimmed.includes('€') && !trimmed.includes('£'));
  if (!isMxn) return null;

  const numMatch = trimmed.match(/(\d[\d\s.,]*\d|\d)/);
  if (!numMatch) return null;

  let cleaned = numMatch[0].replace(/\s+/g, '');

  // Comma decimal (e.g. "193,03")
  if (/,\d{1,2}$/.test(cleaned)) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (/\.\d{1,2}$/.test(cleaned)) {
    // Dot decimal (e.g. "193.03")
    cleaned = cleaned.replace(/,/g, '');
  } else {
    // Integer or thousands separator (e.g. "1,200")
    cleaned = cleaned.replace(/[,.]/g, '');
  }

  const val = parseFloat(cleaned);
  return isNaN(val) || val <= 0 ? null : val;
}

/**
 * Converts an MXN numeric amount to USD formatted string like "$10.30 USD"
 */
export function convertMxnToUsd(mxnAmount: number, rate: number = cachedUsdMxnRate): string {
  const effectiveRate = rate > 0 ? rate : 18.73;
  const usd = mxnAmount / effectiveRate;
  return `$${usd.toFixed(2)} USD`;
}

/**
 * Formats a display price according to the current language.
 * When language === 'en' and price is in MXN, it converts to USD.
 */
export function formatDisplayPrice(price: string | undefined | null, language: string = 'es'): string {
  if (!price || typeof price !== 'string') return '';
  const trimmed = price.trim();
  if (!trimmed) return '';

  if (language === 'en') {
    const mxnVal = parseMxnAmount(trimmed);
    if (mxnVal !== null) {
      return convertMxnToUsd(mxnVal, cachedUsdMxnRate);
    }
  }

  return trimmed;
}

/**
 * Splits a price string into main integer part, decimal separator, cents (1-2 digits), and currency suffix.
 * Handles:
 *   - "$193,03 MXN" -> { main: "$193", separator: ",", cents: "03", currency: "MXN", hasDecimals: true }
 *   - "$10.30 USD"  -> { main: "$10", separator: ".", cents: "30", currency: "USD", hasDecimals: true }
 *   - "$136 MXN"    -> { main: "$136 MXN", hasDecimals: false }
 *   - "$99.99"      -> { main: "$99", separator: ".", cents: "99", currency: "", hasDecimals: true }
 *   - "$12,345,678" -> { main: "$12,345,678", hasDecimals: false }
 *   - "$12,345,678.50 MXN" -> { main: "$12,345,678", separator: ".", cents: "50", currency: "MXN", hasDecimals: true }
 */
export function parsePriceParts(priceStr: string | undefined | null): PriceParts {
  if (!priceStr || typeof priceStr !== 'string') {
    return { main: '', hasDecimals: false };
  }
  const trimmed = priceStr.trim();
  if (!trimmed) {
    return { main: '', hasDecimals: false };
  }

  // Look for 1 or 2 digits after comma or dot at the end of the number part (before optional currency suffix)
  const match = trimmed.match(/^(.*?)(([.,])(\d{1,2}))(\s+[A-Za-z$€£]+)?$/);
  if (match) {
    return {
      main: match[1],
      separator: match[3],
      cents: match[4],
      currency: match[5] ? match[5].trim() : '',
      hasDecimals: true
    };
  }

  return { main: trimmed, hasDecimals: false };
}

/**
 * Renders a price with cents small and raised in the upper right right after the full value,
 * followed by the comma or dot and the cents.
 * Automatically translates MXN to USD when language is 'en'.
 */
export function FormattedPrice({
  price,
  language = 'es',
  className = '',
  mainClassName = '',
  centsClassName = '',
  currencyClassName = ''
}: {
  price: string | undefined | null;
  language?: string;
  className?: string;
  mainClassName?: string;
  centsClassName?: string;
  currencyClassName?: string;
}) {
  const [, setTick] = useState(0);

  // Hook into live exchange rate updates
  useEffect(() => {
    if (language === 'en' && lastRateFetch === 0) {
      fetchLiveExchangeRate().then(() => setTick(t => t + 1));
    }
  }, [language]);

  const effectivePrice = formatDisplayPrice(price, language);
  const parts = parsePriceParts(effectivePrice);
  if (!parts.main) return null;

  if (!parts.hasDecimals) {
    return <span className={className || mainClassName}>{parts.main}</span>;
  }

  return (
    <span className={`inline-flex items-baseline whitespace-nowrap leading-none tabular-nums ${className}`}>
      <span className={mainClassName}>{parts.main}</span>
      <span 
        className={`text-[0.62em] font-extrabold relative -top-[0.45em] ml-0.5 leading-none select-none ${centsClassName}`}
        aria-hidden="true"
      >
        {parts.separator}{parts.cents}
      </span>
      {parts.currency && (
        <span className={`text-[0.72em] font-bold ml-1 tracking-normal ${currencyClassName}`}>
          {parts.currency}
        </span>
      )}
    </span>
  );
}

