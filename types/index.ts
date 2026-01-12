// ===== EXERCISE TYPES =====

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'reorder'
  | 'match_pairs'
  | 'choose_design'
  | 'highlight';

export type ConceptTag =
  | 'legibilidad'
  | 'jerarquia'
  | 'escaneabilidad'
  | 'consistencia'
  | 'accesibilidad'
  | 'copy'
  | 'evaluacion';

// Base Exercise Interface
export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  conceptTag: ConceptTag;
  difficulty: 1 | 2 | 3;
  xpReward: number;
  feedbackCorrect: string;
  feedbackWrong: string;
}

// Specific Exercise Types
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: string[];
  correctAnswer: number; // index
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  sentence: string; // con ___ para el blank
  correctAnswer: string;
  caseSensitive?: boolean;
}

export interface ReorderExercise extends BaseExercise {
  type: 'reorder';
  items: string[];
  correctOrder: number[]; // indices en orden correcto
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'match_pairs';
  leftColumn: string[];
  rightColumn: string[];
  correctPairs: Record<number, number>; // { leftIndex: rightIndex }
}

export interface ChooseDesignExercise extends BaseExercise {
  type: 'choose_design';
  designs: Design[];
  correctAnswer: number; // index del mejor diseño
}

export interface Design {
  id: string;
  mockup: DesignMockup;
  label?: string; // "Opción A", "Opción B"
}

export interface DesignMockup {
  type: 'simple_poster'; // en MVP solo este tipo
  title: string;
  subtitle?: string;
  bodyText?: string;
  cta?: string;
  backgroundColor: string;
  textColor: string;
  fontSize: {
    title: number;
    subtitle?: number;
    body?: number;
  };
}

export interface HighlightExercise extends BaseExercise {
  type: 'highlight';
  content: string; // texto con partes marcables
  correctHighlight: string; // substring exacta a seleccionar
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | ReorderExercise
  | MatchPairsExercise
  | ChooseDesignExercise
  | HighlightExercise;

// ===== LESSON & WORLD =====

export interface Lesson {
  id: string;
  worldId: string;
  order: number;
  title: string;
  description: string;
  narrativeIntro: string; // texto que se muestra antes de empezar
  exercises: Exercise[];
  xpReward: number; // bonus al completar
  unlockRequirement?: string; // lessonId previo requerido
}

export interface World {
  id: string;
  name: string;
  description: string;
  theme: string; // "medieval", "cyberpunk", etc.
  lessons: Lesson[];
}

// ===== USER PROGRESS =====

export interface UserProgress {
  lessonsCompleted: Record<string, boolean>; // { lessonId: true }
  exercisesAnswered: Record<string, ExerciseResult>;
  currentLessonProgress: CurrentLessonProgress | null;
}

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  attempts: number;
  lastAttemptDate: string; // ISO date
}

export interface CurrentLessonProgress {
  lessonId: string;
  currentExerciseIndex: number;
  startedAt: string; // ISO date
}

// ===== GAME STATE =====

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null; // ISO date
  hearts: number;
  maxHearts: number;
  coins: number;
  totalLessonsCompleted: number;
}

// ===== ANALYTICS =====

export interface AnalyticsEvent {
  eventName: string;
  timestamp: string;
  data: Record<string, any>;
}
