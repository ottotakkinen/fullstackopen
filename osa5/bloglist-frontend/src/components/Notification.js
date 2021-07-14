import React from 'react';

export default function Notification({ error, message }) {
  const styles = {
    color: 'green',
    fontSize: '1.5rem',
    background: '#D3D3D3',
    border: 'green solid 4px',
    borderRadius: '4px',
    padding: '0.75rem',
    margin: '1rem 0',
  };

  if (error) {
    styles.color = 'red';
    styles.border = 'red solid 4px';
  }

  if (!message) {
    return null;
  }
  return <div style={styles}>{message}</div>;
}
