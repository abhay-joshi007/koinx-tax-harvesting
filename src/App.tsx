import React, { useState, useEffect, useMemo } from 'react';
import { Holding, CapitalGains, SortState } from './types';
import { fetchHoldings, fetchCapitalGains } from './api/mockData';
import { aggregatePreHarvesting, aggregateAfterHarvesting, getTaxSavings, sortHoldings, cycleSortDirection } from './utils/tax';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import HoldingsTable from './components/HoldingsTable';

const App: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortState>({ column: null, direction: 'default' });
  const [showAll, setShowAll] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  useEffect(() => {
    Promise.all([fetchHoldings(), fetchCapitalGains()])
      .then(([h, cg]) => { setHoldings(h); setCapitalGains(cg.capitalGains); })
      .catch(() => setError('Failed to load data. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const sortedHoldings = useMemo(() => sortHoldings(holdings, sort), [holdings, sort]);
  const selectedHoldings = useMemo(() => holdings.filter(h => selected.has(h.coin)), [holdings, selected]);

  const preMetrics = useMemo(() => capitalGains ? aggregatePreHarvesting(capitalGains) : null, [capitalGains]);
  const afterMetrics = useMemo(() => capitalGains ? aggregateAfterHarvesting(capitalGains, selectedHoldings) : null, [capitalGains, selectedHoldings]);
  const savings = preMetrics && afterMetrics ? getTaxSavings(preMetrics, afterMetrics) : 0;

  const handleToggle = (coin: string) => {
    setSelected(prev => { const s = new Set(prev); s.has(coin) ? s.delete(coin) : s.add(coin); return s; });
  };

  const handleSelectAll = () => {
    if (holdings.every(h => selected.has(h.coin))) setSelected(new Set());
    else setSelected(new Set(holdings.map(h => h.coin)));
  };

  const handleSort = (col: 'stcg' | 'ltcg') => {
    setSort(prev => ({
      column: col,
      direction: prev.column === col ? cycleSortDirection(prev.direction) : 'desc'
    }));
  };

  const bg = dark ? '#0f0f1a' : '#f3f4f6';
  const cardBg = dark ? '#1e1e35' : '#fff';
  const text = dark ? '#fff' : '#111';
  const subText = dark ? '#9ca3af' : '#6b7280';
  const border = dark ? '#2d2d44' : '#e5e7eb';

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <Navbar dark={dark} onToggle={() => setDark(d => !d)} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: text }}>Tax Harvesting</h1>
          <a href="https://koinx.com" target="_blank" rel="noreferrer"
            style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>How it works?</a>
        </div>

      <div
  style={{
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: '12px',
    marginBottom: '28px',
    overflow: 'hidden',
  }}
>
  <button
    onClick={() => setDisclaimerOpen((o) => !o)}
    style={{
      width: '100%',
      background: 'none',
      border: 'none',
      padding: '16px 20px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: text,
      fontSize: '14px',
      fontWeight: 500,
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '999px',
          border: `1px solid ${border}`,
          color: '#2563eb',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        i
      </span>

      <span
        style={{
          color: text,
          fontSize: '15px',
          fontWeight: 600,
        }}
      >
        Important Notes &amp; Disclaimers
      </span>
    </span>

    <span
      style={{
        fontSize: '16px',
        color: subText,
        lineHeight: 1,
      }}
    >
      {disclaimerOpen ? '⌃' : '⌄'}
    </span>
  </button>

  {disclaimerOpen && (
    <div
      style={{
        padding: '2px 20px 20px',
        color: subText,
        fontSize: '14px',
        lineHeight: '1.75',
      }}
    >
      <p style={{ margin: 0 }}>
        Tax-loss harvesting involves selling assets at a loss to offset capital gains.
        This tool is for informational purposes only and does not constitute financial
        or tax advice. Consult a qualified tax professional before making investment
        decisions.
      </p>
    </div>
  )}
</div>

        {loading && (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {[0,1].map(i => (
              <div key={i} style={{ flex: 1, minWidth: '280px', height: '200px', background: dark ? '#1e1e35' : '#e5e7eb', borderRadius: '16px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px 20px', color: '#dc2626', marginBottom: '28px' }}>
            {error}
          </div>
        )}

        {!loading && !error && preMetrics && afterMetrics && (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <SummaryCard title="Pre Harvesting" metrics={preMetrics} variant="pre" dark={dark} />
            <SummaryCard title="After Harvesting" metrics={afterMetrics} savings={savings} variant="after" dark={dark} />
          </div>
        )}

        {!loading && !error && (
          <HoldingsTable
            holdings={sortedHoldings}
            selected={selected}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
            sort={sort}
            onSort={handleSort}
            dark={dark}
            showAll={showAll}
            onToggleShowAll={() => setShowAll(s => !s)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
