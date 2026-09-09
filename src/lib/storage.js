export const STORAGE_KEY = 'brightsteps-child-profile';
export const PROFILES_KEY = 'brightsteps-child-profiles';
export const ACTIVE_PROFILE_KEY = 'brightsteps-active-child-profile';
export const PROGRESS_KEY = 'brightsteps-progress';
export const BACKGROUND_TOPIC_KEY = 'brightsteps-background-topic';
export const LANGUAGE_KEY = 'brightsteps-language';
export const BREATH_SOUND_IDLE_MS = 90000;

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
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
