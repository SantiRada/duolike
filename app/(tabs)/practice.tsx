import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeedbackModal } from '@/components/ui/FeedbackModal';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { exerciseEngine } from '@/lib/exerciseEngine';
import { analytics } from '@/lib/analytics';
import worldData from '@/data/worlds/world-1-taberna.json';
import { World, Exercise } from '@/types';

const world = worldData as World;

export default function PracticeScreen() {
  const exercisesAnswered = useProgressStore((state) => state.exercisesAnswered);
  const { addXP } = useGameStore();

  const [practiceExercises, setPracticeExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isPracticing, setIsPracticing] = useState(false);

  const getRandomExercises = (): Exercise[] => {
    // Obtener todos los ejercicios completados correctamente
    const completedExerciseIds = Object.keys(exercisesAnswered).filter(
      (id) => exercisesAnswered[id].correct
    );

    if (completedExerciseIds.length === 0) return [];

    // Obtener ejercicios del mundo
    const allExercises = world.lessons.flatMap((lesson) => lesson.exercises);

    const completed = allExercises.filter((ex) =>
      completedExerciseIds.includes(ex.id)
    );

    // Seleccionar aleatoriamente hasta N ejercicios
    const count = Math.min(Config.PRACTICE_EXERCISES_COUNT, completed.length);
    const shuffled = [...completed].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleStartPractice = () => {
    const exercises = getRandomExercises();

    if (exercises.length === 0) {
      Alert.alert(
        'No hay ejercicios',
        'Primero completá algunas lecciones para desbloquear el modo práctica'
      );
      return;
    }

    setPracticeExercises(exercises);
    setCurrentIndex(0);
    setIsPracticing(true);
    analytics.track('practice_started', {});
  };

  const handleAnswer = (answer: any) => {
    setUserAnswer(answer);
  };

  const handleVerify = () => {
    if (userAnswer === null || userAnswer === undefined) {
      Alert.alert('Esperá', 'Seleccioná una respuesta antes de verificar');
      return;
    }

    const currentExercise = practiceExercises[currentIndex];
    const correct = exerciseEngine.validateAnswer(currentExercise, userAnswer);
    const feedbackText = exerciseEngine.getFeedback(currentExercise, correct);

    setIsCorrect(correct);
    setFeedback(feedbackText);
    setShowFeedback(true);

    if (correct) {
      addXP(currentExercise.xpReward);
    }

    analytics.track('practice_exercise_answered', {
      exerciseId: currentExercise.id,
      correct,
    });
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setUserAnswer(null);

    if (currentIndex < practiceExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handlePracticeComplete();
    }
  };

  const handlePracticeComplete = () => {
    analytics.track('practice_complete', {
      exercisesCount: practiceExercises.length,
    });

    Alert.alert('¡Práctica completada! 💪', 'Seguí así, estás mejorando.', [
      {
        text: 'Volver',
        onPress: () => {
          setIsPracticing(false);
          setPracticeExercises([]);
          setCurrentIndex(0);
        },
      },
    ]);
  };

  const completedCount = Object.keys(exercisesAnswered).filter(
    (id) => exercisesAnswered[id].correct
  ).length;

  if (!isPracticing) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.welcomeContainer}>
          <Card>
            <Text style={styles.title}>Modo Práctica</Text>
            <Text style={styles.description}>
              Repasá ejercicios que ya completaste para reforzar tu aprendizaje
            </Text>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>ejercicios completados</Text>
              </View>
            </View>

            {completedCount > 0 ? (
              <>
                <Text style={styles.info}>
                  Cada sesión incluye {Config.PRACTICE_EXERCISES_COUNT}{' '}
                  ejercicios aleatorios.
                </Text>
                <Button
                  title="Empezar a Practicar"
                  onPress={handleStartPractice}
                  variant="primary"
                />
              </>
            ) : (
              <Text style={styles.noExercises}>
                Completá algunas lecciones primero para desbloquear el modo
                práctica.
              </Text>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentExercise = practiceExercises[currentIndex];
  const progress = ((currentIndex + 1) / practiceExercises.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress */}
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {practiceExercises.length}
        </Text>
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
  welcomeContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 26,
  },
  stats: {
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  info: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  noExercises: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
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
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
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
