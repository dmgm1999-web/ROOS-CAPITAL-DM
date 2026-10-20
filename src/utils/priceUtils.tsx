import React from 'react';

export interface PriceParts {
  main: string;
  separator?: string;
  cents?: string;
  currency?: string;
  hasDecimals: boolean;
}

/**
 * Splits a price string into main integer part, decimal separator, cents (1-2 digits), and currency suffix.
 * Handles:
 *   - "$193,03 MXN" -> { main: "$193", separator: ",", cents: "03", currency: "MXN", hasDecimals: true }
 *   - "$180,61 MXN" -> { main: "$180", separator: ",", cents: "61", currency: "MXN", hasDecimals: true }
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
 * followed by the comma or dot and the cents, matching:
 * "los centavos, del precio total, sean pequeños y en la parte superior derecha de los valores completos seguido de la coma o el punto"
 */
export function FormattedPrice({
  price,
  className = '',
  mainClassName = '',
  centsClassName = '',
  currencyClassName = ''
}: {
  price: string | undefined | null;
  className?: string;
  mainClassName?: string;
  centsClassName?: string;
  currencyClassName?: string;
}) {
  const parts = parsePriceParts(price);
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
