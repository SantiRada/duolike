import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FillBlankExercise } from '@/types';
import { Colors } from '@/constants/Colors';

interface FillBlankProps {
  exercise: FillBlankExercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function FillBlank({
  exercise,
  onAnswer,
  disabled = false,
}: FillBlankProps) {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
    onAnswer(text);
  };

  // Renderizar la frase con el input en el lugar del ___
  const parts = exercise.sentence.split('___');

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>

      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>{parts[0]}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder="..."
          editable={!disabled}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.sentenceText}>{parts[1]}</Text>
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
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sentenceText: {
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    minWidth: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    color: Colors.textPrimary,
    marginHorizontal: 4,
  },
});
