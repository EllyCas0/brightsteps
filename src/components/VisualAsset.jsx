import { defaultProfile, getImageAsset } from '../data/appData.jsx';

export function VisualAsset({ label, imageKey, className = 'visual-image', fallback = true }) {
  const src = getImageAsset(imageKey || label);
  if (!src) return fallback ? label : null;
  return <img className={className} src={src} alt="" aria-hidden="true" />;
}

export function Avatar({ avatar = defaultProfile.avatar, name = 'Child', size = 'medium' }) {
  return (
    <span className={`avatar avatar-${size}`} aria-label={`${name} avatar`} role="img">
      <VisualAsset label={avatar} imageKey={avatar} className="avatar-image" fallback={false} />
    </span>
  );
}
