import { useContext, useState } from 'react';
import { Baby, Brain, Check, ChevronRight, HeartHandshake, Info, Lock, MessageSquare, Moon, Palette, Plus, RotateCcw, Shield, Sparkles, Star, Trash2 } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { avatarOptions, categoryLabels, resources } from '../data/appData.jsx';
import { communicationCategories, normalizeMyVoiceSettings, quickCommunicationCards } from '../data/communication.js';
import { asArray, asChoiceArray } from '../lib/collections.js';
import { Avatar } from './VisualAsset.jsx';
import { ParentGoalsChoice } from './ProfileSetup.jsx';

function hasChoiceText(values, text) {
  const terms = text === 'AAC' || text === 'CAA' ? ['AAC', 'CAA'] : [text];
  return asChoiceArray(values).some((value) => terms.some((term) => value.includes(term)));
}

function formatChoiceList(values, translate = (value) => value) {
  const list = asChoiceArray(values);
  return list.length ? list.map((value) => translate(value)).join(', ') : translate('Not set');
}

function createCustomCardId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ParentGate({ onUnlock, onBack }) {
  const t = useT();
  const [answer, setAnswer] = useState('');
  const currentYear = new Date().getFullYear();
  const numericAnswer = Number(answer);
  const isAdultBirthYear = /^\d{4}$/.test(answer.trim())
    && numericAnswer >= 1900
    && numericAnswer <= currentYear - 18;

  return (
    <section className="parent-gate">
      <Lock size={42} />
      <h1>{t('Adult Area')}</h1>
      <p>{t('For grown-ups. Enter your birth year to continue.')}</p>
      <label className="adult-check">
        {t('Birth year')}
        <input
          inputMode="numeric"
          value={answer}
          onChange={(event) => setAnswer(event.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="1988"
        />
      </label>
      <div className="form-actions">
        <button className="secondary-button" onClick={onBack}>{t('Back')}</button>
        <button className="primary-button" disabled={!isAdultBirthYear} onClick={onUnlock}>{t('Enter')}</button>
      </div>
    </section>
  );
}

function MyVoiceSettingsEditor({ settings, onChange }) {
  const t = useT();
  const [customLabel, setCustomLabel] = useState('');
  const [customSentence, setCustomSentence] = useState('');
  const normalizedSettings = normalizeMyVoiceSettings(settings);

  function updateSettings(updates) {
    onChange(normalizeMyVoiceSettings({ ...normalizedSettings, ...updates }));
  }

  function toggleQuick(label) {
    const enabledQuick = normalizedSettings.enabledQuick.includes(label)
      ? normalizedSettings.enabledQuick.filter((item) => item !== label)
      : [...normalizedSettings.enabledQuick, label];
    updateSettings({ enabledQuick });
  }

  function toggleCategory(id) {
    const isEnabled = normalizedSettings.enabledCategories.includes(id);
    if (isEnabled && normalizedSettings.enabledCategories.length === 1) return;
    const enabledCategories = isEnabled
      ? normalizedSettings.enabledCategories.filter((item) => item !== id)
      : [...normalizedSettings.enabledCategories, id];
    updateSettings({ enabledCategories });
  }

  function addCustomMessage() {
    const label = customLabel.trim();
    const sentence = customSentence.trim() || label;
    if (!label) return;
    updateSettings({
      customCards: [
        ...normalizedSettings.customCards,
        { id: createCustomCardId(), label, sentence, image: 'Choice Board' }
      ].slice(-12)
    });
    setCustomLabel('');
    setCustomSentence('');
  }

  function removeCustomMessage(id) {
    updateSettings({
      customCards: normalizedSettings.customCards.filter((card) => card.id !== id)
    });
  }

  return (
    <div className="my-voice-settings">
      <p>{t('Choose what appears in My Voice.')}</p>

      <div className="my-voice-setting-group">
        <strong>{t('Quick buttons')}</strong>
        <div className="my-voice-toggle-grid">
          {quickCommunicationCards.map((card) => (
            <button
              key={card.label}
              type="button"
              className={normalizedSettings.enabledQuick.includes(card.label) ? 'choice selected' : 'choice'}
              onClick={() => toggleQuick(card.label)}
          >
            {normalizedSettings.enabledQuick.includes(card.label) && <Check size={16} />}
              {t(card.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="my-voice-setting-group">
        <strong>{t('Categories')}</strong>
        <div className="my-voice-toggle-grid">
          {communicationCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={normalizedSettings.enabledCategories.includes(category.id) ? 'choice selected' : 'choice'}
              onClick={() => toggleCategory(category.id)}
          >
            {normalizedSettings.enabledCategories.includes(category.id) && <Check size={16} />}
              {t(category.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="my-voice-setting-group">
        <strong>{t('Custom messages')}</strong>
        <div className="custom-message-form">
          <label>
            {t('Button label')}
            <input value={customLabel} onChange={(event) => setCustomLabel(event.target.value)} placeholder={t('Snack')} />
          </label>
          <label>
            {t('Spoken message')}
            <input value={customSentence} onChange={(event) => setCustomSentence(event.target.value)} placeholder={t('I want a snack.')} />
          </label>
          <button className="primary-button" type="button" onClick={addCustomMessage} disabled={!customLabel.trim()}>
            <Plus size={18} /> {t('Add message')}
          </button>
        </div>
        <div className="custom-message-list">
          {normalizedSettings.customCards.length ? normalizedSettings.customCards.map((card) => (
            <span key={card.id}>
              <strong>{card.label}</strong>
              <small>{card.sentence}</small>
              <button type="button" onClick={() => removeCustomMessage(card.id)} aria-label={`${t('Remove')} ${card.label}`}>
                <Trash2 size={16} />
              </button>
            </span>
          )) : (
            <em>{t('No custom messages yet')}</em>
          )}
        </div>
      </div>
    </div>
  );
}

export function ParentDashboard({ profile, profiles, progress, personalization, onProfileChange, onSwitchProfile, onAddChild, onEdit, onReset }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const objectives = profile?.objectives?.length ? profile.objectives : ['No objectives selected yet'];
  const selectedObjectives = asArray(profile?.objectives);
  const usesVisualCommunication = hasChoiceText(profile?.communication, 'AAC')
    || hasChoiceText(profile?.communication, 'picture')
    || hasChoiceText(profile?.communication, 'Very limited');
  const nextActivities = [
    selectedObjectives.includes('Daily independence') ? 'Daily reminder practice' : 'Short daily routine',
    usesVisualCommunication ? 'AAC help choices' : 'Ask for help story',
    profile?.letters === 'Can read fluently' ? 'Reading choices' : (profile?.letters === 'Does not recognize letters' ? 'Letter Match' : 'Simple Words')
  ];

  return (
    <section className="parent-dashboard">
      <div className="parent-hero">
        <div>
          <p className="eyebrow">Parent dashboard</p>
          <h1>{language === 'es' ? `Perfil y progreso de ${profile?.name}` : `${profile?.name}'s profile and progress`}</h1>
        </div>
        <div className="parent-actions">
          <button className="secondary-button" onClick={onAddChild}><Baby size={18} /> {t('Add child')}</button>
          <button className="secondary-button" onClick={onEdit}><RotateCcw size={18} /> {t('Edit profile')}</button>
          <button className="danger-button" onClick={onReset}>{t('Reset')}</button>
        </div>
      </div>
      <div className="profile-switcher" aria-label="Child profiles">
        {profiles.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === profile?.id ? 'profile-tab active' : 'profile-tab'}
            aria-pressed={item.id === profile?.id}
            onClick={() => onSwitchProfile(item.id)}
          >
            <Baby size={16} />
            {item.name || 'My child'}
          </button>
        ))}
      </div>
      <div className="dashboard-grid">
        <DashboardPanel title="Child Profile" icon={<Baby />}>
          <div className="profile-avatar-row">
            <Avatar avatar={profile?.avatar} name={profile?.name || 'Child'} size="medium" />
            <strong>{avatarOptions.find((option) => option.key === profile?.avatar)?.label || 'Avatar'}</strong>
          </div>
          <InfoRow label="Age" value={profile?.age} />
          <InfoRow label="Support" value={profile?.supportLevel} />
          <InfoRow label="Communication skills" value={formatChoiceList(profile?.communication, t)} />
          <InfoRow label="Reading" value={profile?.letters} />
        </DashboardPanel>
        <DashboardPanel title="Parent Goals" icon={<Star />}>
          <ParentGoalsChoice
            values={selectedObjectives}
            onChange={(objectives) => onProfileChange({ objectives })}
            dashboard
          />
          <TagList items={objectives} />
        </DashboardPanel>
        <DashboardPanel title="My Voice Setup" icon={<MessageSquare />} className="my-voice-dashboard-panel">
          <MyVoiceSettingsEditor
            settings={profile?.myVoice}
            onChange={(myVoice) => onProfileChange({ myVoice })}
          />
        </DashboardPanel>
        <DashboardPanel title="Daily Skills Already Learned" icon={<HeartHandshake />}>
          <TagList items={profile?.dailySkills?.length ? profile.dailySkills : ['None selected yet']} />
        </DashboardPanel>
        <DashboardPanel title="Progress" icon={<Palette />}>
          <div className="stats-grid">
            {Object.entries(progress.counts).map(([key, value]) => <div key={key}><strong>{value}</strong><span>{t(categoryLabels[key] || key)}</span></div>)}
          </div>
        </DashboardPanel>
        <DashboardPanel title="Daily Rewards" icon={<Star />}>
          <InfoRow label="Today activities" value={`${progress.todayActivities.length}/${progress.dailyGoal}`} />
          <InfoRow label="Badges" value={progress.badges.length || 'None yet'} />
          <InfoRow label="Day streak" value={progress.streak} />
          <TagList items={progress.todayActivities.length ? progress.todayActivities : ['No activities today']} />
        </DashboardPanel>
        <DashboardPanel title="Mood Log" icon={<Moon />}>
          <TagList items={progress.moodLog.length ? progress.moodLog.map((item) => `${item.mood} at ${item.time}`) : ['No mood check yet']} />
        </DashboardPanel>
        <DashboardPanel title="Completed Activities" icon={<Check />}>
          <TagList items={progress.completed} />
        </DashboardPanel>
        <DashboardPanel title="Activities Practiced" icon={<Sparkles />}>
          <TagList items={progress.practiced} />
        </DashboardPanel>
        <DashboardPanel title="Suggested Next Activities" icon={<ChevronRight />}>
          <TagList items={nextActivities} />
        </DashboardPanel>
        <DashboardPanel title="Personalization" icon={<Brain />}>
          <TagList items={personalization} />
        </DashboardPanel>
        <DashboardPanel title="Parent Resources" icon={<Info />}>
          <ul className="resource-list">{resources.map((item) => <li key={item}>{t(item)}</li>)}</ul>
        </DashboardPanel>
        <DashboardPanel title="Emergency / Meltdown Support" icon={<Shield />}>
          <p>{language === 'es' ? 'Mantenga al niño seguro, use menos palabras, baje luces y sonido cuando sea posible, ofrezca un descanso y espere antes de enseñar o corregir.' : 'Keep the child safe, use fewer words, lower lights and sound where possible, offer a break, and wait before teaching or correcting.'}</p>
        </DashboardPanel>
      </div>
      <aside className="disclaimer">
        {language === 'es' ? 'Esta app es educativa y de apoyo para niños que ya tienen un diagnóstico y se usa bajo responsabilidad del padre, madre o cuidador. No diagnostica autismo, no ofrece consejo médico y no reemplaza terapia, atención clínica ni orientación profesional.' : 'This app is educational and supportive for children who already have a diagnosis and is used under parent or caregiver responsibility. It does not diagnose autism, provide medical advice, or replace therapy, clinical care, or guidance from qualified professionals.'}
      </aside>
    </section>
  );
}

function DashboardPanel({ title, icon, children, className = '' }) {
  const t = useT();
  return (
    <article className={className ? `dashboard-panel ${className}` : 'dashboard-panel'}>
      <h2>{icon}{t(title)}</h2>
      {children}
    </article>
  );
}

function InfoRow({ label, value }) {
  const t = useT();
  return <p className="info-row"><span>{t(label)}</span><strong>{t(value)}</strong></p>;
}

function TagList({ items }) {
  const t = useT();
  return <div className="tag-list">{items.map((item) => <span key={item}>{t(item)}</span>)}</div>;
}
