import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MultipleChoiceExercise } from '@/types';
import { Colors } from '@/constants/Colors';
import { Card } from '../ui/Card';

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  onAnswer: (answer: number) => void;
  disabled?: boolean;
}

export function MultipleChoice({
  exercise,
  onAnswer,
  disabled = false,
}: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setSelectedIndex(index);
    onAnswer(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>
      <View style={styles.options}>
        {exercise.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            disabled={disabled}
          >
            <Card
              style={[
                styles.option,
                selectedIndex === index && styles.optionSelected,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Card>
          </TouchableOpacity>
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
    marginBottom: 24,
    lineHeight: 28,
  },
  options: {
    gap: 12,
  },
  option: {
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '10',
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
