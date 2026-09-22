import { useT } from '../data/translations.js';

export function LanguageSwitcher({ value, onChange }) {
  const t = useT();
  const languages = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' }
  ];

  return (
    <label className="language-switcher" aria-label={t('Choose language')}>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.id} value={language.id}>{language.label}</option>
        ))}
      </select>
    </label>
  );
}
