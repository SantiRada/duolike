import React from 'react';
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
import { XPBar } from '@/components/game/XPBar';
import { StreakIndicator } from '@/components/game/StreakIndicator';

export default function ProfileScreen() {
  const lessonsCompleted = useProgressStore((state) => state.lessonsCompleted);
  const exercisesAnswered = useProgressStore(
    (state) => state.exercisesAnswered
  );
  const resetProgress = useProgressStore((state) => state.reset);
  const resetGame = useGameStore((state) => state.reset);

  const { xp, level, streak, hearts, maxHearts, coins, totalLessonsCompleted } =
    useGameStore();

  const totalExercisesAnswered = Object.keys(exercisesAnswered).length;
  const correctExercises = Object.values(exercisesAnswered).filter(
    (ex) => ex.correct
  ).length;
  const accuracy =
    totalExercisesAnswered > 0
      ? Math.round((correctExercises / totalExercisesAnswered) * 100)
      : 0;

  const handleReset = () => {
    Alert.alert(
      'Reiniciar Progreso',
      '¿Estás seguro? Se perderá todo tu progreso.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
            await resetGame();
            Alert.alert('Listo', 'Tu progreso se reinició');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* XP & Level */}
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.greeting}>👋 Hola, Diseñador</Text>
            <StreakIndicator streak={streak} />
          </View>
          <XPBar xp={xp} level={level} />
        </Card>

        {/* Stats */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalLessonsCompleted}</Text>
              <Text style={styles.statLabel}>Lecciones completadas</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalExercisesAnswered}</Text>
              <Text style={styles.statLabel}>Ejercicios realizados</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{accuracy}%</Text>
              <Text style={styles.statLabel}>Precisión</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{coins}</Text>
              <Text style={styles.statLabel}>💰 Monedas</Text>
            </View>
          </View>
        </Card>

        {/* Resources */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Recursos</Text>

          <View style={styles.resourceRow}>
            <Text style={styles.resourceLabel}>❤️ Corazones</Text>
            <Text style={styles.resourceValue}>
              {hearts} / {maxHearts}
            </Text>
          </View>

          <View style={styles.resourceRow}>
            <Text style={styles.resourceLabel}>🔥 Racha actual</Text>
            <Text style={styles.resourceValue}>{streak} días</Text>
          </View>

          <View style={styles.resourceRow}>
            <Text style={styles.resourceLabel}>⭐ XP Total</Text>
            <Text style={styles.resourceValue}>{xp}</Text>
          </View>
        </Card>

        {/* Actions */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <Button
            title="Reiniciar Progreso"
            onPress={handleReset}
            variant="outline"
          />
        </Card>

        {/* MVP Notice */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>DuolikeUX MVP v1.0</Text>
          <Text style={styles.footerSubtext}>
            En desarrollo para enseñar UX/UI mediante gamificación
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resourceLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  resourceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
