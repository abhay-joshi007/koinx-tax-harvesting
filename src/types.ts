export interface GainLoss {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainLoss;
  ltcg: GainLoss;
}

export interface CapitalGains {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export type HarvestType = 'short-term' | 'long-term' | 'mixed' | 'none';

export type SortDirection = 'default' | 'desc' | 'asc';

export interface SortState {
  column: 'stcg' | 'ltcg' | null;
  direction: SortDirection;
}

export interface SummaryMetrics {
  stcgProfits: number;
  stcgLosses: number;
  ltcgProfits: number;
  ltcgLosses: number;
  stcgNet: number;
  ltcgNet: number;
  total: number;
}
