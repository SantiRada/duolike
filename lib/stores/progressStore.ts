import { create } from 'zustand';
import { UserProgress, ExerciseResult, CurrentLessonProgress } from '@/types';
import { persistence } from '../persistence';
import { analytics } from '../analytics';

interface ProgressStore extends UserProgress {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  markLessonComplete: (lessonId: string) => void;
  markExerciseComplete: (exerciseId: string, correct: boolean) => void;
  setCurrentLessonProgress: (progress: CurrentLessonProgress | null) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isExerciseCompleted: (exerciseId: string) => boolean;
  getCompletedExercises: () => ExerciseResult[];
  reset: () => void;
}

const initialState: UserProgress = {
  lessonsCompleted: {},
  exercisesAnswered: {},
  currentLessonProgress: null,
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...initialState,
  hydrated: false,

  hydrate: async () => {
    const saved = await persistence.loadProgress();
    if (saved) {
      set({ ...saved, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },

  markLessonComplete: (lessonId: string) => {
    set((state) => {
      const newState = {
        ...state,
        lessonsCompleted: {
          ...state.lessonsCompleted,
          [lessonId]: true,
        },
        currentLessonProgress: null,
      };
      persistence.saveProgress(newState);
      return newState;
    });

    analytics.track('lesson_complete', { lessonId });
  },

  markExerciseComplete: (exerciseId: string, correct: boolean) => {
    set((state) => {
      const existing = state.exercisesAnswered[exerciseId];
      const newResult: ExerciseResult = {
        exerciseId,
        correct,
        attempts: existing ? existing.attempts + 1 : 1,
        lastAttemptDate: new Date().toISOString(),
      };

      const newState = {
        ...state,
        exercisesAnswered: {
          ...state.exercisesAnswered,
          [exerciseId]: newResult,
        },
      };

      persistence.saveProgress(newState);
      return newState;
    });

    analytics.track('exercise_answered', { exerciseId, correct });
  },

  setCurrentLessonProgress: (progress: CurrentLessonProgress | null) => {
    set((state) => {
      const newState = { ...state, currentLessonProgress: progress };
      persistence.saveProgress(newState);
      return newState;
    });
  },

  isLessonCompleted: (lessonId: string) => {
    return !!get().lessonsCompleted[lessonId];
  },

  isExerciseCompleted: (exerciseId: string) => {
    return !!get().exercisesAnswered[exerciseId];
  },

  getCompletedExercises: () => {
    const { exercisesAnswered } = get();
    return Object.values(exercisesAnswered).filter((ex) => ex.correct);
  },

  reset: async () => {
    set(initialState);
    await persistence.saveProgress(initialState);
  },
}));
