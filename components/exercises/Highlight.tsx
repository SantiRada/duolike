import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HighlightExercise } from '@/types';
import { Colors } from '@/constants/Colors';

interface HighlightProps {
  exercise: HighlightExercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function Highlight({
  exercise,
  onAnswer,
  disabled = false,
}: HighlightProps) {
  const [selectedText, setSelectedText] = useState<string>('');

  // Dividir el contenido en palabras/frases seleccionables
  // Para simplificar, dividimos por frases (separadas por | o por punto)
  const parts = exercise.content.split('|').map((s) => s.trim());

  const handleSelect = (part: string) => {
    if (disabled) return;
    setSelectedText(part);
    onAnswer(part);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>
      <Text style={styles.instruction}>Tocá la parte correcta del texto:</Text>

      <View style={styles.content}>
        {parts.map((part, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(part)}
            disabled={disabled}
          >
            <View
              style={[
                styles.part,
                selectedText === part && styles.partSelected,
              ]}
            >
              <Text
                style={[
                  styles.partText,
                  selectedText === part && styles.partTextSelected,
                ]}
              >
                {part}
              </Text>
            </View>
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
    marginBottom: 12,
    lineHeight: 28,
  },
  instruction: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  content: {
    gap: 12,
  },
  part: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  partSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  partText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  partTextSelected: {
    fontWeight: '600',
    color: Colors.primary,
  },
});
