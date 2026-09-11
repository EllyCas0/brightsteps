export function asArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

export function asChoiceArray(value, fallback = []) {
  if (Array.isArray(value)) return value;
  return value ? [value] : fallback;
}
