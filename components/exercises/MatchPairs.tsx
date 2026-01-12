import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MatchPairsExercise } from '@/types';
import { Colors } from '@/constants/Colors';
import { Card } from '../ui/Card';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  onAnswer: (answer: Record<number, number>) => void;
  disabled?: boolean;
}

export function MatchPairs({
  exercise,
  onAnswer,
  disabled = false,
}: MatchPairsProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [pairs, setPairs] = useState<Record<number, number>>({});

  const handleLeftPress = (index: number) => {
    if (disabled) return;
    setSelectedLeft(index);
  };

  const handleRightPress = (index: number) => {
    if (disabled || selectedLeft === null) return;

    const newPairs = { ...pairs };

    // Remover cualquier par existente con este leftIndex o rightIndex
    Object.keys(newPairs).forEach((key) => {
      const k = Number(key);
      if (k === selectedLeft || newPairs[k] === index) {
        delete newPairs[k];
      }
    });

    // Agregar nuevo par
    newPairs[selectedLeft] = index;

    setPairs(newPairs);
    setSelectedLeft(null);
    onAnswer(newPairs);
  };

  const isLeftMatched = (index: number) => pairs[index] !== undefined;
  const isRightMatched = (index: number) =>
    Object.values(pairs).includes(index);

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>
      <Text style={styles.instruction}>
        Tocá un elemento de la izquierda, luego su par de la derecha:
      </Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          {exercise.leftColumn.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLeftPress(index)}
              disabled={disabled}
            >
              <Card
                style={[
                  styles.item,
                  selectedLeft === index && styles.itemSelectedLeft,
                  isLeftMatched(index) && styles.itemMatched,
                ]}
              >
                <Text style={styles.itemText}>{item}</Text>
                {isLeftMatched(index) && (
                  <View style={styles.matchLine}>
                    <Text style={styles.matchLineText}>→</Text>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          {exercise.rightColumn.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRightPress(index)}
              disabled={disabled}
            >
              <Card
                style={[
                  styles.item,
                  isRightMatched(index) && styles.itemMatched,
                ]}
              >
                <Text style={styles.itemText}>{item}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.pairCount}>
        Pares hechos: {Object.keys(pairs).length} /{' '}
        {exercise.leftColumn.length}
      </Text>
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
  columns: {
    flexDirection: 'row',
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  item: {
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
  },
  itemSelectedLeft: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  itemMatched: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '10',
  },
  itemText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  matchLine: {
    position: 'absolute',
    right: -20,
    top: '50%',
    marginTop: -12,
  },
  matchLineText: {
    fontSize: 24,
    color: Colors.success,
  },
  pairCount: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
