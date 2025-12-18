import React from 'react';

const cloudProviders = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    badge: 'aws',
    status: 'pending', // pending, in-progress, completed
    link: './aws-setup',
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    badge: 'gcp',
    status: 'pending',
    link: './gcp-setup',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    badge: 'azure',
    status: 'pending',
    link: './azure-setup',
  },
];

const statusConfig = {
  pending: { label: '대기 중', color: '#9ca3af', bg: '#f3f4f6' },
  'in-progress': { label: '진행 중', color: '#f59e0b', bg: '#fef3c7' },
  completed: { label: '완료', color: '#10b981', bg: '#d1fae5' },
};

export default function CloudStatus() {
  return (
    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
      {cloudProviders.map((provider) => {
        const status = statusConfig[provider.status];
        return (
          <a
            key={provider.id}
            href={provider.link}
            className="step-card"
            style={{ 
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className={`cloud-badge ${provider.badge}`}>
                {provider.name}
              </span>
            </div>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: status.bg,
              color: status.color,
            }}>
              {status.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

