import { Holding, CapitalGains, SortState, SummaryMetrics } from '../types';

export const formatCurrencyINR = (value: number): string => {
  const abs = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(abs);
  return value < 0 ? `- ${formatted}` : formatted;
};

export const formatUnits = (value: number, coin: string): string => {
  if (value === 0) return `0 ${coin}`;
  if (Math.abs(value) < 0.0001) return `${value.toExponential(4)} ${coin}`;
  return `${parseFloat(value.toFixed(6))} ${coin}`;
};

export const isHarvestable = (h: Holding): boolean =>
  h.stcg.gain < 0 || h.ltcg.gain < 0;

export const getHarvestType = (h: Holding): string => {
  const st = h.stcg.gain < 0;
  const lt = h.ltcg.gain < 0;
  if (st && lt) return 'mixed';
  if (st) return 'short-term';
  if (lt) return 'long-term';
  return 'none';
};

export const getAmountToSell = (h: Holding): { units: string; value: string } | null => {
  if (!isHarvestable(h)) return null;
  return {
    units: formatUnits(h.totalHolding, h.coin),
    value: formatCurrencyINR(h.currentPrice * h.totalHolding),
  };
};

export const aggregatePreHarvesting = (cg: CapitalGains): SummaryMetrics => {
  const stcgNet = cg.stcg.profits - cg.stcg.losses;
  const ltcgNet = cg.ltcg.profits - cg.ltcg.losses;
  return {
    stcgProfits: cg.stcg.profits,
    stcgLosses: cg.stcg.losses,
    ltcgProfits: cg.ltcg.profits,
    ltcgLosses: cg.ltcg.losses,
    stcgNet,
    ltcgNet,
    total: stcgNet + ltcgNet,
  };
};

export const aggregateAfterHarvesting = (
  cg: CapitalGains,
  selected: Holding[]
): SummaryMetrics => {
  let stcgProfits = cg.stcg.profits;
  let stcgLosses = cg.stcg.losses;
  let ltcgProfits = cg.ltcg.profits;
  let ltcgLosses = cg.ltcg.losses;

  for (const h of selected) {
    if (h.stcg.gain > 0) stcgProfits += h.stcg.gain;
    else if (h.stcg.gain < 0) stcgLosses += Math.abs(h.stcg.gain);
    if (h.ltcg.gain > 0) ltcgProfits += h.ltcg.gain;
    else if (h.ltcg.gain < 0) ltcgLosses += Math.abs(h.ltcg.gain);
  }

  const stcgNet = stcgProfits - stcgLosses;
  const ltcgNet = ltcgProfits - ltcgLosses;
  return { stcgProfits, stcgLosses, ltcgProfits, ltcgLosses, stcgNet, ltcgNet, total: stcgNet + ltcgNet };
};

export const getTaxSavings = (pre: SummaryMetrics, after: SummaryMetrics): number =>
  Math.max(0, pre.total - after.total);

export const cycleSortDirection = (current: 'default' | 'desc' | 'asc'): 'default' | 'desc' | 'asc' => {
  if (current === 'default') return 'desc';
  if (current === 'desc') return 'asc';
  return 'default';
};

export const sortHoldings = (holdings: Holding[], sort: SortState): Holding[] => {
  if (!sort.column || sort.direction === 'default') return holdings;
  return [...holdings].sort((a, b) => {
    const aVal = sort.column === 'stcg' ? a.stcg.gain : a.ltcg.gain;
    const bVal = sort.column === 'stcg' ? b.stcg.gain : b.ltcg.gain;
    return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });
};
