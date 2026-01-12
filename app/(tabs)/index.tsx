import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { XPBar } from '@/components/game/XPBar';
import { StreakIndicator } from '@/components/game/StreakIndicator';
import { HeartCounter } from '@/components/game/HeartCounter';
import { LessonPath } from '@/components/game/LessonPath';
import worldData from '@/data/worlds/world-1-taberna.json';
import { World } from '@/types';

const world = worldData as World;

export default function HomeScreen() {
  const router = useRouter();
  const lessonsCompleted = useProgressStore((state) => state.lessonsCompleted);
  const hydrated = useProgressStore((state) => state.hydrated);
  const { xp, level, streak, hearts, maxHearts } = useGameStore();
  const updateStreak = useGameStore((state) => state.updateStreak);

  useEffect(() => {
    if (hydrated) {
      updateStreak();
    }
  }, [hydrated]);

  // Encontrar la primera lección no completada
  const getNextLesson = () => {
    return world.lessons.find((lesson) => !lessonsCompleted[lesson.id]);
  };

  const handleContinue = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.id}`);
    }
  };

  const nextLesson = getNextLesson();

  if (!hydrated) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Stats Header */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <HeartCounter hearts={hearts} maxHearts={maxHearts} />
            <StreakIndicator streak={streak} />
          </View>
          <View style={styles.xpContainer}>
            <XPBar xp={xp} level={level} />
          </View>
        </Card>

        {/* World Info */}
        <View style={styles.worldHeader}>
          <Text style={styles.worldName}>{world.name}</Text>
          <Text style={styles.worldDescription}>{world.description}</Text>
        </View>

        {/* Lesson Path */}
        <LessonPath
          lessons={world.lessons}
          completedLessons={lessonsCompleted}
        />

        {/* Continue Button */}
        {nextLesson && (
          <View style={styles.continueContainer}>
            <Button
              title={`Continuar: ${nextLesson.title}`}
              onPress={handleContinue}
              variant="primary"
            />
          </View>
        )}

        {nextLesson === undefined && (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>
              🎉 ¡Completaste todas las lecciones!
            </Text>
            <Text style={styles.completedSubtext}>
              Seguí practicando en la pestaña "Practicar"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    margin: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  xpContainer: {
    width: '100%',
  },
  worldHeader: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  worldName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  worldDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  continueContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  completedContainer: {
    padding: 32,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
    textAlign: 'center',
    marginBottom: 8,
  },
  completedSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
