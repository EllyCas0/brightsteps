import carsBackground from '../assets/backgrounds-by-topic/cars.webp';
import dinosBackground from '../assets/backgrounds-by-topic/dinos.webp';
import dragonsBackground from '../assets/backgrounds-by-topic/dragons.webp';
import flowersBackground from '../assets/backgrounds-by-topic/flowers.webp';
import rocketsBackground from '../assets/backgrounds-by-topic/rockets.webp';
import unicornsBackground from '../assets/backgrounds-by-topic/unicorns.webp';
import carsIcon from '../assets/theme-icons/cars.png';
import dinosIcon from '../assets/theme-icons/dinos.png';
import dragonsIcon from '../assets/theme-icons/dragons.png';
import flowersIcon from '../assets/theme-icons/flowers.png';
import rocketsIcon from '../assets/theme-icons/rockets.png';
import unicornsIcon from '../assets/theme-icons/unicorns.png';

export const backgroundTopics = [
  { id: 'cars', label: 'Cars', image: carsBackground, iconImage: carsIcon, tint: 'rgba(234, 246, 254, 0.78)' },
  { id: 'dinos', label: 'Dinos', image: dinosBackground, iconImage: dinosIcon, tint: 'rgba(239, 249, 238, 0.78)' },
  { id: 'dragons', label: 'Dragons', image: dragonsBackground, iconImage: dragonsIcon, tint: 'rgba(242, 240, 255, 0.78)' },
  { id: 'flowers', label: 'Flowers', image: flowersBackground, iconImage: flowersIcon, tint: 'rgba(255, 240, 246, 0.78)' },
  { id: 'rockets', label: 'Rockets', image: rocketsBackground, iconImage: rocketsIcon, tint: 'rgba(234, 246, 254, 0.78)' },
  { id: 'unicorns', label: 'Unicorns', image: unicornsBackground, iconImage: unicornsIcon, tint: 'rgba(248, 240, 255, 0.78)' }
];

export function getBackgroundTopic(topicId) {
  return backgroundTopics.find((topic) => topic.id === topicId) || null;
}
