import { asArray, asChoiceArray } from '../lib/collections.js';
import { normalizeMyVoiceSettings } from '../data/communication.js';
import { defaultProfile, normalizeAvatar, normalizeSupportLevel } from '../data/profileCore.js';
import { ACTIVE_PROFILE_KEY, PROFILES_KEY, STORAGE_KEY, loadJson, loadText } from '../lib/storage.js';

export function hasChoiceText(values, text) {
  const terms = text === 'AAC' || text === 'CAA' ? ['AAC', 'CAA'] : [text];
  return asChoiceArray(values).some((value) => terms.some((term) => value.includes(term)));
}

export function formatChoiceList(values, translate = (value) => value) {
  const list = asChoiceArray(values);
  return list.length ? list.map((value) => translate(value)).join(', ') : translate('Not set');
}

export function createProfileId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `child-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeProfile(saved) {
  if (!saved || typeof saved !== 'object') return null;
  const objectives = asArray(saved.objectives).map((objective) => (
    objective === 'Numbers and problem solving' ? 'Numbers and logic' : objective
  ));
  return {
    ...defaultProfile,
    ...saved,
    id: saved.id || createProfileId(),
    avatar: normalizeAvatar(saved.avatar),
    supportLevel: normalizeSupportLevel(saved.supportLevel),
    communication: asChoiceArray(saved.communication),
    sensory: asArray(saved.sensory),
    dailySkills: asArray(saved.dailySkills),
    objectives,
    learningStyle: asArray(saved.learningStyle, defaultProfile.learningStyle),
    interests: asArray(saved.interests),
    myVoice: normalizeMyVoiceSettings(saved.myVoice),
    diagnosisConfirmed: Boolean(saved.diagnosisConfirmed)
  };
}

export function loadProfiles() {
  const savedProfiles = asArray(loadJson(PROFILES_KEY, []))
    .map((item) => normalizeProfile(item))
    .filter(Boolean);
  if (savedProfiles.length) return savedProfiles;
  const legacyProfile = normalizeProfile(loadJson(STORAGE_KEY, null));
  return legacyProfile ? [legacyProfile] : [];
}

export function getInitialProfileState() {
  const profiles = loadProfiles();
  const activeId = loadText(ACTIVE_PROFILE_KEY);
  const profile = profiles.find((item) => item.id === activeId) || profiles[0] || null;
  return { profiles, profile };
}

export function getPersonalization(profile) {
  if (!profile) return [];
  const notes = [];
  if (profile.letters === 'Does not recognize letters') notes.push('Start with visual letter matching.');
  if (profile.letters !== 'Does not recognize letters') notes.push('Include simple word play.');
  if (profile.letters === 'Can read fluently') notes.push('Offer short reading choices with clear visuals.');
  if (hasChoiceText(profile.communication, 'AAC') || hasChoiceText(profile.communication, 'picture') || hasChoiceText(profile.communication, 'Very limited')) {
    notes.push('Show visual choices and AAC-style buttons.');
  }
  if (asArray(profile.objectives).includes('Attention and following directions')) notes.push('Try joint attention and one-step directions.');
  if (asArray(profile.objectives).includes('Self-care routines')) notes.push('Practice hands, teeth, dressing, bathroom, and bedtime.');
  if (asArray(profile.learningStyle).includes('Images')) notes.push('Prioritize picture-first steps.');
  if (profile.supportLevel?.startsWith('Level 3')) notes.push('Use shorter activities with fewer choices.');
  return notes;
}

