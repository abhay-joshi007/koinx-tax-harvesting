import React from 'react';
import { Holding, SortState } from '../types';
import { formatCurrencyINR, formatUnits, isHarvestable } from '../utils/tax';

interface HoldingsTableProps {
  holdings: Holding[];
  selected: Set<string>;
  onToggle: (coin: string) => void;
  onSelectAll: () => void;
  sort: SortState;
  onSort: (col: 'stcg' | 'ltcg') => void;
  dark: boolean;
  showAll: boolean;
  onToggleShowAll: () => void;
}

const SortIcon: React.FC<{ active: boolean; direction: string }> = ({ active, direction }) => {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: '6px', verticalAlign: 'middle', lineHeight: 1 }}>
      <span style={{
        fontSize: '9px',
        color: active && direction === 'asc' ? '#2563eb' : '#9ca3af',
        lineHeight: 1,
        display: 'block'
      }}>&#9650;</span>
      <span style={{
        fontSize: '9px',
        color: active && direction === 'desc' ? '#2563eb' : '#9ca3af',
        lineHeight: 1,
        display: 'block'
      }}>&#9660;</span>
    </span>
  );
};

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings, selected, onToggle, onSelectAll, sort, onSort, dark, showAll, onToggleShowAll
}) => {
  const visible = showAll ? holdings : holdings.slice(0, 7);
  const allSelected = holdings.length > 0 && holdings.every(h => selected.has(h.coin));
  const someSelected = holdings.some(h => selected.has(h.coin)) && !allSelected;

  const headerStyle = (align: 'left' | 'right' = 'left', sortable = false): React.CSSProperties => ({
    padding: '12px 14px',
    textAlign: align,
    fontSize: '12px',
    color: dark ? '#9ca3af' : '#6b7280',
    fontWeight: 600,
    cursor: sortable ? 'pointer' : 'default',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    background: dark ? '#161627' : '#f9fafb',
    borderBottom: `1px solid ${dark ? '#2d2d44' : '#e5e7eb'}`,
    transition: 'background 0.15s',
  });

  const SortableHeader = ({ col, label }: { col: 'stcg' | 'ltcg'; label: string }) => {
    const isActive = sort.column === col;
    return (
      <th
        onClick={() => onSort(col)}
        style={{
          ...headerStyle('right', true),
          background: isActive
            ? (dark ? '#1e2a4a' : '#eff6ff')
            : (dark ? '#161627' : '#f9fafb'),
          color: isActive ? '#2563eb' : (dark ? '#9ca3af' : '#6b7280'),
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          {label}
          <SortIcon active={isActive} direction={sort.direction} />
        </span>
      </th>
    );
  };

  return (
    <div style={{
      background: dark ? '#1e1e35' : '#fff',
      borderRadius: '16px',
      border: `1px solid ${dark ? '#2d2d44' : '#e5e7eb'}`,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '20px 24px 12px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: dark ? '#fff' : '#111' }}>Holdings</h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
          <thead>
            <tr>
              <th style={{ ...headerStyle('left'), padding: '12px 12px 12px 24px', width: '48px' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected; }}
                  onChange={onSelectAll}
                  style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#2563eb' }}
                />
              </th>
              <th style={headerStyle('left')}>Asset</th>
              <th style={headerStyle('right')}>Holdings / Avg Buy Price</th>
              <th style={headerStyle('right')}>Current Price</th>
              <SortableHeader col="stcg" label="Short-Term Gain/Loss" />
              <SortableHeader col="ltcg" label="Long-Term Gain/Loss" />
              <th style={headerStyle('right')}>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((h) => {
              const isSelected = selected.has(h.coin);
              const stcgColor = h.stcg.gain < 0 ? '#ef4444' : '#22c55e';
              const ltcgColor = h.ltcg.gain < 0 ? '#ef4444' : '#22c55e';
              const rowBg = isSelected
                ? (dark ? 'rgba(37,99,235,0.12)' : '#eff6ff')
                : 'transparent';

              return (
                <tr
                  key={h.coin}
                  onClick={() => onToggle(h.coin)}
                  style={{
                    borderBottom: `1px solid ${dark ? '#2d2d44' : '#f3f4f6'}`,
                    background: rowBg,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  <td style={{ padding: '14px 12px 14px 24px' }} onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(h.coin)}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                  </td>

                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={h.logo}
                        alt={h.coin}
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${h.coin}&background=6366f1&color=fff&size=36`;
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: dark ? '#fff' : '#111' }}>{h.coin}</div>
                        <div style={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6b7280', marginTop: '2px' }}>{h.coinName}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: dark ? '#fff' : '#111' }}>
                      {formatUnits(h.totalHolding, h.coin)}
                    </div>
                    <div style={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6b7280', marginTop: '2px' }}>
                      {formatCurrencyINR(h.averageBuyPrice)}/{h.coin}
                    </div>
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right', fontWeight: 600, fontSize: '14px', color: dark ? '#fff' : '#111' }}>
                    {formatCurrencyINR(h.currentPrice)}
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ color: stcgColor, fontWeight: 700, fontSize: '14px' }}>
                      {formatCurrencyINR(h.stcg.gain)}
                    </div>
                    <div style={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6b7280', marginTop: '2px' }}>
                      {formatUnits(h.stcg.balance, h.coin)}
                    </div>
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ color: ltcgColor, fontWeight: 700, fontSize: '14px' }}>
                      {formatCurrencyINR(h.ltcg.gain)}
                    </div>
                    <div style={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6b7280', marginTop: '2px' }}>
                      {formatUnits(h.ltcg.balance, h.coin)}
                    </div>
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    {isSelected && isHarvestable(h) ? (
                      <div>
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px' }}>
                          {formatUnits(h.totalHolding, h.coin)}
                        </div>
                        <div style={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6b7280', marginTop: '2px' }}>
                          {formatCurrencyINR(h.currentPrice * h.totalHolding)}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: dark ? '#4b5563' : '#9ca3af', fontSize: '18px' }}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > 7 && (
        <div style={{ textAlign: 'center', padding: '16px 24px', borderTop: `1px solid ${dark ? '#2d2d44' : '#f3f4f6'}` }}>
          <button
            onClick={onToggleShowAll}
            style={{
              background: 'none',
              border: `1px solid #2563eb`,
              borderRadius: '8px',
              color: '#2563eb',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 20px',
              transition: 'all 0.2s',
            }}
          >
            {showAll ? 'Show Less ▲' : `View all (${holdings.length}) ▼`}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
