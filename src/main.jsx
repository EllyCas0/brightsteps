import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  Baby,
  Bone,
  BookOpen,
  Brain,
  Car,
  Check,
  ChevronRight,
  Clock,
  Delete,
  Flame,
  Flower2,
  HeartHandshake,
  Home,
  Info,
  Image as ImageIcon,
  Languages,
  Leaf,
  ListChecks,
  Lock,
  MessageSquare,
  Moon,
  Palette,
  Puzzle,
  RotateCcw,
  Rocket,
  Shield,
  Smile,
  Sparkles,
  Star,
  Trash2,
  Users,
  Video,
  Volume2,
  VolumeX
} from 'lucide-react';
import angryFaceImage from './assets/images/angry-face.png';
import backpackImage from './assets/images/backpack.png';
import bathroomImage from './assets/images/bathroom.png';
import bedImage from './assets/images/bed.png';
import breakImage from './assets/images/break.png';
import brushStep1Image from './assets/images/brush-step-1-toothpaste.png';
import brushStep2Image from './assets/images/brush-step-2-brush-top.png';
import brushStep3Image from './assets/images/brush-step-3-brush-bottom.png';
import brushStep4Image from './assets/images/brush-step-4-rinse.png';
import brushStep5Image from './assets/images/brush-step-5-smile.png';
import brushTeethImage from './assets/images/brush-teeth.png';
import calmBreakImage from './assets/images/calm-break.png';
import catImage from './assets/images/cat.png';
import cupImage from './assets/images/cup.png';
import doneImage from './assets/images/done.png';
import eyeImage from './assets/images/eye.png';
import excitedFaceImage from './assets/images/excited-face.png';
import flowerImage from './assets/images/flower.png';
import heartImage from './assets/images/heart.png';
import happyFaceImage from './assets/images/happy-face.png';
import needsBoardImage from './assets/images/needs-board.png';
import okayFaceImage from './assets/images/okay-face.png';
import sadFaceImage from './assets/images/sad-face.png';
import shapeSortImage from './assets/images/shape-sort.png';
import sunImage from './assets/images/sun.png';
import tieStep1Image from './assets/images/tie-step-1.png';
import tieStep2Image from './assets/images/tie-step-2.png';
import tieStep3Image from './assets/images/tie-step-3.png';
import tieStep4Image from './assets/images/tie-step-4.png';
import tieStep5Image from './assets/images/tie-step-5.png';
import tieShoesImage from './assets/images/tie-shoes.png';
import tiredFaceImage from './assets/images/tired-face.png';
import toysImage from './assets/images/toys.png';
import washHandsImage from './assets/images/wash-hands.png';
import waterImage from './assets/images/water.png';
import worriedFaceImage from './assets/images/worried-face.png';
import avatarBoy2 from './assets/avatars/avatar-boy-2.png';
import avatarGirl1 from './assets/avatars/avatar-girl-1.png';
import avatarGirl2 from './assets/avatars/avatar-girl-2.png';
import boyAngryAvatar from './assets/avatars/boy-angry.png';
import boy2ExcitedAvatar from './assets/avatars/boy-2-excited.png';
import boy2MadAvatar from './assets/avatars/boy-2-mad.png';
import boy2OkayAvatar from './assets/avatars/boy-2-okay.png';
import boy2SadAvatar from './assets/avatars/boy-2-sad.png';
import boy2WorriedAvatar from './assets/avatars/boy-2-worried.png';
import boyExcitedAvatar from './assets/avatars/boy-excited.png';
import boyHappyAvatar from './assets/avatars/boy-happy.png';
import boyOkayAvatar from './assets/avatars/boy-okay.png';
import boySadAvatar from './assets/avatars/boy-sad.png';
import boyWorriedAvatar from './assets/avatars/boy-worried.png';
import boyWashingHandsAvatar from './assets/avatars/boy-washing-hands.png';
import girl1ExcitedAvatar from './assets/avatars/girl-1-excited.png';
import girl1MadAvatar from './assets/avatars/girl-1-mad.png';
import girl1OkayAvatar from './assets/avatars/girl-1-okay.png';
import girl1SadAvatar from './assets/avatars/girl-1-sad.png';
import girl1WorriedAvatar from './assets/avatars/girl-1-worried.png';
import girl2ExcitedAvatar from './assets/avatars/girl-2-excited.png';
import girl2MadAvatar from './assets/avatars/girl-2-mad.png';
import girl2OkayAvatar from './assets/avatars/girl-2-okay.png';
import girl2SadAvatar from './assets/avatars/girl-2-sad.png';
import girl2WorriedAvatar from './assets/avatars/girl-2-worried.png';
import carsBackground from './assets/backgrounds-by-topic/cars.png';
import dinosBackground from './assets/backgrounds-by-topic/dinos.png';
import dragonsBackground from './assets/backgrounds-by-topic/dragons.png';
import flowersBackground from './assets/backgrounds-by-topic/flowers.png';
import rocketsBackground from './assets/backgrounds-by-topic/rockets.png';
import unicornsBackground from './assets/backgrounds-by-topic/unicorns.png';
import './styles.css';

const STORAGE_KEY = 'brightsteps-child-profile';
const PROFILES_KEY = 'brightsteps-child-profiles';
const ACTIVE_PROFILE_KEY = 'brightsteps-active-child-profile';
const PROGRESS_KEY = 'brightsteps-progress';
const BACKGROUND_TOPIC_KEY = 'brightsteps-background-topic';
const LANGUAGE_KEY = 'brightsteps-language';

const LanguageContext = React.createContext('en');

const translations = {
  es: {
    'Adult Area': 'Area de adultos',
    'For grown-ups. Enter your birth year to continue.': 'Para adultos. Escribe tu ano de nacimiento para continuar.',
    'Birth year': 'Ano de nacimiento',
    Enter: 'Entrar',
    Back: 'Atras',
    Next: 'Siguiente',
    Add: 'Agregar',
    Other: 'Otro',
    'Save profile': 'Guardar perfil',
    Home: 'Inicio',
    Parents: 'Padres',
    Welcome: 'Bienvenido',
    'Welcome back': 'Bienvenido de nuevo',
    Mood: 'Emocion',
    'Choose a feeling': 'Escoge una emocion',
    'Pick the face that shows how you feel.': 'Escoge la cara que muestra como te sientes.',
    Happy: 'Feliz',
    Excited: 'Emocionado',
    Okay: 'Bien',
    Sad: 'Triste',
    Worried: 'Preocupado',
    Mad: 'Enojado',
    Learn: 'Aprender',
    Communication: 'Comunicacion',
    Games: 'Juegos',
    Daily: 'Diario',
    Social: 'Social',
    Calm: 'Calma',
    'Calm Zone': 'Zona de calma',
    'Daily Skills': 'Habilidades diarias',
    'Social Skills': 'Habilidades sociales',
    'Numbers & Letters': 'Numeros y letras',
    'Learn activities': 'Actividades de aprendizaje',
    'Calm activities': 'Actividades de calma',
    'Communication activities': 'Actividades de comunicacion',
    'Games activities': 'Actividades de juegos',
    'Daily activities': 'Actividades diarias',
    'Social activities': 'Actividades sociales',
    'Show learned skills for practice': 'Mostrar habilidades aprendidas para practicar',
    Complete: 'Completado',
    'Practice again': 'Practicar otra vez',
    Start: 'Comenzar',
    'Quiet mode': 'Modo silencioso',
    'Breathe slowly': 'Respira despacio',
    'In, out, rest.': 'Inhala, exhala, descansa.',
    Pause: 'Pausar',
    Reset: 'Reiniciar',
    Stop: 'Detener',
    Volume: 'Volumen',
    'Calm Sounds': 'Sonidos de calma',
    'Choose a gentle background sound': 'Escoge un sonido suave de fondo',
    'Sound is muted.': 'El sonido esta silenciado.',
    'is playing.': 'esta sonando.',
    Rain: 'Lluvia',
    Ocean: 'Oceano',
    Nature: 'Naturaleza',
    'Soft music': 'Musica suave',
    'Soft steady rain': 'Lluvia suave y constante',
    'Slow wave sound': 'Sonido lento de olas',
    'Gentle outdoor tone': 'Sonido suave de la naturaleza',
    'Simple calm notes': 'Notas simples y tranquilas',
    Breathe: 'Respirar',
    'Yoga Calm': 'Yoga tranquilo',
    'Sensory Images': 'Imagenes sensoriales',
    'Slow visual breathing': 'Respiracion visual lenta',
    'Cartoon-style stretch and breathe': 'Estirarse y respirar con dibujos',
    'Pick a quiet image during crisis': 'Escoge una imagen tranquila durante una crisis',
    'Parent setup': 'Configuracion para padres',
    'Create a child profile': 'Crear perfil del nino',
    'Answers personalize activity length, choices, sound, and visual support.': 'Las respuestas personalizan la duracion, opciones, sonido y apoyo visual.',
    Confirmation: 'Confirmacion',
    'Child profile': 'Perfil del nino',
    'Autism support level': 'Nivel de apoyo de autismo',
    'Current Recognition Skills': 'Habilidades actuales de reconocimiento',
    'Current Daily Skills': 'Habilidades diarias actuales',
    'Parent goals': 'Metas de los padres',
    'IMPORTANT NOTICE': 'AVISO IMPORTANTE',
    'This app is a recreational and educational support tool designed to help children practice communication and daily living skills.': 'Esta app es una herramienta recreativa y educativa para ayudar a los ninos a practicar comunicacion y habilidades de la vida diaria.',
    "Please consider the child's sensory sensitivities, comfort, and need for breaks when using sounds, visuals, touch, or any activity in the app.": 'Considera las sensibilidades sensoriales, comodidad y necesidad de descansos del nino al usar sonidos, imagenes, tacto o cualquier actividad.',
    'It does not provide diagnoses, treatment, or medical or psychological advice, and does not replace care from qualified healthcare professionals or therapists.': 'No ofrece diagnosticos, tratamiento ni consejos medicos o psicologicos, y no reemplaza la atencion de profesionales o terapeutas calificados.',
    'The app should be used under the supervision and responsibility of a parent, legal guardian, or caregiver.': 'La app debe usarse bajo la supervision y responsabilidad de un padre, tutor legal o cuidador.',
    'Name or nickname': 'Nombre o apodo',
    'Child name': 'Nombre del nino',
    Age: 'Edad',
    Letters: 'Letras',
    Numbers: 'Numeros',
    'Communication skills': 'Habilidades de comunicacion',
    'This information is used only to personalize your child\'s experience. It does not determine or confirm an autism diagnosis or support level.': 'Esta informacion solo se usa para personalizar la experiencia del nino. No determina ni confirma un diagnostico de autismo o nivel de apoyo.',
    'You can select more than one option.': 'Puedes seleccionar mas de una opcion.',
    'Skills they already have': 'Habilidades que ya tiene',
    'Other daily skill': 'Otra habilidad diaria',
    'Write a skill': 'Escribe una habilidad',
    'Custom daily skills': 'Habilidades diarias personalizadas',
    'Goals you want to achieve': 'Metas que quieres lograr',
    'Other parent goal': 'Otra meta',
    'Write a goal': 'Escribe una meta',
    'Custom parent goals': 'Metas personalizadas',
    'Does not recognize letters': 'No reconoce letras',
    'Recognizes some letters': 'Reconoce algunas letras',
    'Recognizes most letters': 'Reconoce la mayoria de las letras',
    'Can read simple words': 'Puede leer palabras simples',
    'Can read fluently': 'Puede leer con fluidez',
    'Does not recognize numbers': 'No reconoce numeros',
    'Recognizes some numbers': 'Reconoce algunos numeros',
    'Recognizes numbers 1-10': 'Reconoce numeros del 1 al 10',
    'Recognizes numbers beyond 10': 'Reconoce numeros mayores de 10',
    Dressing: 'Vestirse',
    'Brushing teeth': 'Cepillarse los dientes',
    'Tying shoes': 'Amarrarse los zapatos',
    'Washing hands': 'Lavarse las manos',
    'Using the bathroom': 'Usar el bano',
    'Eating independently': 'Comer de forma independiente',
    'Following routines': 'Seguir rutinas',
    'Social interaction': 'Interaccion social',
    'Emotional regulation': 'Regulacion emocional',
    'Daily independence': 'Independencia diaria',
    'Self-care routines': 'Rutinas de autocuidado',
    'Attention and following directions': 'Atencion y seguir instrucciones',
    'Reading and words': 'Lectura y palabras',
    'Numbers and problem solving': 'Numeros y resolver problemas',
    'Level 1': 'Nivel 1',
    'Level 2': 'Nivel 2',
    'Level 3': 'Nivel 3',
    'Requires Support': 'Requiere apoyo',
    'Requires Substantial Support': 'Requiere apoyo sustancial',
    'Requires Very Substantial Support': 'Requiere apoyo muy sustancial',
    'Some support may be helpful with communication, routines, or social situations.': 'Algo de apoyo puede ayudar con comunicacion, rutinas o situaciones sociales.',
    'More consistent support may be needed across daily activities.': 'Puede necesitar apoyo mas constante en actividades diarias.',
    'Significant and ongoing support may be needed across daily activities.': 'Puede necesitar apoyo significativo y continuo en actividades diarias.',
    Select: 'Seleccionar',
    'Back-and-forth conversation support': 'Apoyo para conversar por turnos',
    'Initiates or responds with reminders': 'Inicia o responde con recordatorios',
    'Shares interests or emotions with prompts': 'Comparte intereses o emociones con ayudas',
    'Needs help adjusting to social settings': 'Necesita ayuda para adaptarse a situaciones sociales',
    'Limited back-and-forth communication': 'Comunicacion limitada por turnos',
    'Reduced initiation of social interaction': 'Inicia menos interacciones sociales',
    'Reduced response to social interaction': 'Responde menos a la interaccion social',
    'Needs verbal and nonverbal support': 'Necesita apoyo verbal y no verbal',
    'Uses AAC or visual communication': 'Usa AAC o comunicacion visual',
    'Very limited initiation of interaction': 'Inicio de interaccion muy limitado',
    'Minimal response to social interaction': 'Respuesta minima a la interaccion social',
    'Very limited verbal communication': 'Comunicacion verbal muy limitada',
    'Needs picture cards or AAC': 'Necesita tarjetas visuales o AAC',
    'Needs facial expression or gesture support': 'Necesita apoyo con expresiones o gestos',
    '2 years': '2 anos',
    '3 years': '3 anos',
    '4 years': '4 anos',
    '5 years': '5 anos',
    '6 years': '6 anos',
    '7 years': '7 anos',
    '8 years': '8 anos',
    '9 years': '9 anos',
    '10+ years': '10+ anos',
    'Choose your Mini-Me': 'Escoge tu Mini-Me',
    'Child choice': 'Eleccion del nino',
    'Start BrightSteps': 'Empezar BrightSteps',
    Images: 'Imagenes',
    Videos: 'Videos',
    Audio: 'Audio',
    'Great job!': 'Buen trabajo!',
    'Keep practicing': 'Seguir practicando',
    'Child Profile': 'Perfil del nino',
    Support: 'Apoyo',
    Reading: 'Lectura',
    'Daily Skills Already Learned': 'Habilidades diarias ya aprendidas',
    Progress: 'Progreso',
    'Daily Rewards': 'Recompensas diarias',
    'Today activities': 'Actividades de hoy',
    Badges: 'Insignias',
    'Day streak': 'Racha de dias',
    'Mood Log': 'Registro de emociones',
    'Completed Activities': 'Actividades completadas',
    'Activities Practiced': 'Actividades practicadas',
    'Suggested Next Activities': 'Siguientes actividades sugeridas',
    Personalization: 'Personalizacion',
    'Parent Resources': 'Recursos para padres',
    'Emergency / Meltdown Support': 'Apoyo en emergencia o crisis',
    'None selected yet': 'Nada seleccionado todavia',
    'None yet': 'Ninguna todavia',
    'No activities today': 'No hay actividades hoy',
    'No mood check yet': 'Sin registro de emocion todavia',
    'Add child': 'Agregar nino',
    'Edit profile': 'Editar perfil',
    'Parent dashboard': 'Panel de padres',
    Reset: 'Reiniciar',
    'Change avatar': 'Cambiar avatar',
    'Go home': 'Ir al inicio',
    'Learning companion': 'Companero de aprendizaje',
    For: 'Para',
    'Open Calm Zone': 'Abrir zona de calma',
    'Enable sound': 'Activar sonido',
    'Disable sound': 'Silenciar sonido',
    'Choose background': 'Escoger fondo',
    Default: 'Predeterminado',
    'Soft colors': 'Colores suaves',
    'Topic background': 'Fondo por tema',
    Cars: 'Carros',
    Dinos: 'Dinosaurios',
    Dragons: 'Dragones',
    Flowers: 'Flores',
    Rockets: 'Cohetes',
    Unicorns: 'Unicornios',
    'Tie Shoes': 'Amarrarse los zapatos',
    'Brush Teeth': 'Cepillarse los dientes',
    'Wash Hands': 'Lavarse las manos',
    'Bathroom Routine': 'Rutina del bano',
    'Get Dressed': 'Vestirse',
    'Pack Backpack': 'Preparar mochila',
    'Drink Water Reminder': 'Recordatorio de tomar agua',
    'Bedtime Routine': 'Rutina de dormir',
    'Morning Routine': 'Rutina de la manana',
    'Step-by-step shoe tying': 'Amarrar zapatos paso a paso',
    'Gentle routine practice': 'Practica suave de rutina',
    'Clean hands sequence': 'Secuencia para manos limpias',
    'Independent bathroom steps': 'Pasos independientes para el bano',
    'Clothes in order': 'Ropa en orden',
    'School-ready checklist': 'Lista para la escuela',
    'Remember to drink water': 'Recordar tomar agua',
    'Calm sequence before sleep': 'Secuencia tranquila antes de dormir',
    'First, next, then': 'Primero, despues, luego',
    'Letter Match': 'Emparejar letras',
    'Simple Words': 'Palabras simples',
    'Number Garden': 'Jardin de numeros',
    'Shape Sort': 'Ordenar formas',
    'Memory Cards': 'Tarjetas de memoria',
    'Color Match': 'Emparejar colores',
    'Match the same uppercase letter': 'Empareja la misma letra mayuscula',
    'Pick the word that matches a picture': 'Escoge la palabra que coincide con la imagen',
    'Count pictures and choose the number': 'Cuenta imagenes y escoge el numero',
    'Match shapes into the right group': 'Agrupa las formas correctamente',
    'Flip cards and find matching pairs': 'Voltea tarjetas y encuentra pares',
    'Choose the color that matches the card': 'Escoge el color que coincide con la tarjeta'
  }
};

function translateText(text, language) {
  if (language !== 'es' || typeof text !== 'string') return text;
  return translations.es[text] || text;
}

function useT() {
  const language = useContext(LanguageContext);
  return (text) => translateText(text, language);
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

const supportLevelDetails = [
  {
    value: 'Level 1: Requires Support',
    title: 'Level 1',
    subtitle: 'Requires Support',
    description: 'Some support may be helpful with communication, routines, or social situations.'
  },
  {
    value: 'Level 2: Requires Substantial Support',
    title: 'Level 2',
    subtitle: 'Requires Substantial Support',
    description: 'More consistent support may be needed across daily activities.'
  },
  {
    value: 'Level 3: Requires Very Substantial Support',
    title: 'Level 3',
    subtitle: 'Requires Very Substantial Support',
    description: 'Significant and ongoing support may be needed across daily activities.'
  }
];

const choiceSets = {
  supportLevel: supportLevelDetails.map((level) => level.value),
  communicationByLevel: {
    'Level 1: Requires Support': [
      'Back-and-forth conversation support',
      'Initiates or responds with reminders',
      'Shares interests or emotions with prompts',
      'Needs help adjusting to social settings'
    ],
    'Level 2: Requires Substantial Support': [
      'Limited back-and-forth communication',
      'Reduced initiation of social interaction',
      'Reduced response to social interaction',
      'Needs verbal and nonverbal support',
      'Uses AAC or visual communication'
    ],
    'Level 3: Requires Very Substantial Support': [
      'Very limited initiation of interaction',
      'Minimal response to social interaction',
      'Very limited verbal communication',
      'Needs picture cards or AAC',
      'Needs facial expression or gesture support'
    ]
  },
  age: ['2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years'],
  letters: [
    'Does not recognize letters',
    'Recognizes some letters',
    'Recognizes most letters',
    'Can read simple words',
    'Can read fluently'
  ],
  numbers: [
    'Does not recognize numbers',
    'Recognizes some numbers',
    'Recognizes numbers 1-10',
    'Recognizes numbers beyond 10'
  ],
  sensory: ['Sounds', 'Lights', 'Textures', 'Food', 'Touch', 'Crowds'],
  dailySkills: [
    'Dressing',
    'Brushing teeth',
    'Tying shoes',
    'Washing hands',
    'Using the bathroom',
    'Eating independently',
    'Following routines'
  ],
  objectives: [
    'Communication',
    'Social interaction',
    'Emotional regulation',
    'Daily independence',
    'Self-care routines',
    'Attention and following directions',
    'Reading and words',
    'Numbers and problem solving'
  ],
  interests: ['Animals', 'Cars', 'Music', 'Colors', 'Dinosaurs', 'Space']
};

const defaultProgress = {
  completed: [],
  practiced: [],
  counts: { learn: 3, daily: 2, speech: 0, social: 1, play: 4, calm: 2 },
  moodLog: [],
  rewardStars: 2,
  todayDone: false,
  dailyGoal: 3,
  todayActivities: [],
  badges: [],
  streak: 0,
  hasSeenHome: false,
  lastActiveDate: getTodayKey()
};

const defaultProfile = {
  id: '',
  name: '',
  avatar: 'Avatar Boy 1',
  age: choiceSets.age[0],
  supportLevel: '',
  communication: [],
  letters: choiceSets.letters[0],
  numbers: choiceSets.numbers[0],
  sensory: [],
  dailySkills: [],
  objectives: [],
  learningStyle: ['Images'],
  interests: [],
  diagnosisConfirmed: false
};

const categoryLabels = {
  learn: 'Learn',
  daily: 'Daily',
  speech: 'Communication',
  social: 'Social',
  play: 'Games',
  calm: 'Calm'
};

const backgroundTopics = [
  { id: 'cars', label: 'Cars', image: carsBackground, icon: Car },
  { id: 'dinos', label: 'Dinos', image: dinosBackground, icon: Bone },
  { id: 'dragons', label: 'Dragons', image: dragonsBackground, icon: Flame },
  { id: 'flowers', label: 'Flowers', image: flowersBackground, icon: Flower2 },
  { id: 'rockets', label: 'Rockets', image: rocketsBackground, icon: Rocket },
  { id: 'unicorns', label: 'Unicorns', image: unicornsBackground, icon: Sparkles }
];

function getBackgroundTopic(topicId) {
  return backgroundTopics.find((topic) => topic.id === topicId) || null;
}

const imageAssets = {
  'Avatar Boy 1': boyHappyAvatar,
  'Avatar Boy 2': avatarBoy2,
  'Avatar Girl 1': avatarGirl1,
  'Avatar Girl 2': avatarGirl2,
  'Boy Angry': boyAngryAvatar,
  'Boy 2 Excited': boy2ExcitedAvatar,
  'Boy 2 Happy': avatarBoy2,
  'Boy 2 Mad': boy2MadAvatar,
  'Boy 2 Okay': boy2OkayAvatar,
  'Boy 2 Sad': boy2SadAvatar,
  'Boy 2 Worried': boy2WorriedAvatar,
  'Boy Excited': boyExcitedAvatar,
  'Boy Happy': boyHappyAvatar,
  'Boy Okay': boyOkayAvatar,
  'Boy Sad': boySadAvatar,
  'Boy Worried': boyWorriedAvatar,
  'Boy Washing Hands': boyWashingHandsAvatar,
  'Girl 1 Excited': girl1ExcitedAvatar,
  'Girl 1 Happy': avatarGirl1,
  'Girl 1 Mad': girl1MadAvatar,
  'Girl 1 Okay': girl1OkayAvatar,
  'Girl 1 Sad': girl1SadAvatar,
  'Girl 1 Worried': girl1WorriedAvatar,
  'Girl 2 Excited': girl2ExcitedAvatar,
  'Girl 2 Happy': avatarGirl2,
  'Girl 2 Mad': girl2MadAvatar,
  'Girl 2 Okay': girl2OkayAvatar,
  'Girl 2 Sad': girl2SadAvatar,
  'Girl 2 Worried': girl2WorriedAvatar,
  Angry: angryFaceImage,
  A: happyFaceImage,
  Backpack: backpackImage,
  BAG: backpackImage,
  Bed: bedImage,
  bed: bedImage,
  BELL: doneImage,
  Blue: waterImage,
  'Brush Step 1': brushStep1Image,
  'Brush Step 2': brushStep2Image,
  'Brush Step 3': brushStep3Image,
  'Brush Step 4': brushStep4Image,
  'Brush Step 5': brushStep5Image,
  'Brush Teeth': brushTeethImage,
  Breathe: flowerImage,
  B: backpackImage,
  Bathroom: bathroomImage,
  'Bathroom Routine': bathroomImage,
  'Color Match': flowerImage,
  COLOR: flowerImage,
  Cloud: flowerImage,
  CHECK: doneImage,
  Circle: flowerImage,
  TOOTH: brushTeethImage,
  CAT: catImage,
  Cat: catImage,
  cat: catImage,
  Cup: cupImage,
  cup: cupImage,
  Drink: cupImage,
  'Drink Water Reminder': waterImage,
  Done: doneImage,
  Eye: eyeImage,
  Excited: excitedFaceImage,
  FEEL: happyFaceImage,
  FLOWER: flowerImage,
  Food: cupImage,
  'Fast food': cupImage,
  Flower: flowerImage,
  Green: flowerImage,
  HAPPY: happyFaceImage,
  Happy: happyFaceImage,
  Heart: heartImage,
  Help: needsBoardImage,
  HELP: needsBoardImage,
  HI: happyFaceImage,
  Mad: angryFaceImage,
  'Memory Cards': heartImage,
  More: needsBoardImage,
  'Morning Routine': sunImage,
  Moon: bedImage,
  M: heartImage,
  Needs: needsBoardImage,
  Okay: okayFaceImage,
  Rain: waterImage,
  Red: flowerImage,
  SAD: sadFaceImage,
  Sad: sadFaceImage,
  Square: backpackImage,
  Star: doneImage,
  Simple: catImage,
  Sleep: bedImage,
  Sleepy: tiredFaceImage,
  Surprised: excitedFaceImage,
  Sun: sunImage,
  sun: sunImage,
  S: sunImage,
  Thirsty: waterImage,
  TIRED: tiredFaceImage,
  'Tie Shoes': tieShoesImage,
  LACE: tieShoesImage,
  Leaf: flowerImage,
  Triangle: backpackImage,
  Tired: tiredFaceImage,
  TV: needsBoardImage,
  Water: waterImage,
  Worried: worriedFaceImage,
  Yellow: sunImage,
  'Emotion Cards': happyFaceImage,
  'Feel Check': happyFaceImage,
  Feelings: happyFaceImage,
  Faces: sadFaceImage,
  'Match Pairs': sunImage,
  'Number Garden': flowerImage,
  PAIR: sunImage,
  RAIN: waterImage,
  RED: flowerImage,
  SHARE: heartImage,
  SHIRT: backpackImage,
  SOAP: washHandsImage,
  SOFT: calmBreakImage,
  SORT: shapeSortImage,
  SND: waterImage,
  STAR: doneImage,
  'Simple Words': catImage,
  'Say Hello': happyFaceImage,
  'Speech Table': needsBoardImage,
  'Speech Board': needsBoardImage,
  'I Want Board': needsBoardImage,
  'I Need Help': needsBoardImage,
  'Yes or No': doneImage,
  'More or Done': doneImage,
  'Choice Board': needsBoardImage,
  'Feeling Words': happyFaceImage,
  'I want': needsBoardImage,
  'I need': needsBoardImage,
  'I feel': happyFaceImage,
  'More please': needsBoardImage,
  'All done': doneImage,
  Eat: cupImage,
  Drink: waterImage,
  Play: toysImage,
  Sleep: bedImage,
  Yes: doneImage,
  No: angryFaceImage,
  Break: breakImage,
  Toy: toysImage,
  Again: doneImage,
  Stop: angryFaceImage,
  First: sunImage,
  Then: doneImage,
  Please: heartImage,
  'Thank you': heartImage,
  'Shape Sort': shapeSortImage,
  'Soft Visuals': calmBreakImage,
  'Sort It': shapeSortImage,
  'Bedtime Routine': bedImage,
  'Copy Movements': happyFaceImage,
  'Count Sheep': bedImage,
  'Emotion Picture Board': happyFaceImage,
  'Joint Attention': eyeImage,
  'Pack Backpack': backpackImage,
  'Picture Talk': needsBoardImage,
  AAC: needsBoardImage,
  AIR: flowerImage,
  AM: sunImage,
  FACE: sadFaceImage,
  'Get Dressed': backpackImage,
  'Letter Match': happyFaceImage,
  'Share Toys': toysImage,
  'Sensory Images': flowerImage,
  'Sound + Picture': waterImage,
  'Star Rewards': doneImage,
  'Tie Step 1': tieStep1Image,
  'Tie Step 2': tieStep2Image,
  'Tie Step 3': tieStep3Image,
  'Tie Step 4': tieStep4Image,
  'Tie Step 5': tieStep5Image,
  'Take Turns': heartImage,
  TIME: doneImage,
  Timer: doneImage,
  TURN: heartImage,
  'Use Words or AAC': needsBoardImage,
  'Wash Hands': washHandsImage,
  'Today check-in': doneImage,
  'Yoga Calm': flowerImage
};

const avatarOptions = [
  { key: 'Avatar Boy 1', label: 'Boy 1' },
  { key: 'Avatar Girl 1', label: 'Girl 1' },
  { key: 'Avatar Boy 2', label: 'Boy 2' },
  { key: 'Avatar Girl 2', label: 'Girl 2' }
];

function normalizeAvatar(avatar) {
  if (avatarOptions.some((option) => option.key === avatar)) return avatar;
  return defaultProfile.avatar;
}

const moodAvatarMap = {
  'Avatar Boy 1': {
    Angry: 'Boy Angry',
    Excited: 'Boy Excited',
    Happy: 'Boy Happy',
    Mad: 'Boy Angry',
    Okay: 'Boy Okay',
    Sad: 'Boy Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Boy Worried'
  },
  'Avatar Boy 2': {
    Angry: 'Boy 2 Mad',
    Excited: 'Boy 2 Excited',
    Happy: 'Boy 2 Happy',
    Mad: 'Boy 2 Mad',
    Okay: 'Boy 2 Okay',
    Sad: 'Boy 2 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Boy 2 Worried'
  },
  'Avatar Girl 1': {
    Angry: 'Girl 1 Mad',
    Excited: 'Girl 1 Excited',
    Happy: 'Girl 1 Happy',
    Mad: 'Girl 1 Mad',
    Okay: 'Girl 1 Okay',
    Sad: 'Girl 1 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Girl 1 Worried'
  },
  'Avatar Girl 2': {
    Angry: 'Girl 2 Mad',
    Excited: 'Girl 2 Excited',
    Happy: 'Girl 2 Happy',
    Mad: 'Girl 2 Mad',
    Okay: 'Girl 2 Okay',
    Sad: 'Girl 2 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Girl 2 Worried'
  }
};

function getMoodAvatar(mood, avatar = defaultProfile.avatar) {
  const avatarMoods = moodAvatarMap[avatar] || moodAvatarMap[defaultProfile.avatar];
  return avatarMoods?.[mood] || avatar;
}

function getCommunicationOptions(supportLevel) {
  const normalizedLevel = supportLevelDetails.find((level) => supportLevel?.startsWith(level.title))?.value;
  return choiceSets.communicationByLevel[normalizedLevel] || [];
}

function normalizeSupportLevel(supportLevel) {
  return supportLevelDetails.find((level) => supportLevel?.startsWith(level.title))?.value || supportLevel || '';
}

function getImageAsset(key) {
  return key ? imageAssets[key] : null;
}

function VisualAsset({ label, imageKey, className = 'visual-image', fallback = true }) {
  const src = getImageAsset(imageKey || label);
  if (!src) return fallback ? label : null;
  return <img className={className} src={src} alt="" aria-hidden="true" />;
}

function Avatar({ avatar = defaultProfile.avatar, name = 'Child', size = 'medium' }) {
  return (
    <span className={`avatar avatar-${size}`} aria-label={`${name} avatar`} role="img">
      <VisualAsset label={avatar} imageKey={avatar} className="avatar-image" fallback={false} />
    </span>
  );
}

const activities = {
  learn: [
    { title: 'Letter Match', icon: 'A', level: 'basic', detail: 'Match the same uppercase letter', tags: ['letters', 'images'] },
    { title: 'Simple Words', icon: 'CAT', level: 'word', detail: 'Pick the word that matches a picture', tags: ['reading'] },
    { title: 'Number Garden', icon: '1 2', level: 'basic', detail: 'Count pictures and choose the number', tags: ['numbers'] },
    { title: 'Shape Sort', icon: 'SH', level: 'basic', detail: 'Match shapes into the right group', tags: ['shapes'] },
    { title: 'Memory Cards', icon: 'M', level: 'basic', detail: 'Flip cards and find matching pairs', tags: ['memory'] },
    { title: 'Color Match', icon: 'RED', level: 'basic', detail: 'Choose the color that matches the card', tags: ['colors'] }
  ],
  daily: [
    { title: 'Tie Shoes', icon: 'LACE', detail: 'Step-by-step shoe tying' },
    { title: 'Brush Teeth', icon: 'TOOTH', detail: 'Gentle routine practice' },
    { title: 'Wash Hands', icon: 'SOAP', detail: 'Clean hands sequence' },
    { title: 'Bathroom Routine', icon: 'Bathroom', detail: 'Independent bathroom steps' },
    { title: 'Get Dressed', icon: 'SHIRT', detail: 'Clothes in order' },
    { title: 'Pack Backpack', icon: 'BAG', detail: 'School-ready checklist' },
    { title: 'Drink Water Reminder', icon: 'Water', detail: 'Remember to drink water' },
    { title: 'Bedtime Routine', icon: 'Bedtime Routine', detail: 'Calm sequence before sleep' },
    { title: 'Morning Routine', icon: 'AM', detail: 'First, next, then' }
  ],
  speech: [
    { title: 'Communication Board', icon: 'Speech Board', detail: 'Tap picture words to speak a clear message' },
    { title: 'I Want Board', icon: 'I want', detail: 'Practice asking for a favorite item' },
    { title: 'I Need Help', icon: 'HELP', detail: 'Use help, break, bathroom, or water words' },
    { title: 'Yes or No', icon: 'Yes', detail: 'Choose yes, no, stop, or again' },
    { title: 'More or Done', icon: 'More', detail: 'Practice more, finished, please, and thank you' },
    { title: 'Feeling Words', icon: 'FEEL', detail: 'Say a feeling with a picture cue' }
  ],
  social: [
    { title: 'Say Hello', icon: 'HI', detail: 'Greeting familiar people' },
    { title: 'Use Words or AAC', icon: 'AAC', detail: 'Choose words, gestures, or AAC to communicate' },
    { title: 'Picture Talk', icon: 'Picture Talk', detail: 'Express needs with image choices' },
    { title: 'Take Turns', icon: 'TURN', detail: 'Wait, play, pass' },
    { title: 'Joint Attention', icon: 'Joint Attention', detail: 'Look, point, and share an object' },
    { title: 'Ask Help', icon: 'HELP', detail: 'Practice help choices' },
    { title: 'Share Toys', icon: 'SHARE', detail: 'Simple sharing story' },
    { title: 'Copy Movements', icon: 'Copy Movements', detail: 'Imitate clap, wave, and use a toy' },
    { title: 'Feelings', icon: 'FEEL', detail: 'Name emotions' },
    { title: 'Faces', icon: 'FACE', detail: 'Recognize expressions' }
  ],
  play: [
    { title: 'Match Pairs', icon: 'PAIR', detail: 'Find the same picture' },
    { title: 'Sort It', icon: 'SORT', detail: 'Put items in groups' },
    { title: 'Emotion Cards', icon: 'MOOD', detail: 'Pick how they feel' },
    { title: 'Emotion Picture Board', icon: 'Emotion Picture Board', detail: 'Choose emotion faces with pictures' },
    { title: 'Sound + Picture', icon: 'SND', detail: 'Quiet mode available' },
    { title: 'Star Rewards', icon: 'STAR', detail: 'Tiny celebration game' }
  ],
  calm: [
    { title: 'Breathe', icon: 'AIR', detail: 'Slow visual breathing' },
    { title: 'Yoga Calm', icon: 'Yoga Calm', detail: 'Cartoon-style stretch and breathe' },
    { title: 'Calm Sounds', icon: 'SND', detail: 'Choose a gentle background sound' },
    { title: 'Sensory Images', icon: 'Sensory Images', detail: 'Pick a quiet image during crisis' }
  ]
};

const learnSections = [
  {
    id: 'daily',
    title: 'Daily Skills',
    icon: 'Tie Shoes',
    detail: 'Practice routines like shoes, teeth, hands, bathroom, dressing, water, and bedtime.'
  },
  {
    id: 'social',
    title: 'Social',
    icon: 'Take Turns',
    detail: 'Practice greetings, turns, sharing, attention, feelings, and asking for help.'
  },
  {
    id: 'numbers-letters',
    title: 'Numbers & Letters',
    icon: 'A',
    detail: 'Learn letters, numbers, words, shapes, colors, and memory matching.'
  }
];

const learnedSkillActivityMap = {
  Dressing: ['Get Dressed'],
  'Brushing teeth': ['Brush Teeth'],
  'Tying shoes': ['Tie Shoes'],
  'Washing hands': ['Wash Hands'],
  'Using the bathroom': ['Bathroom Routine'],
  'Following routines': ['Morning Routine']
};

const resources = [
  'Build routines with the same words and visuals each day.',
  'Offer choices with pictures, gestures, or AAC-style buttons.',
  'Reduce sensory load before practicing a hard skill.',
  'Use short practice sessions and celebrate effort.',
  'Practice joint attention with one shared object, one point, and one simple direction.',
  'Use imitation games such as clap, wave, tap, and toy actions before teaching harder skills.',
  'During a meltdown, lower demands, reduce noise, and prioritize safety.'
];

const lessonSteps = [
  { title: 'Cross', visual: 'Tie Step 1', text: 'Cross the laces.' },
  { title: 'Tunnel', visual: 'Tie Step 2', text: 'Put one lace under the other.' },
  { title: 'Pull', visual: 'Tie Step 3', text: 'Pull both laces snug.' },
  { title: 'Loop', visual: 'Tie Step 4', text: 'Make one bunny ear.' },
  { title: 'Wrap', visual: 'Tie Step 5', text: 'Wrap the other lace around.' },
  { title: 'Finish', visual: 'Tie Shoes', text: 'Pull the loop through.' }
];

const shoeLessonIntro = 'Practice slowly. One step at a time.';

const activityGames = {
  'Color Match': {
    prompt: 'Pick the color that matches the big card.',
    target: { label: 'Red', value: '#ef7464' },
    choices: [
      { label: 'Red', value: '#ef7464' },
      { label: 'Blue', value: '#4f8ecb' },
      { label: 'Green', value: '#78a85f' },
      { label: 'Yellow', value: '#f0b84b' }
    ]
  },
  'Letter Match': {
    prompt: 'Find the same letter.',
    target: { label: 'A', value: 'A' },
    choices: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'M', value: 'M' },
      { label: 'S', value: 'S' }
    ]
  },
  'Number Garden': {
    prompt: 'How many flowers are in the garden?',
    target: { label: '3', value: '3' },
    choices: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ]
  },
  'Shape Sort': {
    prompt: 'Put the circle with the circles.',
    target: { label: 'Circle', value: 'Circle' },
    choices: [
      { label: 'Circle', value: 'Circle' },
      { label: 'Square', value: 'Square' },
      { label: 'Star', value: 'Star' },
      { label: 'Triangle', value: 'Triangle' }
    ]
  },
  'Match Pairs': {
    prompt: 'Choose the picture that makes a pair.',
    target: { label: 'Sun', value: 'Sun' },
    choices: [
      { label: 'Moon', value: 'Moon' },
      { label: 'Sun', value: 'Sun' },
      { label: 'Rain', value: 'Rain' },
      { label: 'Cloud', value: 'Cloud' }
    ]
  }
};

const memoryPairLabels = ['Moon', 'Star', 'Leaf', 'Heart'];

function createMemoryDeck(pairCount) {
  return memoryPairLabels
    .slice(0, pairCount)
    .flatMap((label) => [label, label])
    .map((label, index) => ({ id: `${label}-${index}`, label }));
}

function shuffleCards(cards) {
  const deck = [...cards];
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck;
}

const guidedActivities = {
  'Simple Words': {
    type: 'choices',
    prompt: 'Pick the word that matches the picture.',
    visual: 'CAT',
    correct: 'cat',
    choices: ['cat', 'sun', 'bed', 'cup']
  },
  'Wash Hands': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Turn on water', 'Soap', 'Rub hands', 'Rinse', 'Dry']
  },
  'Brush Teeth': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: [
      { label: 'Toothpaste', image: 'Brush Step 1' },
      { label: 'Brush top', image: 'Brush Step 2' },
      { label: 'Brush bottom', image: 'Brush Step 3' },
      { label: 'Rinse', image: 'Brush Step 4' },
      { label: 'Smile', image: 'Brush Step 5' }
    ]
  },
  'Get Dressed': {
    type: 'steps',
    prompt: 'Tap each clothing step in order.',
    steps: ['Underwear', 'Shirt', 'Pants', 'Socks', 'Shoes']
  },
  'Pack Backpack': {
    type: 'steps',
    prompt: 'Pack the school bag checklist.',
    steps: ['Folder', 'Lunch', 'Water', 'Coat', 'Zip bag']
  },
  'Bathroom Routine': {
    type: 'steps',
    prompt: 'Tap each bathroom step in order.',
    steps: ['Go bathroom', 'Pants down', 'Use toilet', 'Wipe', 'Flush', 'Wash hands']
  },
  'Drink Water Reminder': {
    type: 'script',
    prompt: 'Practice a helpful reminder.',
    lines: ['Reminder', 'Drink water', 'Take a sip', 'All done']
  },
  'Bedtime Routine': {
    type: 'steps',
    prompt: 'Tap the bedtime routine.',
    steps: ['Pajamas', 'Brush teeth', 'Bathroom', 'Story', 'Lights low', 'Sleep']
  },
  'Morning Routine': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Wake up', 'Get dressed', 'Eat breakfast', 'Pack bag']
  },
  'Say Hello': {
    type: 'script',
    prompt: 'Practice a short greeting.',
    lines: ['Look', 'Wave', 'Say hello', 'Wait']
  },
  'Speech Table': {
    type: 'choices',
    prompt: 'Tap a picture word to speak it.',
    visual: 'Speech Board',
    correct: 'I want',
    choices: ['I want', 'I need', 'Help', 'Break', 'More please', 'All done'],
    speak: true
  },
  'I Want Board': {
    type: 'choices',
    prompt: 'Choose a phrase to ask for something.',
    visual: 'I want',
    correct: 'I want',
    choices: ['I want', 'Water', 'Food', 'Toy'],
    speak: true
  },
  'I Need Help': {
    type: 'choices',
    prompt: 'Choose what help you need.',
    visual: 'HELP',
    correct: 'Help',
    choices: ['Help', 'Bathroom', 'Water', 'Break'],
    speak: true
  },
  'Yes or No': {
    type: 'choices',
    prompt: 'Choose a clear answer.',
    visual: 'Yes',
    correct: 'Yes',
    choices: ['Yes', 'No', 'Stop', 'Again'],
    speak: true
  },
  'More or Done': {
    type: 'choices',
    prompt: 'Choose what comes next.',
    visual: 'More',
    correct: 'More please',
    choices: ['More please', 'All done', 'Please', 'Thank you'],
    speak: true
  },
  'Feeling Words': {
    type: 'choices',
    prompt: 'Choose a feeling word to say.',
    visual: 'FEEL',
    correct: 'Happy',
    choices: ['Happy', 'Sad', 'Mad', 'Tired'],
    speak: true
  },
  'Use Words or AAC': {
    type: 'choices',
    prompt: 'Choose a picture to say what you need.',
    visual: 'Needs',
    correct: 'Water',
    choices: ['More', 'Water', 'Bathroom', 'Help']
  },
  'Picture Talk': {
    type: 'choices',
    prompt: 'Choose the picture that says what you need.',
    visual: 'Picture Talk',
    correct: 'Bathroom',
    choices: ['Bathroom', 'Food', 'Water', 'Sleep', 'TV', 'Tired']
  },
  'Ask Help': {
    type: 'choices',
    prompt: 'Choose a clear way to ask for help.',
    visual: 'HELP',
    correct: 'Help please',
    choices: ['Help please', 'No', 'Run', 'Later']
  },
  'Take Turns': {
    type: 'turns',
    prompt: 'Practice taking turns.',
    turns: ['My turn', 'Your turn', 'Wait', 'Play again']
  },
  'Joint Attention': {
    type: 'script',
    prompt: 'Practice shared attention with one object.',
    lines: ['Look', 'Point', 'Show me', 'Your turn', 'Good looking']
  },
  'Share Toys': {
    type: 'turns',
    prompt: 'Practice sharing with a short turn routine.',
    turns: ['My turn', 'Your turn', 'Wait', 'Thank you']
  },
  'Copy Movements': {
    type: 'script',
    prompt: 'Copy each simple movement.',
    lines: ['Clap hands', 'Wave hello', 'Tap table', 'Touch head', 'Use toy']
  },
  'Feelings': {
    type: 'choices',
    prompt: 'Choose the happy face.',
    visual: 'HAPPY',
    correct: 'Happy',
    choices: ['Happy', 'Sad', 'Mad', 'Tired']
  },
  'Emotion Cards': {
    type: 'choices',
    prompt: 'What feeling matches this card?',
    visual: 'SMILE',
    correct: 'Happy',
    choices: ['Happy', 'Worried', 'Sleepy', 'Angry']
  },
  'Emotion Picture Board': {
    type: 'choices',
    prompt: 'Choose the tired face.',
    visual: 'TIRED',
    correct: 'Tired',
    choices: ['Happy', 'Sad', 'Tired', 'Angry']
  },
  Faces: {
    type: 'choices',
    prompt: 'Choose the face that looks sad.',
    visual: 'SAD',
    correct: 'Sad',
    choices: ['Happy', 'Sad', 'Sleepy', 'Surprised']
  },
  'Sort It': {
    type: 'choices',
    prompt: 'Which item belongs with colors?',
    visual: 'COLOR',
    correct: 'Red',
    choices: ['Red', 'Cup', 'Shoe', 'Bed']
  },
  'Sound + Picture': {
    type: 'choices',
    prompt: 'Match the quiet sound card to the picture.',
    visual: 'RAIN',
    correct: 'Rain',
    choices: ['Rain', 'Car', 'Bell', 'Clap']
  },
  'Star Rewards': {
    type: 'script',
    prompt: 'Practice a small celebration.',
    lines: ['Try', 'Finish', 'Star', 'All done']
  },
  'Soft Visuals': {
    type: 'breath',
    prompt: 'Watch the soft visual and count three breaths.',
    steps: ['Breathe in', 'Breathe out', 'Rest']
  },
  'Yoga Calm': {
    type: 'script',
    prompt: 'Copy the calm yoga cartoon steps.',
    lines: ['Reach up', 'Fold down', 'Hands heart', 'Breathe in', 'Breathe out']
  },
  'Count Sheep': {
    type: 'count',
    prompt: 'Count five bedtime pictures slowly.',
    items: ['1', '2', '3', '4', '5']
  },
  'Sensory Images': {
    type: 'choices',
    prompt: 'Choose a calm sensory picture.',
    visual: 'FLOWER',
    correct: 'Flower',
    choices: ['Flower', 'Sun', 'Bed', 'Cup']
  },
  'Feel Check': {
    type: 'choices',
    prompt: 'Choose how this card feels.',
    visual: 'OKAY',
    correct: 'Okay',
    choices: ['Happy', 'Okay', 'Mad', 'Tired']
  },
  Breathe: {
    type: 'breath',
    prompt: 'Take three slow breaths.',
    steps: ['Breathe in', 'Breathe out', 'Rest']
  },
  Timer: {
    type: 'timer',
    prompt: 'Start a short calm timer.'
  }
};

const speechBoards = {
  'Speech Table': {
    type: 'communication-board'
  },
  'Communication Board': {
    type: 'communication-board'
  },
  'I Want Board': {
    phraseStarters: ['I want', 'More please'],
    groups: [
      {
        title: 'I want',
        cards: [
          { label: 'Water', image: 'Water', speak: 'water' },
          { label: 'Food', image: 'Food', speak: 'food' },
          { label: 'Toy', image: 'Toy', speak: 'toy' },
          { label: 'Play', image: 'Play', speak: 'play' },
          { label: 'Again', image: 'Again', speak: 'again' },
          { label: 'All done', image: 'All done', speak: 'all done' }
        ]
      }
    ]
  },
  'I Need Help': {
    phraseStarters: ['I need'],
    groups: [
      {
        title: 'Help',
        cards: [
          { label: 'Help', image: 'Help', speak: 'help' },
          { label: 'Break', image: 'Break', speak: 'break' },
          { label: 'Bathroom', image: 'Bathroom', speak: 'bathroom' },
          { label: 'Water', image: 'Water', speak: 'water' },
          { label: 'Sleep', image: 'Sleep', speak: 'sleep' },
          { label: 'Stop', image: 'Stop', speak: 'stop' }
        ]
      }
    ]
  },
  'Yes or No': {
    phraseStarters: [],
    groups: [
      {
        title: 'Answers',
        cards: [
          { label: 'Yes', image: 'Yes', speak: 'yes' },
          { label: 'No', image: 'No', speak: 'no' },
          { label: 'Stop', image: 'Stop', speak: 'stop' },
          { label: 'Again', image: 'Again', speak: 'again' }
        ]
      }
    ]
  },
  'More or Done': {
    phraseStarters: [],
    groups: [
      {
        title: 'More or done',
        cards: [
          { label: 'More please', image: 'More please', speak: 'more please' },
          { label: 'All done', image: 'All done', speak: 'all done' },
          { label: 'Please', image: 'Please', speak: 'please' },
          { label: 'Thank you', image: 'Thank you', speak: 'thank you' }
        ]
      }
    ]
  },
  'Feeling Words': {
    phraseStarters: ['I feel'],
    groups: [
      {
        title: 'Feelings',
        cards: [
          { label: 'Happy', image: 'Happy', speak: 'happy' },
          { label: 'Excited', image: 'Excited', speak: 'excited' },
          { label: 'Okay', image: 'Okay', speak: 'okay' },
          { label: 'Sad', image: 'Sad', speak: 'sad' },
          { label: 'Worried', image: 'Worried', speak: 'worried' },
          { label: 'Mad', image: 'Mad', speak: 'mad' },
          { label: 'Tired', image: 'Tired', speak: 'tired' }
        ]
      }
    ]
  }
};

function loadJson(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function saveText(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function loadText(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function resetLocalStateFromUrl() {
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

function asArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function asChoiceArray(value, fallback = []) {
  if (Array.isArray(value)) return value;
  return value ? [value] : fallback;
}

function hasChoiceText(values, text) {
  return asChoiceArray(values).some((value) => value.includes(text));
}

function formatChoiceList(values) {
  const list = asChoiceArray(values);
  return list.length ? list.join(', ') : 'Not set';
}

function createProfileId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `child-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeProfile(saved) {
  if (!saved || typeof saved !== 'object') return null;
  return {
    ...defaultProfile,
    ...saved,
    id: saved.id || createProfileId(),
    avatar: normalizeAvatar(saved.avatar),
    supportLevel: normalizeSupportLevel(saved.supportLevel),
    communication: asChoiceArray(saved.communication),
    sensory: asArray(saved.sensory),
    dailySkills: asArray(saved.dailySkills),
    objectives: asArray(saved.objectives),
    learningStyle: asArray(saved.learningStyle, defaultProfile.learningStyle),
    interests: asArray(saved.interests),
    diagnosisConfirmed: Boolean(saved.diagnosisConfirmed)
  };
}

function loadProfiles() {
  const savedProfiles = asArray(loadJson(PROFILES_KEY, []))
    .map((item) => normalizeProfile(item))
    .filter(Boolean);
  if (savedProfiles.length) return savedProfiles;
  const legacyProfile = normalizeProfile(loadJson(STORAGE_KEY, null));
  return legacyProfile ? [legacyProfile] : [];
}

function getInitialProfileState() {
  const profiles = loadProfiles();
  const activeId = loadText(ACTIVE_PROFILE_KEY);
  const profile = profiles.find((item) => item.id === activeId) || profiles[0] || null;
  return { profiles, profile };
}

function getProgressStorageKey(profileId) {
  return profileId ? `${PROGRESS_KEY}-${profileId}` : PROGRESS_KEY;
}

function normalizeProgress(saved) {
  const todayKey = getTodayKey();
  const lastActiveDate = saved?.lastActiveDate || todayKey;
  const isNewDay = lastActiveDate !== todayKey;
  const streak = isNewDay && saved?.todayDone ? (saved?.streak || 0) + 1 : (saved?.streak || 0);
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

function getPersonalization(profile) {
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

function App() {
  const [{ profiles, profile }, setProfileState] = useState(getInitialProfileState);
  const [progress, setProgress] = useState(() => normalizeProgress(loadJson(getProgressStorageKey(profile?.id), loadJson(PROGRESS_KEY, defaultProgress))));
  const [screen, setScreen] = useState(profile ? 'home' : 'onboarding');
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [learnSection, setLearnSection] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [profileDraft, setProfileDraft] = useState(undefined);
  const [welcomeProfileId, setWelcomeProfileId] = useState(null);
  const [backgroundTopicId, setBackgroundTopicId] = useState(() => loadText(BACKGROUND_TOPIC_KEY) || '');
  const [language, setLanguage] = useState(() => loadText(LANGUAGE_KEY) || 'en');

  const personalization = useMemo(() => getPersonalization(profile), [profile]);
  const activeAvatar = getMoodAvatar(progress.moodLog[0]?.mood, profile?.avatar);
  const backgroundTopic = getBackgroundTopic(backgroundTopicId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [screen]);

  useEffect(() => {
    if (screen !== 'home') {
      setWelcomeProfileId(null);
      return;
    }
    if (!profile || progress.hasSeenHome) return;
    setWelcomeProfileId(profile.id);
    const next = { ...progress, hasSeenHome: true };
    setProgress(next);
    saveJson(getProgressStorageKey(profile.id), next);
  }, [screen, profile?.id, progress.hasSeenHome]);

  function persistActiveProfile(nextProfile, nextProfiles) {
    setProfileState({ profiles: nextProfiles, profile: nextProfile });
    setSoundOff(false);
    saveJson(PROFILES_KEY, nextProfiles);
    saveJson(STORAGE_KEY, nextProfile);
    saveText(ACTIVE_PROFILE_KEY, nextProfile.id);
  }

  function saveProgress(next) {
    saveJson(getProgressStorageKey(profile?.id), next);
  }

  function completeActivity(name, category) {
    const nextTodayActivities = Array.from(new Set([...progress.todayActivities, name]));
    const earnedBadges = [...progress.badges];
    if (category === 'calm' && !earnedBadges.includes('Calm Helper')) {
      earnedBadges.push('Calm Helper');
    }
    if (nextTodayActivities.length === 1 && !earnedBadges.includes('First Step')) {
      earnedBadges.push('First Step');
    }
    const next = {
      ...progress,
      completed: Array.from(new Set([...progress.completed, name])),
      practiced: Array.from(new Set([...progress.practiced, name])),
      counts: { ...progress.counts, [category]: (progress.counts[category] || 0) + 1 },
      rewardStars: progress.rewardStars + 2,
      todayActivities: nextTodayActivities,
      todayDone: nextTodayActivities.length >= progress.dailyGoal,
      badges: earnedBadges,
      lastActiveDate: getTodayKey()
    };
    setProgress(next);
    saveProgress(next);
    setCelebration({
      title: 'Great job!',
      message: `${name} is complete.`,
      stars: 2,
      badge: earnedBadges.length > progress.badges.length ? earnedBadges[earnedBadges.length - 1] : null,
      completeCount: nextTodayActivities.length,
      goal: progress.dailyGoal
    });
    setScreen('celebration');
  }

  function handleQuickChoice(choice) {
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const updates = {
      happy: {
        moodLog: [{ mood: 'Happy', time: now }, ...progress.moodLog].slice(0, 5),
        rewardStars: progress.rewardStars + 1,
        lastActiveDate: getTodayKey()
      }
    };
    const next = { ...progress, ...updates[choice] };
    setProgress(next);
    saveProgress(next);
  }

  function handleMoodChoice(mood) {
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const next = {
      ...progress,
      moodLog: [{ mood, time: now }, ...progress.moodLog].slice(0, 5),
      rewardStars: progress.rewardStars + 1,
      lastActiveDate: getTodayKey()
    };
    setProgress(next);
    saveProgress(next);
  }

  function handleProfile(nextProfile) {
    const normalizedProfile = normalizeProfile(nextProfile);
    const exists = profiles.some((item) => item.id === normalizedProfile.id);
    const nextProfiles = exists
      ? profiles.map((item) => item.id === normalizedProfile.id ? normalizedProfile : item)
      : [...profiles, normalizedProfile];
    persistActiveProfile(normalizedProfile, nextProfiles);
    setProgress(normalizeProgress(loadJson(getProgressStorageKey(normalizedProfile.id), defaultProgress)));
    setProfileDraft(undefined);
    setScreen(exists ? 'home' : 'avatar');
  }

  function updateProfile(updates) {
    const normalizedProfile = normalizeProfile({ ...profile, ...updates });
    const nextProfiles = profiles.map((item) => item.id === normalizedProfile.id ? normalizedProfile : item);
    persistActiveProfile(normalizedProfile, nextProfiles);
  }

  function switchProfile(profileId) {
    const nextProfile = profiles.find((item) => item.id === profileId);
    if (!nextProfile) return;
    persistActiveProfile(nextProfile, profiles);
    setProgress(normalizeProgress(loadJson(getProgressStorageKey(nextProfile.id), defaultProgress)));
    setScreen('home');
  }

  function startNewProfile() {
    setProfileDraft(null);
    setScreen('onboarding');
  }

  function openSpeechTable() {
    const speechTable = activities.speech.find((activity) => activity.title === 'Communication Board');
    if (!speechTable) return;
    setActiveActivity({ ...speechTable, category: 'speech', backScreen: 'home' });
    setScreen('activity');
  }

  function updateBackgroundTopic(topicId) {
    setBackgroundTopicId(topicId);
    saveText(BACKGROUND_TOPIC_KEY, topicId);
  }

  function updateLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    saveText(LANGUAGE_KEY, nextLanguage);
  }

  if (screen === 'onboarding') {
    return (
      <LanguageContext.Provider value={language}>
        <Onboarding
          onComplete={handleProfile}
          initialProfile={profileDraft === undefined ? profile : profileDraft}
          language={language}
          onLanguageChange={updateLanguage}
        />
      </LanguageContext.Provider>
    );
  }

  if (screen === 'avatar' && profile) {
    return <ChildAvatarSetup profile={profile} onChoose={(avatar) => {
      updateProfile({ avatar });
      setScreen('home');
    }} />;
  }

  return (
    <LanguageContext.Provider value={language}>
      <div
        className={backgroundTopic ? 'app-shell has-topic-background' : 'app-shell'}
        style={backgroundTopic ? { '--topic-background': `url(${backgroundTopic.image})` } : undefined}
      >
        <header className="topbar">
          <div className="brand">
            <button className="avatar-button" type="button" onClick={() => setScreen('avatar')} aria-label={translateText('Change avatar', language)}>
              <Avatar avatar={activeAvatar} name={profile?.name || 'Child'} size="small" />
            </button>
            <button className="brand-copy" type="button" onClick={() => setScreen('home')} aria-label={translateText('Go home', language)}>
              <strong>BrightSteps</strong>
              <small>{profile?.name ? `${translateText('For', language)} ${profile.name}` : translateText('Learning companion', language)}</small>
            </button>
          </div>
          <div className="topbar-actions">
            <LanguageSwitcher value={language} onChange={updateLanguage} />
            <BackgroundTopicPicker
              value={backgroundTopicId}
              onChange={updateBackgroundTopic}
            />
            <button
              className="calm-header-button"
              type="button"
              onClick={() => setScreen('calm')}
              aria-label={translateText('Open Calm Zone', language)}
              title={translateText('Calm Zone', language)}
            >
              <Leaf size={18} />
              <span>{translateText('Calm Zone', language)}</span>
            </button>
            <button
              className="icon-button"
              onClick={() => setSoundOff((value) => !value)}
              aria-label={translateText(soundOff ? 'Enable sound' : 'Disable sound', language)}
              title={translateText(soundOff ? 'Enable sound' : 'Disable sound', language)}
            >
              {soundOff ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </header>

        <main className="main-content">
        {screen === 'home' && (
          <ChildHome
            profile={profile}
            activeAvatar={activeAvatar}
            progress={progress}
            isFirstHomeVisit={welcomeProfileId === profile?.id || !progress.hasSeenHome}
            soundOff={soundOff}
            setScreen={setScreen}
            onLearn={() => {
              setLearnSection(null);
              setScreen('learn');
            }}
            onChangeAvatar={() => setScreen('avatar')}
            onSpeechTable={openSpeechTable}
            onQuickChoice={handleQuickChoice}
            onMoodChoice={handleMoodChoice}
          />
        )}
        {['learn', 'daily', 'speech', 'social', 'play', 'calm'].includes(screen) && (
          <CategoryPage
            category={screen}
            profile={profile}
            progress={progress}
            soundOff={soundOff}
            learnSection={learnSection}
            onBack={() => {
              if (screen === 'learn' && learnSection) {
                setLearnSection(null);
                return;
              }
              setScreen('home');
            }}
            onLearnSection={setLearnSection}
            onLesson={(activity) => {
              setActiveActivity({ ...activity, category: 'daily', backScreen: 'learn' });
              setScreen('shoeLesson');
            }}
            onStart={(activity) => {
              const activityCategory = screen === 'learn'
                ? (learnSection === 'numbers-letters' ? 'learn' : learnSection || 'learn')
                : screen;
              setActiveActivity({ ...activity, category: activityCategory, backScreen: screen === 'learn' ? 'learn' : undefined });
              setScreen('activity');
            }}
          />
        )}
        {screen === 'activity' && activeActivity && (
          <ActivityPlayer
            activity={activeActivity}
            profile={profile}
            soundOff={soundOff}
            onBack={() => setScreen(activeActivity.backScreen || activeActivity.category)}
            onComplete={() => {
              completeActivity(activeActivity.title, activeActivity.category);
            }}
          />
        )}
        {screen === 'celebration' && celebration && (
          <Celebration
            celebration={celebration}
            onContinue={() => setScreen(activeActivity?.backScreen || activeActivity?.category || 'home')}
            onHome={() => setScreen('home')}
          />
        )}
        {screen === 'shoeLesson' && (
          <ShoeLesson
            onBack={() => setScreen('learn')}
            onComplete={() => {
              completeActivity('Tie Shoes', 'daily');
            }}
          />
        )}
        {screen === 'parents' && (
          parentUnlocked ? (
            <ParentDashboard
              profile={profile}
              profiles={profiles}
              progress={progress}
              personalization={personalization}
              onProfileChange={updateProfile}
              onSwitchProfile={switchProfile}
              onAddChild={startNewProfile}
              onEdit={() => {
                setProfileDraft(profile);
                setScreen('onboarding');
              }}
              onReset={() => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(PROFILES_KEY);
                localStorage.removeItem(ACTIVE_PROFILE_KEY);
                localStorage.removeItem(PROGRESS_KEY);
                localStorage.removeItem(BACKGROUND_TOPIC_KEY);
                localStorage.removeItem(LANGUAGE_KEY);
                profiles.forEach((item) => localStorage.removeItem(getProgressStorageKey(item.id)));
                setProfileState({ profiles: [], profile: null });
                setProgress(normalizeProgress(defaultProgress));
                setParentUnlocked(false);
                setProfileDraft(undefined);
                setScreen('onboarding');
              }}
            />
          ) : (
            <ParentGate onUnlock={() => setParentUnlocked(true)} onBack={() => setScreen('home')} />
          )
        )}
        </main>

        <nav className="bottom-nav" aria-label="Main sections">
          <NavButton icon={<Home />} label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
          <NavButton icon={<Lock />} label="Parents" active={screen === 'parents'} onClick={() => setScreen('parents')} />
        </nav>
      </div>
    </LanguageContext.Provider>
  );
}

function LanguageSwitcher({ value, onChange }) {
  const languages = [
    { id: 'en', label: 'English', shortLabel: 'EN' },
    { id: 'es', label: 'Español', shortLabel: 'ES' }
  ];

  return (
    <div className="language-switcher" aria-label="Choose language">
      <Languages size={18} aria-hidden="true" />
      <div className="language-options">
        {languages.map((language) => (
          <button
            key={language.id}
            type="button"
            className={value === language.id ? 'language-option active' : 'language-option'}
            aria-pressed={value === language.id}
            title={language.label}
            onClick={() => onChange(language.id)}
          >
            <span className="language-short">{language.shortLabel}</span>
            <span className="language-full">{language.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Onboarding({ onComplete, initialProfile, language, onLanguageChange }) {
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

function BackgroundTopicPicker({ value, onChange }) {
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

function DailySkillsChoice({ values, onChange }) {
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

function ParentGoalsChoice({ values, onChange, dashboard = false }) {
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

function ChildAvatarSetup({ profile, onChoose }) {
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
            <p>{profile.name || (language === 'es' ? 'Tu nino' : 'Your child')} {language === 'es' ? 'puede escoger la imagen que quiere usar en BrightSteps.' : 'can pick the picture they want to use in BrightSteps.'}</p>
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

function ChildHome({ profile, activeAvatar, progress, isFirstHomeVisit, soundOff, setScreen, onLearn, onChangeAvatar, onSpeechTable, onQuickChoice, onMoodChoice }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  const cards = [
    { id: 'learn', label: 'Learn', icon: <BookOpen />, tone: 'mint' },
    { id: 'speech', label: 'Communication', icon: <MessageSquare />, tone: 'aqua' },
    { id: 'play', label: 'Games', icon: <Puzzle />, tone: 'sky' }
  ];
  const moodOptions = [
    { face: ':)', label: 'Happy', image: 'Happy' },
    { face: ':D', label: 'Excited', image: 'Excited' },
    { face: ':|', label: 'Okay', image: 'Okay' },
    { face: ':(', label: 'Sad', image: 'Sad' },
    { face: ':/', label: 'Worried', image: 'Worried' },
    { face: '>:(', label: 'Mad', image: 'Mad' }
  ];
  const currentMood = moodOptions.find((mood) => mood.label === progress.moodLog[0]?.mood);
  const quickChoices = {
    happy: {
      icon: <VisualAsset label={currentMood?.face || 'Happy'} imageKey={currentMood?.image || 'Happy'} className="quick-choice-image" fallback={false} />,
      label: currentMood?.label || 'Mood',
      title: 'Choose a feeling',
      message: 'Pick the face that shows how you feel.'
    }
  };

  function selectQuickChoice(choice) {
    if (choice === 'happy') {
      setMoodPickerOpen((value) => !value);
      return;
    }
    onQuickChoice(choice);
    setMoodPickerOpen(false);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(t(quickChoices[choice].label));
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  function selectMood(mood) {
    onMoodChoice(mood.label);
    setMoodPickerOpen(false);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(t(mood.label));
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <>
      <section className="welcome-band">
        <div className="welcome-copy">
          <p className="eyebrow">{t(isFirstHomeVisit ? 'Welcome' : 'Welcome back')}</p>
          <h1>{language === 'es' ? `Hola ${profile?.name || 'amigo'}, vamos a divertirnos hoy!` : `Hi ${profile?.name || 'friend'}, let's have fun today!`}</h1>
        </div>
        <button className="home-avatar-card avatar-edit-button" type="button" onClick={onChangeAvatar} aria-label={t('Change avatar')}>
          <Avatar avatar={activeAvatar} name={profile?.name || 'Child'} size="hero" />
        </button>
        <div className="aac-row" aria-label="Quick visual choices">
          {Object.entries(quickChoices).map(([choice, item]) => (
            <button key={choice} type="button" onClick={() => selectQuickChoice(choice)}>
              {item.icon}
              {t(item.label)}
            </button>
          ))}
        </div>
      </section>
      {moodPickerOpen && (
        <section className="mood-picker" aria-label="Choose mood">
          {moodOptions.map((mood) => (
            <button
              key={mood.label}
              type="button"
              className={progress.moodLog[0]?.mood === mood.label ? 'mood-card selected' : 'mood-card'}
              onClick={() => selectMood(mood)}
            >
              <span aria-hidden="true"><VisualAsset label={mood.face} imageKey={mood.image} /></span>
              <strong>{t(mood.label)}</strong>
            </button>
          ))}
        </section>
      )}
      <section className="child-grid primary-child-grid" aria-label="Activity sections">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`big-card ${card.tone}`}
            onClick={card.id === 'speech' ? onSpeechTable : card.id === 'learn' ? onLearn : () => setScreen(card.id)}
          >
            {card.icon}
            <span>{t(card.label)}</span>
          </button>
        ))}
      </section>
    </>
  );
}

function Celebration({ celebration, onContinue, onHome }) {
  const t = useT();
  return (
    <section className="celebration-page">
      <div className="celebration-burst" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="celebration-panel">
        <div className="celebration-star"><Star /></div>
        <h1>{t(celebration.title)}</h1>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onHome}>{t('Home')}</button>
          <button className="primary-button" type="button" onClick={onContinue}>{t('Keep practicing')}</button>
        </div>
      </div>
    </section>
  );
}

function CategoryPage({ category, profile, progress, soundOff, learnSection, onBack, onLearnSection, onLesson, onStart }) {
  const t = useT();
  const [showLearnedSkills, setShowLearnedSkills] = useState(false);
  const titles = {
    learn: ['Learn', <BookOpen key="i" />],
    daily: ['Daily Skills', <HeartHandshake key="i" />],
    speech: ['Communication', <MessageSquare key="i" />],
    social: ['Social Skills', <Users key="i" />],
    play: ['Games', <Puzzle key="i" />],
    calm: ['Calm Zone', <Leaf key="i" />]
  };
  const learnSectionTitles = {
    daily: ['Daily Skills', <HeartHandshake key="i" />],
    social: ['Social', <Users key="i" />],
    'numbers-letters': ['Numbers & Letters', <BookOpen key="i" />]
  };
  const activityCategory = category === 'learn'
    ? (learnSection === 'numbers-letters' ? 'learn' : learnSection || 'learn')
    : category;
  const pageTitle = category === 'learn' && learnSection ? learnSectionTitles[learnSection] : titles[category];
  const canReviewLearnedSkills = activityCategory === 'daily' && asArray(profile?.dailySkills).length > 0;
  const list = filterActivities(activityCategory, profile, showLearnedSkills);
  const completedSet = new Set(progress.completed);

  if (category === 'learn' && !learnSection) {
    return (
      <section>
        <div className="page-title">
          <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
          <span className="round-icon"><BookOpen /></span>
          <div>
            <p className="eyebrow">{t('Learn activities')}</p>
            <h1>{t('Learn')}</h1>
          </div>
        </div>
        <div className="activity-grid learn-section-grid">
          {learnSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="activity-card learn-section-card"
              onClick={() => onLearnSection(section.id)}
            >
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={section.icon} imageKey={section.icon} />
              </div>
              <div>
                <div className="activity-heading">
                  <h2>{t(section.title)}</h2>
                  <ChevronRight size={22} />
                </div>
                <p>{t(section.detail)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={category === 'calm' ? 'calm-zone-page' : undefined}>
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon">{pageTitle[1]}</span>
        <div>
          <p className="eyebrow">{t(category === 'learn' ? 'Learn activities' : `${categoryLabels[category]} activities`)}</p>
          <h1>{t(pageTitle[0])}</h1>
        </div>
      </div>
      {category === 'calm' && <CalmTools />}
      {canReviewLearnedSkills && (
        <div className="activity-toolbar">
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={showLearnedSkills}
              onChange={(event) => setShowLearnedSkills(event.target.checked)}
            />
            <span>{t('Show learned skills for practice')}</span>
          </label>
        </div>
      )}
      <div className="activity-grid">
        {list.map((activity) => {
          const completed = completedSet.has(activity.title);
          return (
            <article className={completed ? 'activity-card completed' : 'activity-card'} key={activity.title}>
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={activity.icon} imageKey={activity.title === 'Calm Sounds' ? activity.icon : activity.title} />
              </div>
              <div>
                <div className="activity-heading">
                  <h2>{t(activity.title)}</h2>
                  {completed && <span className="done-badge"><Check size={15} /> {t('Complete')}</span>}
                </div>
                <p>{t(activity.detail) || activity.tags?.join(' / ')}</p>
                {(activity.title === 'Sound + Picture' || activity.title === 'Calm Sounds') && soundOff && <span className="pill">{t('Quiet mode')}</span>}
              </div>
              <button className="primary-button" onClick={activity.title === 'Tie Shoes' ? () => onLesson(activity) : () => onStart(activity)}>
                {t(completed ? 'Practice again' : 'Start')}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ActivityPlayer({ activity, profile, soundOff, onBack, onComplete }) {
  if (activity.title === 'Calm Sounds') {
    return <CalmSoundActivity activity={activity} soundOff={soundOff} onBack={onBack} />;
  }
  if (activity.category === 'speech' && speechBoards[activity.title]) {
    return <SpeechBoard activity={activity} board={speechBoards[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  if (activity.title === 'Memory Cards') {
    return <MemoryGame activity={activity} profile={profile} onBack={onBack} onComplete={onComplete} />;
  }
  if (guidedActivities[activity.title]) {
    return <GuidedActivity activity={activity} config={guidedActivities[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  return <MatchGame activity={activity} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
}

function MediaToggle({ value, onChange }) {
  const t = useT();
  return (
    <div className="mode-toggle media-toggle" aria-label="Media type">
      <button
        type="button"
        className={value === 'images' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'images'}
        onClick={() => onChange('images')}
      >
        <ImageIcon size={16} /> {t('Images')}
      </button>
      <button
        type="button"
        className={value === 'videos' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'videos'}
        onClick={() => onChange('videos')}
      >
        <Video size={16} /> {t('Videos')}
      </button>
      <button
        type="button"
        className={value === 'audio' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'audio'}
        onClick={() => onChange('audio')}
      >
        <Volume2 size={16} /> {t('Audio')}
      </button>
    </div>
  );
}

function ShapeIcon({ shape, size = 'small' }) {
  return <span className={`shape-icon shape-${shape.toLowerCase()} shape-${size}`} aria-hidden="true" />;
}

function GameTargetVisual({ activityTitle, target }) {
  if (activityTitle === 'Color Match') {
    return <span className="sr-only">{target.label}</span>;
  }
  if (activityTitle === 'Letter Match') {
    return <span className="game-letter game-letter-large">{target.label}</span>;
  }
  if (activityTitle === 'Shape Sort') {
    return <ShapeIcon shape={target.label} size="large" />;
  }
  if (activityTitle === 'Number Garden') {
    return (
      <div className="flower-count" aria-hidden="true">
        <VisualAsset label="Flower" className="count-image" />
        <VisualAsset label="Flower" className="count-image" />
        <VisualAsset label="Flower" className="count-image" />
      </div>
    );
  }
  return <VisualAsset label={target.label} className="target-image" />;
}

function GameChoiceVisual({ activityTitle, choice }) {
  if (activityTitle === 'Color Match') {
    return <span className="color-swatch" style={{ '--swatch-color': choice.value }} aria-hidden="true" />;
  }
  if (activityTitle === 'Letter Match') {
    return <span className="game-letter game-letter-small" aria-hidden="true">{choice.label}</span>;
  }
  if (activityTitle === 'Shape Sort') {
    return <ShapeIcon shape={choice.label} />;
  }
  return <VisualAsset label={choice.label} className="choice-image" fallback={false} />;
}

const quickCommunicationCards = [
  { label: 'Help', image: 'Help', sentence: 'I need help.' },
  { label: 'Yes', image: 'Yes', sentence: 'Yes.' },
  { label: 'No', image: 'No', sentence: 'No.' },
  { label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
  { label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' },
  { label: 'Bathroom', image: 'Bathroom', sentence: 'I need the bathroom.' },
  { label: 'All Done', image: 'All done', sentence: 'All done.' }
];

const communicationCategories = [
  {
    id: 'want',
    label: 'I Want',
    cards: [
      { label: 'Eat', image: 'Eat', sentence: 'I want to eat.' },
      { label: 'Drink', image: 'Drink', sentence: 'I want a drink.' },
      { label: 'Water', image: 'Water', sentence: 'I want water.' },
      { label: 'Play', image: 'Play', sentence: 'I want to play.' },
      { label: 'Toy', image: 'Toy', sentence: 'I want a toy.' },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I want music.' },
      { label: 'Outside', image: 'Sun', sentence: 'I want to go outside.' },
      { label: 'More', image: 'More please', sentence: 'I want more.' }
    ]
  },
  {
    id: 'need',
    label: 'I Need',
    cards: [
      { label: 'Help', image: 'Help', sentence: 'I need help.' },
      { label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' },
      { label: 'Bathroom', image: 'Bathroom', sentence: 'I need the bathroom.' },
      { label: 'Water', image: 'Water', sentence: 'I need water.' },
      { label: 'Food', image: 'Eat', sentence: 'I need food.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I need quiet.' },
      { label: 'Rest', image: 'Sleep', sentence: 'I need rest.' },
      { label: 'Caregiver', image: 'Thank you', sentence: 'I need my caregiver.' }
    ]
  },
  {
    id: 'feel',
    label: 'I Feel',
    cards: [
      { group: 'Feelings', label: 'Happy', image: 'Happy', sentence: 'I feel happy.' },
      { group: 'Feelings', label: 'Sad', image: 'Sad', sentence: 'I feel sad.' },
      { group: 'Feelings', label: 'Mad', image: 'Mad', sentence: 'I feel mad.' },
      { group: 'Feelings', label: 'Scared', image: 'Worried', sentence: 'I feel scared.' },
      { group: 'Feelings', label: 'Tired', image: 'Tired', sentence: 'I feel tired.' },
      { group: 'Feelings', label: 'Excited', image: 'Excited', sentence: 'I feel excited.' },
      { group: 'Feelings', label: 'Calm', image: 'Calm Break', sentence: 'I feel calm.' },
      { group: 'Feelings', label: 'Frustrated', image: 'Mad', sentence: 'I feel frustrated.' },
      { group: 'Feelings', label: 'Overwhelmed', image: 'Worried', sentence: 'I feel overwhelmed.' },
      { group: 'Feelings', label: 'Sick', image: 'Tired', sentence: 'I feel sick.' },
      { group: 'Affection', label: 'I love you', image: 'Heart', sentence: 'I love you.' },
      { group: 'Affection', label: 'Love mommy', image: 'Heart', sentence: 'I love mommy.' },
      { group: 'Affection', label: 'Love daddy', image: 'Heart', sentence: 'I love daddy.' },
      { group: 'Affection', label: 'I miss you', image: 'Sad', sentence: 'I miss you.' },
      { group: 'Affection', label: 'Hug you', image: 'Thank you', sentence: 'I want to hug you.' },
      { group: 'Affection', label: 'Hold hands', image: 'Take Turns', sentence: 'I want to hold your hand.' },
      { group: 'Affection', label: 'Stay with me', image: 'Thank you', sentence: 'Stay with me.' }
    ]
  },
  {
    id: 'like',
    label: "Like / Don't Like",
    cards: [
      { label: 'I Like', image: 'Thank you', sentence: 'I like this.' },
      { label: "I Don't Like", image: 'Stop', sentence: "I don't like this." },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I like music.' },
      { label: 'Loud Sounds', image: 'Worried', sentence: "I don't like loud sounds." },
      { label: 'This', image: 'Choice Board', sentence: "I don't like this." },
      { label: 'Outside', image: 'Sun', sentence: 'I like outside.' },
      { label: 'Play', image: 'Play', sentence: 'I like playing.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I like quiet.' }
    ]
  },
  {
    id: 'yes-no',
    label: 'Yes / No',
    large: true,
    cards: [
      { label: 'Yes', image: 'Yes', sentence: 'Yes.' },
      { label: 'No', image: 'No', sentence: 'No.' },
      { label: 'Maybe', image: 'Okay', sentence: 'Maybe. I am not sure.' }
    ]
  },
  {
    id: 'help',
    label: 'Help Me',
    cards: [
      { label: 'Help me', image: 'Help', sentence: 'Help me.' },
      { label: 'Open it', image: 'Toy', sentence: 'Open it please.' },
      { label: 'Show me', image: 'Eye', sentence: 'Show me please.' },
      { label: 'Come with me', image: 'Thank you', sentence: 'Come with me.' },
      { label: "I can't do it", image: 'Worried', sentence: "I can't do it." },
      { label: 'Please help', image: 'Help', sentence: 'Please help me.' }
    ]
  },
  {
    id: 'more',
    label: 'More / All Done',
    cards: [
      { label: 'More', image: 'More please', sentence: 'More please.' },
      { label: 'Again', image: 'Again', sentence: 'Again please.' },
      { label: 'All done', image: 'All done', sentence: 'All done.' },
      { label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
      { label: 'Wait', image: 'Timer', sentence: 'Wait please.' }
    ]
  },
  {
    id: 'play',
    label: 'Games',
    cards: [
      { label: "Let's play", image: 'Play', sentence: "Let's play." },
      { label: 'Play with me', image: 'Play', sentence: 'Play with me.' },
      { label: 'My turn', image: 'Take Turns', sentence: 'My turn.' },
      { label: 'Your turn', image: 'Take Turns', sentence: 'Your turn.' },
      { label: 'Together', image: 'Share Toys', sentence: "Let's do it together." },
      { label: 'Again', image: 'Again', sentence: 'Again please.' },
      { label: 'Share', image: 'Share Toys', sentence: 'Share please.' }
    ]
  },
  {
    id: 'love-space',
    label: 'Love & Space',
    cards: [
      { group: 'Affection', label: 'Hug me', image: 'Thank you', sentence: 'I want a hug.' },
      { group: 'Affection', label: 'Hug you', image: 'Thank you', sentence: 'I want to hug you.' },
      { group: 'Affection', label: 'Kiss', image: 'Heart', sentence: 'I want a kiss.' },
      { group: 'Affection', label: 'I love you', image: 'Heart', sentence: 'I love you.' },
      { group: 'Affection', label: 'Hold my hand', image: 'Take Turns', sentence: 'Please hold my hand.' },
      { group: 'Affection', label: 'Hold your hand', image: 'Take Turns', sentence: 'I want to hold your hand.' },
      { group: 'Affection', label: 'Sit with me', image: 'Thank you', sentence: 'Sit with me.' },
      { group: 'Affection', label: 'Stay with me', image: 'Thank you', sentence: 'Stay with me.' },
      { group: 'Affection', label: 'I want mommy', image: 'Heart', sentence: 'I want mommy.' },
      { group: 'Affection', label: 'I want daddy', image: 'Heart', sentence: 'I want daddy.' },
      { group: 'Affection', label: 'I miss you', image: 'Sad', sentence: 'I miss you.' },
      { group: 'Affection', label: 'Cuddle', image: 'Heart', sentence: 'I want to cuddle.' },
      { group: 'Affection', label: 'High five', image: 'Take Turns', sentence: 'High five.' },
      { group: 'Personal Space', label: 'I need space', image: 'Calm Break', sentence: 'I need space.' },
      { group: 'Personal Space', label: 'No hug', image: 'Stop', sentence: 'No hug right now.' },
      { group: 'Personal Space', label: 'Not now', image: 'Timer', sentence: 'Not now.' },
      { group: 'Personal Space', label: "Don't touch me", image: 'Stop', sentence: "Don't touch me." },
      { group: 'Personal Space', label: 'Too close', image: 'Worried', sentence: 'Too close.' },
      { group: 'Personal Space', label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
      { group: 'Personal Space', label: 'Wait', image: 'Timer', sentence: 'Wait please.' },
      { group: 'Personal Space', label: 'Gentle hands', image: 'Heart', sentence: 'Gentle hands please.' },
      { group: 'Personal Space', label: 'Alone', image: 'Calm Break', sentence: 'I want to be alone.' },
      { group: 'Personal Space', label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' }
    ]
  },
  {
    id: 'break',
    label: 'I Need a Break',
    cards: [
      { label: 'I need a break', image: 'Break', sentence: 'I need a break.', followUp: 'break', prominent: true },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I need a break. I want quiet.' },
      { label: 'Headphones', image: 'Calm Break', sentence: 'I need a break. I want headphones.' },
      { label: 'Sit down', image: 'Bed', sentence: 'I need a break. I want to sit down.' },
      { label: 'Dim lights', image: 'Moon', sentence: 'I need a break. I want dim lights.' },
      { label: 'Alone time', image: 'Calm Break', sentence: 'I need a break. I want alone time.' },
      { label: 'Breathe', image: 'Yoga Calm', sentence: 'I need a break. I want to breathe.' },
      { label: 'Favorite item', image: 'Toy', sentence: 'I need a break. I want my favorite item.' }
    ]
  },
  {
    id: 'hurt',
    label: 'Something Hurts',
    cards: [
      { label: 'Something hurts', image: 'Worried', sentence: 'Something hurts.', followUp: 'hurt', prominent: true }
    ]
  },
  {
    id: 'choice',
    label: 'My Choice',
    cards: [
      { label: 'I choose this', image: 'Choice Board', sentence: 'I choose this.' },
      { label: 'Blue one', image: 'Water', sentence: 'I choose the blue one.' },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I choose music.' },
      { label: 'Outside', image: 'Sun', sentence: 'I choose outside.' },
      { label: 'Toy', image: 'Toy', sentence: 'I choose the toy.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I choose quiet.' }
    ]
  }
];

const breakSupportCards = [
  { label: 'Quiet', image: 'Calm Break', sentence: 'I need a break. I want quiet.' },
  { label: 'Headphones', image: 'Calm Break', sentence: 'I need a break. I want headphones.' },
  { label: 'Sit down', image: 'Bed', sentence: 'I need a break. I want to sit down.' },
  { label: 'Dim lights', image: 'Moon', sentence: 'I need a break. I want dim lights.' },
  { label: 'Alone time', image: 'Calm Break', sentence: 'I need a break. I want alone time.' },
  { label: 'Breathe', image: 'Yoga Calm', sentence: 'I need a break. I want to breathe.' },
  { label: 'Favorite item', image: 'Toy', sentence: 'I need a break. I want my favorite item.' }
];

const hurtBodyCards = ['Head', 'Eyes', 'Ears', 'Mouth', 'Throat', 'Stomach', 'Arm', 'Hand', 'Leg', 'Foot', "I don't know"].map((part) => ({
  label: part,
  image: part === 'Eyes' ? 'Eye' : part === "I don't know" ? 'Worried' : 'Worried',
  sentence: part === "I don't know" ? "Something hurts. I don't know where." : `My ${part.toLowerCase()} hurts.`,
  followUp: 'hurt-intensity'
}));

const hurtIntensityCards = [
  { label: 'A little', image: 'Okay', sentence: 'It hurts a little.' },
  { label: 'A lot', image: 'Worried', sentence: 'It hurts a lot.' }
];

function SpeechBoard({ activity, board, soundOff, onBack, onComplete }) {
  if (board.type === 'communication-board') {
    return <CommunicationBoard activity={activity} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  return <SimpleSpeechBoard activity={activity} board={board} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
}

function SimpleSpeechBoard({ activity, board, soundOff, onBack, onComplete }) {
  const [phrase, setPhrase] = useState([]);
  const [lastSpoken, setLastSpoken] = useState('');
  const cards = board.groups.flatMap((group) => group.cards);

  function speakText(text) {
    setLastSpoken(text);
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  }

  function addWord(card) {
    const spokenText = card.speak || card.label;
    setPhrase((current) => [...current.slice(-3), card.label]);
    speakText(spokenText);
  }

  function addStarter(starter) {
    setPhrase([starter]);
    speakText(starter);
  }

  function speakPhrase() {
    if (!phrase.length) return;
    speakText(phrase.join(' '));
  }

  return (
    <section className="speech-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><MessageSquare /></span>
        <div>
          <p className="eyebrow">Communication</p>
          <h1>{activity.title}</h1>
        </div>
      </div>

      <div className="speech-builder" aria-live="polite">
        <div className="speech-phrase">
          {phrase.length ? phrase.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          )) : (
            <span>Tap a picture</span>
          )}
        </div>
        <div className="speech-actions">
          <button className="primary-button" type="button" disabled={!phrase.length} onClick={speakPhrase}>
            <Volume2 size={18} /> Speak
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase((current) => current.slice(0, -1))}>
            <Delete size={18} /> Backspace
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase([])}>
            <Trash2 size={18} /> Clear
          </button>
        </div>
      </div>

      {!!board.phraseStarters.length && (
        <div className="speech-starters" aria-label="Phrase starters">
          {board.phraseStarters.map((starter) => (
            <button key={starter} type="button" onClick={() => addStarter(starter)}>
              <VisualAsset label={starter} className="speech-mini-image" fallback={false} />
              {starter}
            </button>
          ))}
        </div>
      )}

      <div className="speech-groups">
        {board.groups.map((group) => (
          <section className="speech-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="speech-card-grid">
              {group.cards.map((card) => (
                <button
                  key={card.label}
                  type="button"
                  className={lastSpoken === (card.speak || card.label) ? 'speech-card selected' : 'speech-card'}
                  onClick={() => addWord(card)}
                >
                  <VisualAsset label={card.label} imageKey={card.image} className="speech-card-image" />
                  <strong>{card.label}</strong>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="speech-footer">
        <span>{soundOff ? 'Voice muted' : (lastSpoken ? `Heard: ${lastSpoken}` : `${cards.length} picture words`)}</span>
        <button className="primary-button" type="button" disabled={!lastSpoken} onClick={onComplete}>
          <Star size={18} /> Finish
        </button>
      </div>
    </section>
  );
}

function CommunicationBoard({ activity, soundOff, onBack, onComplete }) {
  const [activeTab, setActiveTab] = useState(communicationCategories[0].id);
  const [sentenceParts, setSentenceParts] = useState([]);
  const [lastSpoken, setLastSpoken] = useState('');
  const [followUp, setFollowUp] = useState(null);
  const sentence = sentenceParts.join(' ');
  const activeCategory = communicationCategories.find((category) => category.id === activeTab) || communicationCategories[0];

  function speakText(text) {
    setLastSpoken(text);
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  }

  function chooseCard(card) {
    const text = card.sentence || card.label;
    setSentenceParts((current) => [...current, text].slice(-2));
    setFollowUp(card.followUp || null);
    speakText(text);
  }

  function repeatSentence() {
    if (sentence) speakText(sentence);
  }

  const followUpTitle = followUp === 'break'
    ? 'What would help?'
    : followUp === 'hurt'
      ? 'Where does it hurt?'
      : followUp === 'hurt-intensity'
        ? 'How much does it hurt?'
        : '';
  const followUpCards = followUp === 'break' ? breakSupportCards : followUp === 'hurt' ? hurtBodyCards : followUp === 'hurt-intensity' ? hurtIntensityCards : [];
  const visibleCards = followUpCards.length ? followUpCards : activeCategory.cards;
  const groupedCards = visibleCards.reduce((groups, card) => {
    const groupName = card.group || '';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(card);
    return groups;
  }, {});
  const cardGroups = Object.entries(groupedCards);

  return (
    <section className="speech-page communication-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><MessageSquare /></span>
        <div>
          <p className="eyebrow">Communication</p>
          <h1>{activity.title}</h1>
        </div>
      </div>

      <div className="speech-builder communication-builder" aria-live="polite">
        <div className="speech-phrase communication-phrase" aria-label="Sentence builder">
          {sentenceParts.length ? sentenceParts.map((part, index) => (
            <span key={`${part}-${index}`}>{part}</span>
          )) : (
            <span>Tap a picture</span>
          )}
        </div>
        <div className="speech-actions">
          <button className="primary-button" type="button" disabled={!sentence} onClick={repeatSentence}>
            <Volume2 size={18} /> Speak
          </button>
          <button className="secondary-button" type="button" disabled={!sentenceParts.length} onClick={() => setSentenceParts((current) => current.slice(0, -1))}>
            <Delete size={18} /> Backspace
          </button>
          <button className="secondary-button" type="button" disabled={!sentenceParts.length} onClick={() => { setSentenceParts([]); setFollowUp(null); }}>
            <Trash2 size={18} /> Clear
          </button>
          <button className="secondary-button" type="button" disabled={!lastSpoken} onClick={() => speakText(lastSpoken)}>
            <RotateCcw size={18} /> Repeat
          </button>
        </div>
      </div>

      <div className="quick-communication-bar" aria-label="Quick communication">
        {quickCommunicationCards.map((card) => (
          <button key={card.label} type="button" onClick={() => chooseCard(card)}>
            <VisualAsset label={card.label} imageKey={card.image} className="quick-card-image" fallback={false} />
            <span>{card.label}</span>
          </button>
        ))}
      </div>

      <div className="communication-tabs" aria-label="Communication categories">
        {communicationCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={activeTab === category.id ? 'active' : ''}
            onClick={() => { setActiveTab(category.id); setFollowUp(null); }}
          >
            {category.label}
          </button>
        ))}
      </div>

      <section className="speech-group communication-group">
        <h2>{followUpTitle || activeCategory.label}</h2>
        {activeCategory.id === 'choice' && (
          <p className="caregiver-note">Caregivers can swap these choices for the real options available right now.</p>
        )}
        {activeCategory.id === 'hurt' && (
          <p className="caregiver-note">Caregiver note: this app does not provide medical assessment or diagnosis.</p>
        )}
        {cardGroups.map(([groupName, cards]) => (
          <div className="communication-card-section" key={groupName || activeCategory.id}>
            {groupName && <h3>{groupName}</h3>}
            <div className={activeCategory.large ? 'speech-card-grid communication-card-grid large-cards' : 'speech-card-grid communication-card-grid'}>
              {cards.map((card) => (
                <button
                  key={card.label}
                  type="button"
                  className={card.prominent ? 'speech-card communication-card prominent' : 'speech-card communication-card'}
                  onClick={() => chooseCard(card)}
                >
                  <VisualAsset label={card.label} imageKey={card.image} className="speech-card-image communication-card-image" fallback={false} />
                  <strong>{card.label}</strong>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="speech-footer">
        <span>{soundOff ? 'Voice muted' : (lastSpoken ? `Heard: ${lastSpoken}` : 'Ready to communicate')}</span>
        <button className="primary-button" type="button" disabled={!lastSpoken} onClick={onComplete}>
          <Star size={18} /> Finish
        </button>
      </div>
    </section>
  );
}

function GuidedActivity({ activity, config, soundOff, onBack, onComplete }) {
  const [mediaMode, setMediaMode] = useState('images');
  const [selected, setSelected] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [countIndex, setCountIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!timerStarted || secondsLeft === 0) return undefined;
    const timerId = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [timerStarted, secondsLeft]);

  const choicesDone = config.type === 'choices' && selected === config.correct;
  const stepsDone = ['steps', 'script', 'turns'].includes(config.type) && stepIndex >= (config.steps || config.lines || config.turns).length;
  const breathDone = config.type === 'breath' && breaths >= 3;
  const countDone = config.type === 'count' && countIndex >= (config.items || []).length;
  const timerDone = config.type === 'timer' && secondsLeft === 0;
  const done = choicesDone || stepsDone || breathDone || countDone || timerDone;
  const sequence = config.steps || config.lines || config.turns || [];
  const shouldShowListen = (activity.category === 'daily' && mediaMode === 'audio') || activity.category === 'calm';
  const shouldSpeakActions = config.speak || mediaMode === 'audio' || activity.category === 'calm';

  function getSequenceLabel(item) {
    return typeof item === 'string' ? item : item.label;
  }

  useEffect(() => {
    if (!done || completed) return;
    setCompleted(true);
    if (activity.category === 'calm' && config.type === 'breath') return;
    const timerId = window.setTimeout(onComplete, 700);
    return () => window.clearTimeout(timerId);
  }, [done]);

  function speakText(text) {
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className={activity.category === 'calm' ? 'game-page calm-zone-page calm-activity-page' : 'game-page'}>
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">Activity</p>
          <h1>{activity.title}</h1>
        </div>
        {activity.category === 'daily' && <MediaToggle value={mediaMode} onChange={setMediaMode} />}
      </div>
      <div className="game-panel">
        <div className="game-prompt">
          <p className="eyebrow">Easy practice</p>
          <h2>{config.prompt}</h2>
          {shouldShowListen && (
            <button className="secondary-button audio-prompt-button" type="button" onClick={() => speakText(config.prompt)}>
              <Volume2 size={18} /> Listen
            </button>
          )}
        </div>

        {config.type === 'choices' && (
          <>
            <div className="target-card">
              <VisualAsset label={config.visual} className="target-image" />
            </div>
            <div className="game-choices">
              {config.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={selected === choice ? 'game-choice selected' : 'game-choice'}
                  onClick={() => {
                    setSelected(choice);
                    if (shouldSpeakActions) speakText(choice);
                  }}
                >
                  <VisualAsset label={choice} className="choice-image" fallback={false} />
                  {choice}
                </button>
              ))}
            </div>
          </>
        )}

        {['steps', 'script', 'turns'].includes(config.type) && (
          <div className="sequence-board">
            {sequence.map((item, index) => (
              <button
                key={getSequenceLabel(item)}
                type="button"
                className={item.image ? (index < stepIndex ? 'sequence-step visual done' : 'sequence-step visual') : (index < stepIndex ? 'sequence-step done' : 'sequence-step')}
                disabled={index !== stepIndex}
                onClick={() => {
                  setStepIndex((value) => value + 1);
                  if (shouldSpeakActions) speakText(getSequenceLabel(item));
                }}
              >
                <span>{index + 1}</span>
                {item.image && <VisualAsset label={item.image} className="sequence-step-image" />}
                <strong>{getSequenceLabel(item)}</strong>
              </button>
            ))}
          </div>
        )}

        {config.type === 'breath' && (
          <div className="breath-practice">
            <div className="breathing-orb" aria-hidden="true" />
            <strong>{breaths} of 3 breaths</strong>
            <div className="breath-actions">
              <button className="primary-button" type="button" onClick={() => {
                const instruction = sequence[breaths % sequence.length];
                setBreaths((value) => Math.min(3, value + 1));
                if (shouldSpeakActions && instruction) speakText(getSequenceLabel(instruction));
              }}>
                I breathed
              </button>
              <button className="secondary-button" type="button" onClick={() => { setBreaths(0); setCompleted(false); }}>
                <RotateCcw size={18} /> Repeat
              </button>
            </div>
          </div>
        )}

        {config.type === 'count' && (
          <div className="count-practice">
            <div className="count-row" aria-label="Counting cards">
              {(config.items || []).map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={index < countIndex ? 'count-card done' : 'count-card'}
                  disabled={index !== countIndex}
                  onClick={() => setCountIndex((value) => value + 1)}
                >
                  <VisualAsset label="Bed" className="count-image" />
                  <strong>{item}</strong>
                </button>
              ))}
            </div>
            <strong>{Math.min(countIndex, (config.items || []).length)} of {(config.items || []).length}</strong>
          </div>
        )}

        {config.type === 'timer' && (
          <div className="timer-practice">
            <div className="timer large" aria-live="polite"><Clock /> 0:{String(secondsLeft).padStart(2, '0')}</div>
            <button className="primary-button" type="button" onClick={() => setTimerStarted(true)}>
              Start timer
            </button>
          </div>
        )}

        {(selected || done) && (
          <div className={done ? 'game-feedback success' : 'game-feedback'}>
            <strong>{done ? 'Nice work!' : 'Keep trying.'}</strong>
            <span>{done ? 'Activity complete.' : 'Try the matching answer or next step.'}</span>
          </div>
        )}

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => {
            setSelected(null);
            setStepIndex(0);
            setBreaths(0);
            setCountIndex(0);
            setTimerStarted(false);
            setSecondsLeft(30);
            setCompleted(false);
          }}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function MatchGame({ activity, soundOff, onBack, onComplete }) {
  const game = activityGames[activity.title] || {
    prompt: 'Choose the best match.',
    target: { label: activity.icon, value: activity.title },
    choices: [
      { label: activity.title, value: activity.title },
      { label: 'Try later', value: 'later' },
      { label: 'Wait', value: 'wait' },
      { label: 'Help', value: 'help' }
    ]
  };
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const isCorrect = selected?.value === game.target.value;

  function speakText(text) {
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (!isCorrect || completed) return;
    setCompleted(true);
    speakText('Great match!');
    const timerId = window.setTimeout(onComplete, 700);
    return () => window.clearTimeout(timerId);
  }, [isCorrect]);

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">Activity</p>
          <h1>{activity.title}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-prompt">
          <p className="eyebrow">Your turn</p>
          <h2>{game.prompt}</h2>
        </div>
        <div
          className={activity.title === 'Color Match' ? 'target-card color-target' : 'target-card'}
          aria-label={activity.title === 'Color Match' ? `Color card: ${game.target.label}` : undefined}
          style={activity.title === 'Color Match' ? { '--target-color': game.target.value } : undefined}
        >
          <GameTargetVisual activityTitle={activity.title} target={game.target} />
        </div>
        <div className="game-choices">
          {game.choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              className={selected?.label === choice.label ? 'game-choice selected' : 'game-choice'}
              onClick={() => {
                setSelected(choice);
                speakText(choice.label);
              }}
            >
              <GameChoiceVisual activityTitle={activity.title} choice={choice} />
              {activity.title !== 'Letter Match' && choice.label}
            </button>
          ))}
        </div>
        {selected && (
          <div className={isCorrect ? 'game-feedback success' : 'game-feedback'}>
            <strong>{isCorrect ? 'Great match!' : 'Try one more time.'}</strong>
            <span>{isCorrect ? 'You found the right answer.' : 'Look at the big card and pick the same one.'}</span>
          </div>
        )}
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => { setSelected(null); setCompleted(false); }}>Reset</button>
        </div>
      </div>
    </section>
  );
}

function MemoryGame({ activity, profile, onBack, onComplete }) {
  const startsWithImages = profile?.letters === 'Does not recognize letters';
  const [mode, setMode] = useState(startsWithImages ? 'images' : 'words');
  const [pairCount, setPairCount] = useState(2);
  const [deck, setDeck] = useState(() => shuffleCards(createMemoryDeck(2)));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [completed, setCompleted] = useState(false);
  const complete = matched.length === deck.length;
  const matchedPairs = matched.length / 2;

  function resetGame(nextMode = mode, nextPairCount = pairCount) {
    setMode(nextMode);
    setPairCount(nextPairCount);
    setDeck(shuffleCards(createMemoryDeck(nextPairCount)));
    setFlipped([]);
    setMatched([]);
    setCompleted(false);
  }

  useEffect(() => {
    if (!complete || completed) return;
    setCompleted(true);
    const timerId = window.setTimeout(onComplete, 700);
    return () => window.clearTimeout(timerId);
  }, [complete]);

  function chooseCard(card) {
    if (flipped.includes(card.id) || matched.includes(card.id) || flipped.length === 2) return;
    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      const pair = deck.filter((item) => nextFlipped.includes(item.id));
      if (pair[0].label === pair[1].label) {
        window.setTimeout(() => {
          setMatched((items) => [...items, pair[0].id, pair[1].id]);
          setFlipped([]);
        }, 450);
      } else {
        window.setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">Activity</p>
          <h1>{activity.title}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-prompt">
          <p className="eyebrow">Find pairs</p>
          <h2>Turn over two cards. Match the same {mode === 'images' ? 'pictures' : 'words'}.</h2>
        </div>
        <div className="mode-toggle" aria-label="Memory card mode">
          <button
            type="button"
            className={mode === 'images' ? 'mode-option active' : 'mode-option'}
            aria-pressed={mode === 'images'}
            onClick={() => resetGame('images')}
          >
            Images
          </button>
          <button
            type="button"
            className={mode === 'words' ? 'mode-option active' : 'mode-option'}
            aria-pressed={mode === 'words'}
            onClick={() => resetGame('words')}
          >
            Words
          </button>
        </div>
        <div className="mode-toggle pair-toggle" aria-label="Number of pairs">
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              className={pairCount === count ? 'mode-option active' : 'mode-option'}
              aria-pressed={pairCount === count}
              onClick={() => resetGame(mode, count)}
            >
              {count} pairs
            </button>
          ))}
        </div>
        <div className="memory-grid" style={{ '--memory-columns': pairCount === 2 ? 2 : 4 }}>
          {deck.map((card) => {
            const visible = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                className={visible ? 'memory-card visible' : 'memory-card'}
                onClick={() => chooseCard(card)}
                aria-label={visible ? card.label : 'Hidden card'}
              >
                {visible ? (
                  mode === 'images' ? (
                    <VisualAsset label={card.label} className="memory-image" />
                  ) : (
                    card.label
                  )
                ) : '?'}
              </button>
            );
          })}
        </div>
        <div className={complete ? 'game-feedback success' : 'game-feedback'}>
          <strong>{complete ? 'All pairs found!' : `${matchedPairs} of ${pairCount} pairs`}</strong>
          <span>{complete ? 'Memory activity is complete.' : 'Keep looking for matching cards.'}</span>
        </div>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => resetGame()}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function filterActivities(category, profile, includeLearned = false) {
  if (category === 'daily' && !includeLearned) {
    const learnedActivityTitles = new Set(
      asArray(profile?.dailySkills).flatMap((skill) => learnedSkillActivityMap[skill] || [])
    );
    return activities.daily.filter((activity) => !learnedActivityTitles.has(activity.title));
  }
  if (category !== 'learn') return activities[category];
  return activities.learn.filter((activity) => {
    if (profile?.letters === 'Does not recognize letters' && activity.level === 'word') return false;
    return true;
  });
}

function ShoeLesson({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [mediaMode, setMediaMode] = useState('images');
  const current = lessonSteps[step];

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.03;
    window.speechSynthesis.speak(utterance);
  }

  function speakCurrentStep() {
    speakText(`Step ${step + 1}. ${current.title}. ${current.text}`);
  }

  function speakAllSteps() {
    speakText(`${shoeLessonIntro} ${lessonSteps.map((item, index) => `Step ${index + 1}. ${item.text}`).join(' ')}`);
  }

  return (
    <section className="lesson">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Back to daily skills"><ArrowLeft /></button>
        <span className="round-icon"><HeartHandshake /></span>
        <h1>Tie Shoes</h1>
        <MediaToggle value={mediaMode} onChange={setMediaMode} />
      </div>

      <div className={`lesson-stage lesson-stage-${mediaMode}`}>
        {mediaMode === 'videos' ? (
          <div className="lesson-video-board">
            {lessonSteps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === step ? 'video-step-card active' : 'video-step-card'}
                onClick={() => setStep(index)}
                aria-label={`Show step ${index + 1}: ${item.title}`}
              >
                <VisualAsset label={item.visual} className="video-step-image" />
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="lesson-visual">
            <VisualAsset label={current.visual} className="lesson-image" />
          </div>
        )}

        <div className="lesson-copy">
          <p className="eyebrow">Step {step + 1} of {lessonSteps.length}</p>
          <h2>{current.title}</h2>
          <p>{current.text}</p>

          {mediaMode === 'images' && (
            <p className="lesson-helper">Look at the picture, then try the same movement with real laces.</p>
          )}

          {mediaMode === 'videos' && (
            <p className="lesson-helper">Tap any frame to jump to that part of the sequence.</p>
          )}

          {mediaMode === 'audio' && (
            <div className="lesson-audio-panel">
              <button className="primary-button" type="button" onClick={speakCurrentStep}>
                <Volume2 size={18} /> Hear this step
              </button>
              <button className="secondary-button" type="button" onClick={speakAllSteps}>
                <ListChecks size={18} /> Hear all steps
              </button>
            </div>
          )}

          {mediaMode === 'steps' && (
            <div className="lesson-step-list" aria-label="Tie shoes steps">
              {lessonSteps.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === step ? 'lesson-step-item active' : (index < step ? 'lesson-step-item done' : 'lesson-step-item')}
                  onClick={() => setStep(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="step-dots" aria-label="Lesson progress">
        {lessonSteps.map((item, index) => <span key={item.title} className={index <= step ? 'active' : ''} />)}
      </div>
      <div className="form-actions">
        <button className="secondary-button" onClick={() => setStep(Math.max(0, step - 1))}><ArrowLeft size={18} /> Back</button>
        {step < lessonSteps.length - 1 ? (
          <button className="primary-button" onClick={() => setStep(step + 1)}>Next <ChevronRight size={18} /></button>
        ) : (
          <button className="primary-button" onClick={onComplete}><Star size={18} /> Complete</button>
        )}
      </div>
    </section>
  );
}

const calmSoundOptions = [
  { id: 'rain', label: 'Rain', description: 'Soft steady rain' },
  { id: 'ocean', label: 'Ocean', description: 'Slow wave sound' },
  { id: 'nature', label: 'Nature', description: 'Gentle outdoor tone' },
  { id: 'music', label: 'Soft music', description: 'Simple calm notes' }
];

function CalmTools() {
  const t = useT();
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft === 0) return undefined;
    const timerId = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) setRunning(false);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="calm-tools">
      <div className="calm-panel">
        <div className="breathing-orb" aria-hidden="true" />
        <div>
          <h2>{t('Breathe slowly')}</h2>
          <p>{t('In, out, rest.')}</p>
        </div>
        <div className="timer" aria-live="polite"><Clock /> {minutes}:{seconds}</div>
        <div className="calm-actions">
          <button className="secondary-button" type="button" onClick={() => setRunning((value) => !value)}>
            {t(running ? 'Pause' : 'Start')}
          </button>
          <button className="secondary-button" type="button" onClick={() => {
            setRunning(false);
            setSecondsLeft(120);
          }}>
            {t('Reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

function CalmSoundActivity({ activity, soundOff, onBack }) {
  const t = useT();
  return (
    <section className="calm-sound-activity">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Volume2 /></span>
        <div>
          <p className="eyebrow">{t('Calm activities')}</p>
          <h1>{t(activity.title)}</h1>
        </div>
      </div>
      <p className="caregiver-note">{t(activity.detail)}</p>
      {soundOff && <span className="pill">{t('Quiet mode')}</span>}
      <CalmSoundPanel soundOff={soundOff} />
    </section>
  );
}

function CalmSoundPanel({ soundOff }) {
  const t = useT();
  const [activeSound, setActiveSound] = useState('');
  const [volume, setVolume] = useState(0.34);
  const soundRef = useRef({ context: null, gain: null, sources: [], intervals: [] });

  useEffect(() => {
    if (soundRef.current.gain) {
      soundRef.current.gain.gain.setTargetAtTime(volume, soundRef.current.context.currentTime, 0.04);
    }
  }, [volume]);

  useEffect(() => {
    if (soundOff) {
      stopCalmSound();
      setActiveSound('');
    }
  }, [soundOff]);

  useEffect(() => () => stopCalmSound(), []);

  function createNoiseSource(context) {
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < bufferSize; index += 1) {
      data[index] = Math.random() * 2 - 1;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  function ensureAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!soundRef.current.context || soundRef.current.context.state === 'closed') {
      soundRef.current.context = new AudioContext();
    }
    if (soundRef.current.context.state === 'suspended') {
      soundRef.current.context.resume();
    }
    return soundRef.current.context;
  }

  function trackNode(node) {
    soundRef.current.sources.push(node);
    return node;
  }

  function stopCalmSound() {
    soundRef.current.intervals.forEach((intervalId) => window.clearInterval(intervalId));
    soundRef.current.sources.forEach((source) => {
      try {
        source.stop?.();
      } catch {
        // Some audio nodes may already be stopped.
      }
      source.disconnect?.();
    });
    soundRef.current.gain?.disconnect();
    soundRef.current = { ...soundRef.current, gain: null, sources: [], intervals: [] };
  }

  function playTone(context, output, frequency, duration = 0.22, delay = 0) {
    const oscillator = trackNode(context.createOscillator());
    const toneGain = context.createGain();
    const startAt = context.currentTime + delay;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    toneGain.gain.setValueAtTime(0.0001, startAt);
    toneGain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.04);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(toneGain).connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  }

  function startCalmSound(soundId) {
    stopCalmSound();
    if (soundOff) return;
    const context = ensureAudioContext();
    if (!context) return;

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(volume, context.currentTime);
    masterGain.connect(context.destination);
    soundRef.current.gain = masterGain;

    if (soundId === 'rain') {
      const rain = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1650;
      filter.Q.value = 0.55;
      rain.connect(filter).connect(masterGain);
      rain.start();
    }

    if (soundId === 'ocean') {
      const ocean = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      const waveGain = context.createGain();
      const lfo = trackNode(context.createOscillator());
      const lfoGain = context.createGain();
      filter.type = 'lowpass';
      filter.frequency.value = 520;
      waveGain.gain.value = 0.42;
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 0.24;
      lfo.connect(lfoGain).connect(waveGain.gain);
      ocean.connect(filter).connect(waveGain).connect(masterGain);
      ocean.start();
      lfo.start();
    }

    if (soundId === 'nature') {
      const base = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 760;
      base.connect(filter).connect(masterGain);
      base.start();
      [523.25, 659.25, 783.99].forEach((frequency, index) => playTone(context, masterGain, frequency, 0.18, index * 0.18));
      const intervalId = window.setInterval(() => {
        const notes = [493.88, 587.33, 698.46, 880];
        playTone(context, masterGain, notes[Math.floor(Math.random() * notes.length)], 0.16);
      }, 2400);
      soundRef.current.intervals.push(intervalId);
    }

    if (soundId === 'music') {
      const notes = [261.63, 329.63, 392, 523.25];
      notes.forEach((frequency, index) => {
        const oscillator = trackNode(context.createOscillator());
        const toneGain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        toneGain.gain.value = index === 0 ? 0.09 : 0.035;
        oscillator.connect(toneGain).connect(masterGain);
        oscillator.start();
      });
    }

    setActiveSound(soundId);
  }

  function stopSoundButton() {
    stopCalmSound();
    setActiveSound('');
  }

  return (
    <div className="calm-sound-panel">
      <div className="calm-sound-heading">
        <div>
          <p>{soundOff ? t('Sound is muted.') : (activeSound ? `${t(calmSoundOptions.find((option) => option.id === activeSound)?.label)} ${t('is playing.')}` : t('Choose a gentle background sound'))}</p>
        </div>
        <button className="secondary-button" type="button" onClick={stopSoundButton} disabled={!activeSound}>
          {t('Stop')}
        </button>
      </div>
      <div className="calm-sound-grid" aria-label="Relaxing sounds">
        {calmSoundOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={activeSound === option.id ? 'calm-sound-option active' : 'calm-sound-option'}
            disabled={soundOff}
            onClick={() => startCalmSound(option.id)}
          >
            <strong>{t(option.label)}</strong>
            <span>{t(option.description)}</span>
          </button>
        ))}
      </div>
      <label className="calm-volume-control">
        {t('Volume')}
        <input
          type="range"
          min="0"
          max="0.7"
          step="0.01"
          value={volume}
          disabled={soundOff}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
    </div>
  );
}

function ParentGate({ onUnlock, onBack }) {
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

function ParentDashboard({ profile, profiles, progress, personalization, onProfileChange, onSwitchProfile, onAddChild, onEdit, onReset }) {
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
          <InfoRow label="Communication skills" value={formatChoiceList(profile?.communication)} />
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
          <ul className="resource-list">{resources.map((item) => <li key={item}>{item}</li>)}</ul>
        </DashboardPanel>
        <DashboardPanel title="Emergency / Meltdown Support" icon={<Shield />}>
          <p>{language === 'es' ? 'Mantenga al nino seguro, use menos palabras, baje luces y sonido cuando sea posible, ofrezca un descanso y espere antes de ensenar o corregir.' : 'Keep the child safe, use fewer words, lower lights and sound where possible, offer a break, and wait before teaching or correcting.'}</p>
        </DashboardPanel>
      </div>
      <aside className="disclaimer">
        {language === 'es' ? 'Esta app es educativa y de apoyo para ninos que ya tienen un diagnostico y se usa bajo responsabilidad del padre, madre o cuidador. No diagnostica autismo, no ofrece consejo medico y no reemplaza terapia, atencion clinica ni orientacion profesional.' : 'This app is educational and supportive for children who already have a diagnosis and is used under parent or caregiver responsibility. It does not diagnose autism, provide medical advice, or replace therapy, clinical care, or guidance from qualified professionals.'}
      </aside>
    </section>
  );
}

function DashboardPanel({ title, icon, children }) {
  const t = useT();
  return (
    <article className="dashboard-panel">
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

function NavButton({ icon, label, active, onClick }) {
  const t = useT();
  return (
    <button className={active ? 'nav-button active' : 'nav-button'} onClick={onClick}>
      {icon}
      <span>{t(label)}</span>
    </button>
  );
}

createRoot(document.getElementById('root')).render(<App />);
