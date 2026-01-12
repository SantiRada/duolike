import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Lesson } from '@/types';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

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

  // Layout zigzag tipo Duolingo: left, center, right, center...
  const getNodePosition = (index: number) => {
    const pattern = index % 4;
    if (pattern === 0) return 'left';
    if (pattern === 1) return 'center';
    if (pattern === 2) return 'right';
    return 'center';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {lessons.map((lesson, index) => {
        const status = getNodeStatus(lesson, index);
        const isLast = index === lessons.length - 1;
        const position = getNodePosition(index);

        return (
          <View key={lesson.id} style={styles.nodeWrapper}>
            <View style={[styles.nodeContainer, styles[`position_${position}`]]}>
              <TouchableOpacity
                style={[
                  styles.node,
                  status === 'completed' && styles.nodeCompleted,
                  status === 'available' && styles.nodeAvailable,
                  status === 'locked' && styles.nodeLocked,
                ]}
                onPress={() => handleNodePress(lesson, status)}
                disabled={status === 'locked'}
                activeOpacity={0.7}
              >
                <View style={styles.nodeContent}>
                  <Text style={styles.nodeNumber}>{index + 1}</Text>
                  {status === 'completed' && (
                    <MaterialIcons
                      name="check-circle"
                      size={28}
                      color="#FFFFFF"
                      style={styles.icon}
                    />
                  )}
                  {status === 'locked' && (
                    <MaterialIcons
                      name="lock"
                      size={24}
                      color={Colors.disabled}
                      style={styles.icon}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.nodeTitle,
                  status === 'locked' && styles.nodeTitleLocked,
                ]}
                numberOfLines={2}
              >
                {lesson.title}
              </Text>
            </View>

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
    paddingTop: 16,
  },
  nodeWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  nodeContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  position_left: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.15,
  },
  position_center: {
    alignSelf: 'center',
  },
  position_right: {
    alignSelf: 'flex-end',
    marginRight: width * 0.15,
  },
  node: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nodeCompleted: {
    backgroundColor: Colors.nodeCompleted,
    borderColor: Colors.nodeCompleted,
  },
  nodeAvailable: {
    backgroundColor: Colors.nodeAvailable,
    borderColor: Colors.primaryLight,
  },
  nodeLocked: {
    backgroundColor: Colors.nodeLocked,
    borderColor: Colors.nodeLocked,
  },
  nodeContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  icon: {
    marginTop: 4,
  },
  nodeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
    maxWidth: 120,
  },
  nodeTitleLocked: {
    color: Colors.textTertiary,
  },
  connector: {
    width: 6,
    height: 35,
    backgroundColor: Colors.border,
    marginVertical: 2,
    borderRadius: 3,
  },
});
