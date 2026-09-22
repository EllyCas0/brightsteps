import React from 'react';
import { useT } from '../data/translations.js';

export function NavButton({ icon, label, active, onClick }) {
  const t = useT();
  return (
    <button className={active ? 'nav-button active' : 'nav-button'} onClick={onClick}>
      {icon}
      <span>{t(label)}</span>
    </button>
  );
}
