import { Achievement } from '@/types';

export const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'chapter-1-complete',
    title: 'Maestro de la Taberna',
    description: 'Completaste todos los fundamentos de diseño UI en el Capítulo 1',
    icon: 'emoji-events',
    rarity: 'rare',
  },
  {
    id: 'chapter-2-complete',
    title: 'Diseñador Avanzado',
    description: 'Dominaste los principios avanzados del Capítulo 2',
    icon: 'military-tech',
    rarity: 'epic',
  },
  {
    id: 'perfect-lesson',
    title: 'Perfeccionista',
    description: 'Completaste una lección sin errores',
    icon: 'star',
    rarity: 'common',
  },
  {
    id: 'streak-7',
    title: 'Racha de Fuego',
    description: 'Mantuviste una racha de 7 días consecutivos',
    icon: 'local-fire-department',
    rarity: 'rare',
  },
  {
    id: 'first-lesson',
    title: 'Primeros Pasos',
    description: 'Completaste tu primera lección',
    icon: 'school',
    rarity: 'common',
  },
];
