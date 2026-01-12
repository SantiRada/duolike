import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PROGRESS: '@duolike/progress',
  GAME_STATE: '@duolike/gameState',
};

export const persistence = {
  async saveProgress(data: any) {
    try {
      await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  },

  async loadProgress() {
    try {
      const data = await AsyncStorage.getItem(KEYS.PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  },

  async saveGameState(data: any) {
    try {
      await AsyncStorage.setItem(KEYS.GAME_STATE, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  },

  async loadGameState() {
    try {
      const data = await AsyncStorage.getItem(KEYS.GAME_STATE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.multiRemove([KEYS.PROGRESS, KEYS.GAME_STATE]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
