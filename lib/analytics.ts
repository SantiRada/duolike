import { AnalyticsEvent } from '@/types';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Analytics {
  private events: AnalyticsEvent[] = [];
  private initialized = false;

  async init() {
    if (this.initialized) return;

    try {
      const stored = await AsyncStorage.getItem(Config.ANALYTICS_STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  }

  async track(eventName: string, data: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      data,
    };

    this.events.push(event);

    // Log to console for debugging
    console.log(`[Analytics] ${eventName}`, data);

    // Persist
    try {
      // Keep only last N events
      if (this.events.length > Config.MAX_ANALYTICS_EVENTS) {
        this.events = this.events.slice(-Config.MAX_ANALYTICS_EVENTS);
      }

      await AsyncStorage.setItem(
        Config.ANALYTICS_STORAGE_KEY,
        JSON.stringify(this.events)
      );
    } catch (error) {
      console.error('Error persisting analytics:', error);
    }

    // Aquí se podría integrar con Firebase, Amplitude, etc.
    // await firebaseAnalytics.logEvent(eventName, data);
  }

  async getEvents(): Promise<AnalyticsEvent[]> {
    return [...this.events];
  }

  async exportEvents(): Promise<string> {
    return JSON.stringify(this.events, null, 2);
  }

  async clearEvents() {
    this.events = [];
    await AsyncStorage.removeItem(Config.ANALYTICS_STORAGE_KEY);
  }
}

export const analytics = new Analytics();
