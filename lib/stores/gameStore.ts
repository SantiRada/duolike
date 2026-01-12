import { create } from 'zustand';
import { GameState } from '@/types';
import { persistence } from '../persistence';
import { analytics } from '../analytics';
import { Config } from '@/constants/Config';

interface GameStore extends GameState {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addXP: (amount: number) => void;
  loseHeart: () => void;
  regenerateHearts: () => void;
  addCoins: (amount: number) => void;
  updateStreak: () => void;
  incrementLessonsCompleted: () => void;
  reset: () => void;
}

const initialState: GameState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  hearts: Config.MAX_HEARTS,
  maxHearts: Config.MAX_HEARTS,
  coins: 0,
  totalLessonsCompleted: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  hydrated: false,

  hydrate: async () => {
    const saved = await persistence.loadGameState();
    if (saved) {
      set({ ...saved, hydrated: true });
      get().regenerateHearts();
    } else {
      set({ hydrated: true });
    }
  },

  addXP: (amount: number) => {
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = Math.floor(newXP / Config.XP_PER_LEVEL) + 1;

      const newState = {
        ...state,
        xp: newXP,
        level: newLevel,
      };

      persistence.saveGameState(newState);
      return newState;
    });
  },

  loseHeart: () => {
    set((state) => {
      const newHearts = Math.max(0, state.hearts - 1);
      const newState = { ...state, hearts: newHearts };
      persistence.saveGameState(newState);
      return newState;
    });
  },

  regenerateHearts: () => {
    set((state) => {
      if (state.hearts >= state.maxHearts) return state;

      const newState = { ...state, hearts: state.maxHearts };
      persistence.saveGameState(newState);
      return newState;
    });
  },

  addCoins: (amount: number) => {
    set((state) => {
      const newState = { ...state, coins: state.coins + amount };
      persistence.saveGameState(newState);
      return newState;
    });
  },

  updateStreak: () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    set((state) => {
      const lastDate = state.lastActiveDate
        ? new Date(state.lastActiveDate).toISOString().split('T')[0]
        : null;

      let newStreak = state.streak;

      if (!lastDate) {
        // Primera vez
        newStreak = 1;
      } else if (lastDate === today) {
        // Mismo día, no cambiar
        return state;
      } else {
        // Calcular diferencia de días
        const lastDateTime = new Date(lastDate).getTime();
        const todayTime = new Date(today).getTime();
        const daysDiff = Math.floor(
          (todayTime - lastDateTime) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff === 1) {
          // Consecutivo
          newStreak = state.streak + 1;
          analytics.track('streak_incremented', { newStreak });
        } else {
          // Se rompió el streak
          newStreak = 1;
          analytics.track('streak_broken', { previousStreak: state.streak });
        }
      }

      const newState = {
        ...state,
        streak: newStreak,
        lastActiveDate: now.toISOString(),
      };

      persistence.saveGameState(newState);
      return newState;
    });
  },

  incrementLessonsCompleted: () => {
    set((state) => {
      const newState = {
        ...state,
        totalLessonsCompleted: state.totalLessonsCompleted + 1,
      };
      persistence.saveGameState(newState);
      return newState;
    });
  },

  reset: async () => {
    set(initialState);
    await persistence.saveGameState(initialState);
  },
}));
