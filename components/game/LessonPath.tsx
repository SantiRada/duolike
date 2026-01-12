import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Lesson } from '@/types';
import { useRouter } from 'expo-router';

interface LessonPathProps {
  lessons: Lesson[];
  completedLessons: Record<string, boolean>;
}

export function LessonPath({ lessons, completedLessons }: LessonPathProps) {
  const router = useRouter();

  const getNodeStatus = (lesson: Lesson, index: number) => {
    if (completedLessons[lesson.id]) return 'completed';

    // Verificar si está desbloqueado
    if (lesson.unlockRequirement) {
      const isUnlocked = completedLessons[lesson.unlockRequirement];
      return isUnlocked ? 'available' : 'locked';
    }

    // Primera lección siempre disponible
    if (index === 0) return 'available';

    // Verificar si la anterior está completa
    const prevLesson = lessons[index - 1];
    if (prevLesson && completedLessons[prevLesson.id]) {
      return 'available';
    }

    return 'locked';
  };

  const handleNodePress = (lesson: Lesson, status: string) => {
    if (status === 'locked') return;
    router.push(`/lesson/${lesson.id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {lessons.map((lesson, index) => {
        const status = getNodeStatus(lesson, index);
        const isLast = index === lessons.length - 1;

        return (
          <View key={lesson.id} style={styles.nodeContainer}>
            <TouchableOpacity
              style={[
                styles.node,
                status === 'completed' && styles.nodeCompleted,
                status === 'available' && styles.nodeAvailable,
                status === 'locked' && styles.nodeLocked,
              ]}
              onPress={() => handleNodePress(lesson, status)}
              disabled={status === 'locked'}
            >
              <Text style={styles.nodeNumber}>{index + 1}</Text>
              <Text
                style={[
                  styles.nodeTitle,
                  status === 'locked' && styles.nodeTitleLocked,
                ]}
                numberOfLines={2}
              >
                {lesson.title}
              </Text>
              {status === 'completed' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
              {status === 'locked' && <Text style={styles.lock}>🔒</Text>}
            </TouchableOpacity>

            {!isLast && <View style={styles.connector} />}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nodeContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  node: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    position: 'relative',
  },
  nodeCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  nodeAvailable: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  nodeLocked: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.border,
  },
  nodeNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textLight,
    position: 'absolute',
    top: 10,
  },
  nodeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginTop: 12,
  },
  nodeTitleLocked: {
    color: Colors.textSecondary,
  },
  checkmark: {
    fontSize: 32,
    position: 'absolute',
    bottom: 8,
  },
  lock: {
    fontSize: 24,
    position: 'absolute',
    bottom: 8,
  },
  connector: {
    width: 4,
    height: 40,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});
