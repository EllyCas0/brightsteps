import React, { useContext, useState } from 'react';
import { ArrowLeft, Baby, Check, ChevronRight, Image as ImageIcon, Languages, Palette } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { Avatar } from './VisualAsset.jsx';
import { asChoiceArray } from '../lib/collections.js';
import {
  avatarOptions,
  backgroundTopics,
  choiceSets,
  defaultProfile,
  getBackgroundTopic,
  getCommunicationOptions,
  supportLevelDetails
} from '../data/appData.jsx';

export function LanguageSwitcher({ value, onChange }) {
  const languages = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' }
  ];

  return (
    <label className="language-switcher" aria-label="Choose language">
      <Languages size={18} aria-hidden="true" />
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.id} value={language.id}>{language.label}</option>
        ))}
      </select>
    </label>
  );
}

export function Onboarding({ onComplete, initialProfile, language, onLanguageChange }) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(
    {
      ...defaultProfile,
      ...initialProfile,
      communication: asChoiceArray(initialProfile?.communication, defaultProfile.communication)
    }
  );

  const steps = [
    {
      title: 'Confirmation',
      content: (
        <label className="confirm-row setup-confirm">
          <input type="checkbox" checked={form.diagnosisConfirmed} onChange={(event) => setForm({ ...form, diagnosisConfirmed: event.target.checked })} />
          <span>
            <strong>{t('IMPORTANT NOTICE')}</strong>
            <span>{t('This app is a recreational and educational support tool designed to help children practice communication and daily living skills.')}</span>
            <span>{t("Please consider the child's sensory sensitivities, comfort, and need for breaks when using sounds, visuals, touch, or any activity in the app.")}</span>
            <span>{t('It does not provide diagnoses, treatment, or medical or psychological advice, and does not replace care from qualified healthcare professionals or therapists.')}</span>
            <span>{t('The app should be used under the supervision and responsibility of a parent, legal guardian, or caregiver.')}</span>
          </span>
        </label>
      )
    },
    {
      title: 'Child profile',
      content: (
        <>
          <div className="form-grid">
            <label>{t('Name or nickname')}<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder={t('Child name')} /></label>
            <SelectField label="Age" value={form.age} options={choiceSets.age} onChange={(value) => setForm({ ...form, age: value })} />
          </div>
        </>
      )
    },
    {
      title: 'Autism support level',
      content: (
        <>
          <SupportLevelCards
            value={form.supportLevel}
            onChange={(value) => {
              const options = getCommunicationOptions(value);
              const communication = asChoiceArray(form.communication).filter((item) => options.includes(item));
              setForm({
                ...form,
                supportLevel: value,
                communication
              });
            }}
          />
          <p className="support-note">{t("This information is used only to personalize your child's experience. It does not determine or confirm an autism diagnosis or support level.")}</p>
          {form.supportLevel && (
            <MultiChoice
              label="Communication skills"
              values={asChoiceArray(form.communication)}
              options={getCommunicationOptions(form.supportLevel)}
              onChange={(values) => setForm({ ...form, communication: values })}
            />
          )}
        </>
      )
    },
    { title: 'Current Recognition Skills', content: <><ChoiceGroup label="Letters" value={form.letters} options={choiceSets.letters} onChange={(value) => setForm({ ...form, letters: value })} /><ChoiceGroup label="Numbers" value={form.numbers} options={choiceSets.numbers} onChange={(value) => setForm({ ...form, numbers: value })} /></> },
    {
      title: 'Current Daily Skills',
      content: (
        <DailySkillsChoice
          values={form.dailySkills}
          onChange={(values) => setForm({ ...form, dailySkills: values })}
        />
      )
    },
    {
      title: 'Parent goals',
      content: (
        <ParentGoalsChoice
          values={form.objectives || []}
          onChange={(values) => setForm({ ...form, objectives: values })}
        />
      )
    }
  ];

  const isLastStep = step === steps.length - 1;
  const canContinue = (step !== 0 || form.diagnosisConfirmed)
    && (step !== 1 || (form.name.trim() && form.age))
    && (step !== 2 || (form.supportLevel && asChoiceArray(form.communication).length));
  const canSave = form.diagnosisConfirmed;

  return (
    <main className="onboarding">
      <section className="onboarding-panel">
        <div className="panel-heading onboarding-heading">
          <div className="onboarding-title">
            <span className="round-icon"><Baby /></span>
            <div>
              <p className="eyebrow">{t('Parent setup')}</p>
              <h1>{t('Create a child profile')}</h1>
              <p>{t('Answers personalize activity length, choices, sound, and visual support.')}</p>
            </div>
          </div>
          <LanguageSwitcher value={language} onChange={onLanguageChange} />
        </div>
        <div className="progress-track" aria-label={`Step ${step + 1} of ${steps.length}`}>
          <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <h2>{t(steps[step].title)}</h2>
        {steps[step].helper && <p className="step-helper">{steps[step].helper}</p>}
        {steps[step].content}
        <div className="form-actions">
          <button className="secondary-button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> {t('Back')}</button>
          {step < steps.length - 1 ? (
            <button className="primary-button" disabled={!canContinue} onClick={() => setStep(step + 1)}>{t('Next')} <ChevronRight size={18} /></button>
          ) : (
            <button className="primary-button" disabled={isLastStep && !canSave} onClick={() => onComplete({ ...form, name: form.name.trim() || 'My child' })}><Check size={18} /> {t('Save profile')}</button>
          )}
        </div>
      </section>
    </main>
  );
}

function SupportLevelCards({ value, onChange }) {
  const t = useT();
  return (
    <fieldset className="support-level-cards">
      <legend className="sr-only">Autism support level</legend>
      {supportLevelDetails.map((level) => (
        <button
          key={level.value}
          type="button"
          className={value === level.value ? 'support-level-card selected' : 'support-level-card'}
          aria-pressed={value === level.value}
          onClick={() => onChange(level.value)}
        >
          <span className="support-level-copy">
            <strong>{t(level.title)}</strong>
            <span>{t(level.subtitle)}</span>
            <small>{t(level.description)}</small>
          </span>
          <span className="support-select">{value === level.value ? <Check size={18} /> : '○'} {t('Select')}</span>
        </button>
      ))}
    </fieldset>
  );
}

function ChoiceGroup({ label, value, options, onChange, compact = false, hideLabel = false }) {
  const t = useT();
  return (
    <fieldset className={compact ? 'choice-group compact-choice-group' : 'choice-group'}>
      <legend className={hideLabel ? 'sr-only' : undefined}>{t(label)}</legend>
      <div className="choice-list">
        {options.map((option) => (
          <button key={option} type="button" className={value === option ? 'choice selected' : 'choice'} onClick={() => onChange(option)}>
            {t(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SelectField({ label, value, options, onChange }) {
  const t = useT();
  return (
    <label>
      {t(label)}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{t(option)}</option>)}
      </select>
    </label>
  );
}

export function BackgroundTopicPicker({ value, onChange }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const activeTopic = getBackgroundTopic(value);

  function choose(topicId) {
    onChange(topicId);
    setOpen(false);
  }

  return (
    <div className="background-picker">
      <button
        className={open ? 'icon-button active' : 'icon-button'}
        type="button"
        aria-label={t('Choose background')}
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
        title={t('Choose background')}
      >
        <ImageIcon />
      </button>
      {open && (
        <div className="background-menu" role="menu" aria-label="Background topics">
          <button
            type="button"
            className={!activeTopic ? 'background-choice selected' : 'background-choice'}
            onClick={() => choose('')}
          >
            <span className="background-choice-icon" aria-hidden="true"><Palette size={22} /></span>
            <span className="background-choice-copy">
              <strong>{t('Default')}</strong>
            </span>
            {!activeTopic && <Check size={16} />}
          </button>
          {backgroundTopics.map((topic) => {
            const TopicIcon = topic.icon;
            return (
              <button
                key={topic.id}
                type="button"
                className={value === topic.id ? 'background-choice selected' : 'background-choice'}
                onClick={() => choose(topic.id)}
              >
                <span className="background-choice-icon" aria-hidden="true"><TopicIcon size={22} /></span>
                <span className="background-choice-copy">
                  <strong>{t(topic.label)}</strong>
                </span>
                {value === topic.id && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CustomMultiChoice({
  values,
  options,
  onChange,
  legend,
  customLabel,
  customPlaceholder,
  customItemsLabel,
  choiceListClassName = 'choice-list',
  choiceClassName = 'choice',
  note = 'You can select more than one option.'
}) {
  const t = useT();
  const selectedValues = asChoiceArray(values);
  const customItems = selectedValues.filter((item) => !options.includes(item));
  const [otherOpen, setOtherOpen] = useState(customItems.length > 0);
  const [customValue, setCustomValue] = useState(customItems[0] || '');

  function toggle(option) {
    onChange(
      selectedValues.includes(option)
        ? selectedValues.filter((item) => item !== option)
        : [...selectedValues, option]
    );
  }

  function removeCustom(item) {
    onChange(selectedValues.filter((value) => value !== item));
    if (customValue === item) setCustomValue('');
  }

  function addCustomItem() {
    const nextValue = customValue.trim();
    if (!nextValue || selectedValues.includes(nextValue)) return;
    onChange([...selectedValues, nextValue]);
  }

  return (
    <fieldset className="choice-group">
      <legend className="sr-only">{t(legend)}</legend>
      <p className="multi-choice-note">{t(note)}</p>
      <div className={choiceListClassName}>
        {options.map((option) => (
          <button key={option} type="button" className={selectedValues.includes(option) ? `${choiceClassName} selected` : choiceClassName} onClick={() => toggle(option)}>
            {selectedValues.includes(option) && <Check size={16} />} {t(option)}
          </button>
        ))}
        <button type="button" className={otherOpen ? `${choiceClassName} selected` : choiceClassName} onClick={() => setOtherOpen((value) => !value)}>
          {otherOpen && <Check size={16} />} {t('Other')}
        </button>
      </div>
      {otherOpen && (
        <div className="other-skill-row">
          <label>
            {t(customLabel)}
            <input
              value={customValue}
              onChange={(event) => setCustomValue(event.target.value)}
              placeholder={t(customPlaceholder)}
            />
          </label>
          <button className="secondary-button" type="button" onClick={addCustomItem} disabled={!customValue.trim()}>
            {t('Add')}
          </button>
        </div>
      )}
      {!!customItems.length && (
        <div className="custom-skill-list" aria-label={customItemsLabel}>
          {customItems.map((item) => (
            <button key={item} type="button" onClick={() => removeCustom(item)}>
              <Check size={16} /> {t(item)}
            </button>
          ))}
        </div>
      )}
    </fieldset>
  );
}

export function DailySkillsChoice({ values, onChange }) {
  return (
    <CustomMultiChoice
      values={values}
      options={choiceSets.dailySkills}
      onChange={onChange}
      legend="Skills they already have"
      customLabel="Other daily skill"
      customPlaceholder="Write a skill"
      customItemsLabel="Custom daily skills"
    />
  );
}

export function ParentGoalsChoice({ values, onChange, dashboard = false }) {
  return (
    <CustomMultiChoice
      values={values}
      options={choiceSets.objectives}
      onChange={onChange}
      legend="Goals you want to achieve"
      customLabel="Other parent goal"
      customPlaceholder="Write a goal"
      customItemsLabel="Custom parent goals"
      choiceListClassName={dashboard ? 'objective-picker' : 'choice-list'}
      choiceClassName={dashboard ? 'objective-option' : 'choice'}
    />
  );
}

function MultiChoice({ label, values, options, onChange, hideLabel = false }) {
  const t = useT();
  function toggle(option) {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  }
  return (
    <fieldset className="choice-group">
      <legend className={hideLabel ? 'sr-only' : undefined}>{t(label)}</legend>
      <p className="multi-choice-note">{t('You can select more than one option.')}</p>
      <div className="choice-list">
        {options.map((option) => (
          <button key={option} type="button" className={values.includes(option) ? 'choice selected' : 'choice'} onClick={() => toggle(option)}>
            {values.includes(option) && <Check size={16} />} {t(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function AvatarPicker({ value, onChange }) {
  return (
    <fieldset className="avatar-picker">
      <legend>Avatar</legend>
      <div className="avatar-choice-list">
        {avatarOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={value === option.key ? 'avatar-choice selected' : 'avatar-choice'}
            aria-pressed={value === option.key}
            onClick={() => onChange(option.key)}
          >
            <Avatar avatar={option.key} name={option.label} size="large" />
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ChildAvatarSetup({ profile, onChoose }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [selected, setSelected] = useState(profile.avatar || defaultProfile.avatar);

  return (
    <main className="onboarding child-avatar-screen">
      <section className="onboarding-panel child-avatar-panel">
        <div className="panel-heading">
          <Avatar avatar={selected} name={profile.name || 'Child'} size="hero" />
          <div>
            <p className="eyebrow">{t('Child choice')}</p>
            <h1>{t('Choose your Mini-Me')}</h1>
            <p>{profile.name || (language === 'es' ? 'Tu niño' : 'Your child')} {language === 'es' ? 'puede escoger la imagen que quiere usar en BrightSteps.' : 'can pick the picture they want to use in BrightSteps.'}</p>
          </div>
        </div>
        <AvatarPicker value={selected} onChange={setSelected} />
        <div className="form-actions avatar-actions">
          <span />
          <button className="primary-button" type="button" onClick={() => onChoose(selected)}>
            <Check size={18} /> {t('Start BrightSteps')}
          </button>
        </div>
      </section>
    </main>
  );
}
