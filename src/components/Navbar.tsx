import React from 'react';

interface NavbarProps {
  dark: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ dark, onToggle }) => {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: dark ? '#1a1a2e' : '#ffffff',
      borderBottom: `1px solid ${dark ? '#2d2d44' : '#e5e7eb'}`,
      padding: '0 24px', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: dark ? '#fff' : '#111' }}>Koin</span>
        <span style={{
          fontSize: '22px', fontWeight: 700,
          background: '#f97316', borderRadius: '4px',
          color: '#fff', padding: '0 5px'
        }}>X</span>
      </div>
      <button onClick={onToggle} style={{
        background: dark ? '#2d2d44' : '#f3f4f6',
        border: 'none', borderRadius: '50%',
        width: '38px', height: '38px',
        cursor: 'pointer', fontSize: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: dark ? '#fff' : '#374151',
        transition: 'background 0.2s'
      }} aria-label="Toggle theme">
        {dark ? '\u2600\ufe0f' : '\uD83C\uDF19'}
      </button>
    </nav>
  );
};

export default Navbar;
