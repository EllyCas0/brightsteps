export function getSpeechLanguage(language, region = 'US') {
  if (language === 'es') return region === 'ES' ? 'es-ES' : 'es-US';
  return 'en-US';
}

export function speak(text, language, soundOff = false, options = {}) {
  if (soundOff || !text || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getSpeechLanguage(language, options.region);
  utterance.rate = options.rate ?? 0.9;
  utterance.pitch = options.pitch ?? 1;
  if (Number.isFinite(options.volume)) utterance.volume = options.volume;
  if (typeof options.onStart === 'function') utterance.onstart = options.onStart;
  if (typeof options.onEnd === 'function') utterance.onend = options.onEnd;
  if (typeof options.onError === 'function') utterance.onerror = options.onError;
  if (typeof options.onBoundary === 'function') utterance.onboundary = options.onBoundary;
  window.speechSynthesis.speak(utterance);
  return utterance;
}
