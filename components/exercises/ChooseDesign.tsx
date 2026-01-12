import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChooseDesignExercise, Design } from '@/types';
import { Colors } from '@/constants/Colors';
import { Card } from '../ui/Card';

interface ChooseDesignProps {
  exercise: ChooseDesignExercise;
  onAnswer: (answer: number) => void;
  disabled?: boolean;
}

export function ChooseDesign({
  exercise,
  onAnswer,
  disabled = false,
}: ChooseDesignProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setSelectedIndex(index);
    onAnswer(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{exercise.prompt}</Text>

      <View style={styles.designs}>
        {exercise.designs.map((design, index) => (
          <TouchableOpacity
            key={design.id}
            onPress={() => handleSelect(index)}
            disabled={disabled}
            style={styles.designContainer}
          >
            {design.label && (
              <Text style={styles.label}>{design.label}</Text>
            )}

            <View
              style={[
                styles.designCard,
                selectedIndex === index && styles.designSelected,
              ]}
            >
              <DesignMockup design={design} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function DesignMockup({ design }: { design: Design }) {
  const { mockup } = design;

  return (
    <View
      style={[
        styles.mockup,
        { backgroundColor: mockup.backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.mockupTitle,
          {
            color: mockup.textColor,
            fontSize: mockup.fontSize.title,
          },
        ]}
      >
        {mockup.title}
      </Text>

      {mockup.subtitle && (
        <Text
          style={[
            styles.mockupSubtitle,
            {
              color: mockup.textColor,
              fontSize: mockup.fontSize.subtitle || 16,
            },
          ]}
        >
          {mockup.subtitle}
        </Text>
      )}

      {mockup.bodyText && (
        <Text
          style={[
            styles.mockupBody,
            {
              color: mockup.textColor,
              fontSize: mockup.fontSize.body || 14,
            },
          ]}
        >
          {mockup.bodyText}
        </Text>
      )}

      {mockup.cta && (
        <View
          style={[
            styles.mockupCta,
            { borderColor: mockup.textColor },
          ]}
        >
          <Text
            style={[
              styles.mockupCtaText,
              { color: mockup.textColor },
            ]}
          >
            {mockup.cta}
          </Text>
        </View>
      )}
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
  designs: {
    gap: 20,
  },
  designContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  designCard: {
    width: '100%',
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  designSelected: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mockup: {
    padding: 24,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupTitle: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  mockupSubtitle: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  mockupBody: {
    textAlign: 'center',
    marginBottom: 12,
  },
  mockupCta: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  mockupCtaText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
