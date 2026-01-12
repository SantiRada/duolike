import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeedbackModal } from '@/components/ui/FeedbackModal';
import { HeartCounter } from '@/components/game/HeartCounter';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { exerciseEngine } from '@/lib/exerciseEngine';
import { analytics } from '@/lib/analytics';
import worldData from '@/data/worlds/world-1-taberna.json';
import { World, Exercise } from '@/types';

const world = worldData as World;

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const markLessonComplete = useProgressStore(
    (state) => state.markLessonComplete
  );
  const markExerciseComplete = useProgressStore(
    (state) => state.markExerciseComplete
  );

  const { hearts, addXP, loseHeart, addCoins, incrementLessonsCompleted } =
    useGameStore();

  const lesson = world.lessons.find((l) => l.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (lesson) {
      analytics.track('lesson_start', { lessonId: lesson.id });
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Lección no encontrada</Text>
      </SafeAreaView>
    );
  }

  const currentExercise = lesson.exercises[currentIndex];
  const progress = ((currentIndex + 1) / lesson.exercises.length) * 100;

  const handleStartLesson = () => {
    setShowIntro(false);
  };

  const handleAnswer = (answer: any) => {
    setUserAnswer(answer);
  };

  const handleVerify = () => {
    if (userAnswer === null || userAnswer === undefined) {
      Alert.alert('Esperá', 'Seleccioná una respuesta antes de verificar');
      return;
    }

    const correct = exerciseEngine.validateAnswer(currentExercise, userAnswer);
    const feedbackText = exerciseEngine.getFeedback(currentExercise, correct);

    setIsCorrect(correct);
    setFeedback(feedbackText);
    setShowFeedback(true);

    markExerciseComplete(currentExercise.id, correct);

    const startTime = Date.now();
    analytics.track('exercise_answered', {
      exerciseId: currentExercise.id,
      lessonId: lesson.id,
      correct,
      conceptTag: currentExercise.conceptTag,
      timeSpentMs: Date.now() - startTime,
    });

    if (correct) {
      addXP(currentExercise.xpReward);
    } else {
      if (hearts > 0) {
        loseHeart();
        // Verificar si se acabaron los corazones
        if (hearts - 1 === 0) {
          setTimeout(() => {
            Alert.alert(
              'Sin corazones',
              'Te quedaste sin vidas. Volvé al menú y recuperá corazones.',
              [
                {
                  text: 'Volver al menú',
                  onPress: () => router.back(),
                },
              ]
            );
          }, 1500);
        }
      }
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setUserAnswer(null);

    if (currentIndex < lesson.exercises.length - 1) {
      // Siguiente ejercicio
      setCurrentIndex(currentIndex + 1);
    } else {
      // Lección completada
      handleLessonComplete();
    }
  };

  const handleLessonComplete = () => {
    markLessonComplete(lesson.id);
    addXP(lesson.xpReward);
    addCoins(Config.COINS_PER_LESSON);
    incrementLessonsCompleted();

    analytics.track('lesson_complete', {
      lessonId: lesson.id,
      xpGained: lesson.xpReward,
      heartsRemaining: hearts,
    });

    // Volver al menú automáticamente al completar la lección
    router.back();
  };

  if (showIntro) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.introContainer}>
          <Card>
            <Text style={styles.introTitle}>{lesson.title}</Text>
            <Text style={styles.introDescription}>{lesson.description}</Text>
            <View style={styles.introNarrative}>
              <Text style={styles.introNarrativeText}>
                {lesson.narrativeIntro}
              </Text>
            </View>
            <View style={styles.introStats}>
              <View style={styles.introStatItem}>
                <MaterialIcons name="school" size={20} color={Colors.primary} />
                <Text style={styles.introStat}>
                  {lesson.exercises.length} ejercicios
                </Text>
              </View>
              <View style={styles.introStatItem}>
                <MaterialIcons name="stars" size={20} color={Colors.xpBar} />
                <Text style={styles.introStat}>
                  +{lesson.xpReward} XP
                </Text>
              </View>
            </View>
            <Button
              title="Empezar"
              onPress={handleStartLesson}
              variant="primary"
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <HeartCounter hearts={hearts} maxHearts={Config.MAX_HEARTS} />
      </View>

      {/* Exercise */}
      <ScrollView style={styles.exerciseContainer}>
        <Card style={styles.exerciseCard}>
          <ExerciseRenderer
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        </Card>
      </ScrollView>

      {/* Verify Button */}
      <View style={styles.footer}>
        <Button
          title="Verificar"
          onPress={handleVerify}
          variant="primary"
          disabled={userAnswer === null || showFeedback}
        />
      </View>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={showFeedback}
        isCorrect={isCorrect}
        feedback={feedback}
        onContinue={handleContinue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  introContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  introDescription: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 26,
  },
  introNarrative: {
    backgroundColor: Colors.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  introNarrativeText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  introStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  introStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  introStat: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
  },
  exerciseContainer: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    minHeight: 300,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
