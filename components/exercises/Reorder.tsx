import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReorderExercise } from '@/types';
import { Colors } from '@/constants/Colors';
import { Card } from '../ui/Card';

interface ReorderProps {
  exercise: ReorderExercise;
  onAnswer: (answer: number[]) => void;
  disabled?: boolean;
}

export function Reorder({
  exercise,
  onAnswer,
  disabled = false,
}: ReorderProps) {
  // Estado: array de índices representando el orden actual
  const [currentOrder, setCurrentOrder] = useState<number[]>(
    exercise.items.map((_, i) => i)
  );

  const moveUp = (index: number) => {
    if (index === 0 || disabled) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [
      newOrder[index],
      newOrder[index - 1],
    ];
    setCurrentOrder(newOrder);
    onAnswer(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1 || disabled) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [
      newOrder[index + 1],
      newOrder[index],
    ];
    setCurrentOrder(newOrder);
    onAnswer(newOrder);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>
      <Text style={styles.instruction}>
        Usá las flechas para ordenar de arriba a abajo:
      </Text>

      <View style={styles.items}>
        {currentOrder.map((itemIndex, position) => (
          <Card key={position} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={styles.itemContent}>
                <Text style={styles.itemNumber}>{position + 1}.</Text>
                <Text style={styles.itemText}>
                  {exercise.items[itemIndex]}
                </Text>
              </View>
              <View style={styles.controls}>
                <TouchableOpacity
                  onPress={() => moveUp(position)}
                  disabled={position === 0 || disabled}
                  style={styles.arrow}
                >
                  <Text
                    style={[
                      styles.arrowText,
                      (position === 0 || disabled) && styles.arrowDisabled,
                    ]}
                  >
                    ↑
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => moveDown(position)}
                  disabled={position === currentOrder.length - 1 || disabled}
                  style={styles.arrow}
                >
                  <Text
                    style={[
                      styles.arrowText,
                      (position === currentOrder.length - 1 || disabled) &&
                        styles.arrowDisabled,
                    ]}
                  >
                    ↓
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prompt: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 28,
  },
  instruction: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  items: {
    gap: 12,
  },
  itemCard: {
    padding: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  controls: {
    gap: 8,
  },
  arrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    borderRadius: 8,
  },
  arrowText: {
    fontSize: 24,
    color: Colors.primary,
  },
  arrowDisabled: {
    color: Colors.disabled,
  },
});
