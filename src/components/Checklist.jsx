import React, { useState } from 'react';

export default function Checklist({ items }) {
  const [checked, setChecked] = useState({});

  const handleCheck = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="checklist-container" style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        marginBottom: '1rem',
        padding: '0.75rem',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: '8px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
        }}>
          <span>진행률</span>
          <span>{completedCount} / {items.length}</span>
        </div>
        <div style={{
          height: '8px',
          background: 'var(--ifm-color-emphasis-200)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--ifm-color-primary)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id} style={{
            opacity: checked[item.id] ? 0.6 : 1,
            textDecoration: checked[item.id] ? 'line-through' : 'none'
          }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={checked[item.id] || false}
                onChange={() => handleCheck(item.id)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

