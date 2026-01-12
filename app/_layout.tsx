import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { analytics } from '@/lib/analytics';

export default function RootLayout() {
  const hydrateProgress = useProgressStore((state) => state.hydrate);
  const hydrateGame = useGameStore((state) => state.hydrate);

  useEffect(() => {
    // Inicializar stores y analytics
    const init = async () => {
      await Promise.all([
        analytics.init(),
        hydrateProgress(),
        hydrateGame(),
      ]);

      analytics.track('app_open', {});
    };

    init();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A148C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            title: 'Lección',
            presentation: 'card',
          }}
        />
      </Stack>
    </>
  );
}
