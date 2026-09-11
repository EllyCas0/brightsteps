export const STORAGE_KEY = 'brightsteps-child-profile';
export const PROFILES_KEY = 'brightsteps-child-profiles';
export const ACTIVE_PROFILE_KEY = 'brightsteps-active-child-profile';
export const PROGRESS_KEY = 'brightsteps-progress';
export const BACKGROUND_TOPIC_KEY = 'brightsteps-background-topic';
export const LANGUAGE_KEY = 'brightsteps-language';
export const BREATH_SOUND_IDLE_MS = 90000;

function padDatePart(value) {
  return String(value).padStart(2, '0');
}

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  if (typeof dateKey !== 'string') return null;
  const match = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const utcTime = Date.UTC(year, month - 1, day);
  const parsed = new Date(utcTime);
  if (
    parsed.getUTCFullYear() !== year
    || parsed.getUTCMonth() !== month - 1
    || parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return utcTime;
}

export function getCalendarDayDiff(fromDateKey, toDateKey = getTodayKey()) {
  const fromTime = parseDateKey(fromDateKey);
  const toTime = parseDateKey(toDateKey);
  if (fromTime === null || toTime === null) return 0;
  return Math.round((toTime - fromTime) / 86400000);
}

export function loadJson(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

export function saveText(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

export function loadText(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function resetLocalStateFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') !== '1') return;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('brightsteps-')) {
        localStorage.removeItem(key);
      }
    });
    window.history.replaceState({}, '', window.location.pathname || '/');
  } catch {
    // Keep the app usable if storage or history APIs are unavailable.
  }
}

resetLocalStateFromUrl();
