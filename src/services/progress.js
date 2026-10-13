import { asArray } from '../lib/collections.js';
import { defaultProgress } from '../data/profileCore.js';
import { PROGRESS_KEY, getTodayKey, getCalendarDayDiff } from '../lib/storage.js';

export function getProgressStorageKey(profileId) {
  return profileId ? `${PROGRESS_KEY}-${profileId}` : PROGRESS_KEY;
}

export function normalizeProgress(saved) {
  const todayKey = getTodayKey();
  const lastActiveDate = saved?.lastActiveDate || todayKey;
  const dayDiff = getCalendarDayDiff(lastActiveDate, todayKey);
  const isNewDay = dayDiff > 0;
  const savedStreak = Number.isFinite(saved?.streak) ? saved.streak : defaultProgress.streak;
  const streak = isNewDay
    ? (dayDiff === 1 && saved?.todayDone ? savedStreak + 1 : 0)
    : savedStreak;
  const hasActivityHistory = Boolean(
    saved?.hasSeenHome
    || asArray(saved?.completed).length
    || asArray(saved?.practiced).length
    || asArray(saved?.moodLog).length
    || asArray(saved?.todayActivities).length
    || asArray(saved?.badges).length
  );
  return {
    ...defaultProgress,
    ...saved,
    completed: asArray(saved?.completed, defaultProgress.completed),
    practiced: asArray(saved?.practiced, defaultProgress.practiced),
    counts: { ...defaultProgress.counts, ...(saved?.counts || {}) },
    moodLog: asArray(saved?.moodLog, defaultProgress.moodLog),
    rewardStars: Number.isFinite(saved?.rewardStars) ? saved.rewardStars : defaultProgress.rewardStars,
    todayDone: isNewDay ? false : Boolean(saved?.todayDone),
    dailyGoal: Number.isFinite(saved?.dailyGoal) && saved.dailyGoal > 0 ? saved.dailyGoal : defaultProgress.dailyGoal,
    todayActivities: isNewDay ? [] : asArray(saved?.todayActivities, defaultProgress.todayActivities),
    badges: asArray(saved?.badges, defaultProgress.badges),
    streak,
    hasSeenHome: hasActivityHistory,
    lastActiveDate: todayKey
  };
}

