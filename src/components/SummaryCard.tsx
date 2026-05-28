import React from 'react';
import { SummaryMetrics } from '../types';
import { formatCurrencyINR } from '../utils/tax';

interface SummaryCardProps {
  title: string;
  metrics: SummaryMetrics;
  savings?: number;
  variant: 'pre' | 'after';
  dark: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, metrics, savings, variant, dark }) => {
  const isAfter = variant === 'after';
  const bg = isAfter ? 'linear-gradient(135deg,#2563eb,#1d4ed8)' : (dark ? '#1e1e35' : '#fff');
  const color = isAfter ? '#fff' : (dark ? '#fff' : '#111');
  const subColor = isAfter ? 'rgba(255,255,255,0.75)' : (dark ? '#9ca3af' : '#6b7280');
  const border = isAfter ? 'none' : `1px solid ${dark ? '#2d2d44' : '#e5e7eb'}`;

  const val = (n: number) => {
    const valColor = n < 0 ? '#ef4444' : '#22c55e';
    return <span style={{ color: valColor, fontWeight: 600 }}>{formatCurrencyINR(n)}</span>;
  };

  const row = (label: string, st: number, lt: number) => (
    <tr>
      <td style={{ padding: '8px 0', color: subColor, fontSize: '14px' }}>{label}</td>
      <td style={{ padding: '8px 16px', textAlign: 'right' }}>{val(st)}</td>
      <td style={{ padding: '8px 0', textAlign: 'right' }}>{val(lt)}</td>
    </tr>
  );

  return (
    <div style={{
      background: bg, color, border, borderRadius: '16px',
      padding: '24px', flex: 1, minWidth: '280px',
      boxShadow: isAfter ? '0 4px 20px rgba(37,99,235,0.3)' : '0 1px 4px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700 }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', fontSize: '12px', color: subColor, fontWeight: 500, paddingBottom: '8px' }}></th>
            <th style={{ textAlign: 'right', fontSize: '12px', color: subColor, fontWeight: 500, paddingBottom: '8px', paddingRight: '16px' }}>Short-term</th>
            <th style={{ textAlign: 'right', fontSize: '12px', color: subColor, fontWeight: 500, paddingBottom: '8px' }}>Long-term</th>
          </tr>
        </thead>
        <tbody>
          {row('Profits', metrics.stcgProfits, metrics.ltcgProfits)}
          {row('Losses', -metrics.stcgLosses, -metrics.ltcgLosses)}
          <tr style={{ borderTop: `1px solid ${isAfter ? 'rgba(255,255,255,0.2)' : (dark ? '#2d2d44' : '#e5e7eb')}` }}>
            <td style={{ padding: '10px 0', fontSize: '14px', fontWeight: 600 }}>Net Capital Gains</td>
            <td style={{ padding: '10px 16px', textAlign: 'right' }}>{val(metrics.stcgNet)}</td>
            <td style={{ padding: '10px 0', textAlign: 'right' }}>{val(metrics.ltcgNet)}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${isAfter ? 'rgba(255,255,255,0.2)' : (dark ? '#2d2d44' : '#e5e7eb')}` }}>
        <span style={{ fontSize: '14px', color: subColor }}>
          {isAfter ? 'Effective Capital Gains: ' : 'Realised Capital Gains: '}
        </span>
        <span style={{ fontSize: '22px', fontWeight: 800 }}>{formatCurrencyINR(metrics.total)}</span>
      </div>
      {savings !== undefined && savings > 0 && (
        <div style={{ marginTop: '12px', background: 'rgba(34,197,94,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#4ade80', fontSize: '13px', fontWeight: 600 }}>
          You are going to save {formatCurrencyINR(savings)} in taxes
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
