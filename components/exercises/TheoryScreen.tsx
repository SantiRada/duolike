import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TheoryScreen as TheoryScreenType } from '@/types';
import { Colors } from '@/constants/Colors';

interface TheoryScreenProps {
  theory: TheoryScreenType;
  onContinue: () => void;
}

export function TheoryScreen({ theory, onContinue }: TheoryScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lightbulb" size={32} color={Colors.xpBar} />
        <Text style={styles.title}>{theory.title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {theory.content.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        {theory.examples && theory.examples.length > 0 && (
          <View style={styles.examplesSection}>
            <View style={styles.examplesHeader}>
              <MaterialIcons name="format-quote" size={20} color={Colors.primary} />
              <Text style={styles.examplesTitle}>Ejemplos:</Text>
            </View>
            {theory.examples.map((example, index) => (
              <View key={index} style={styles.exampleBox}>
                <Text style={styles.exampleText}>{example}</Text>
              </View>
            ))}
          </View>
        )}

        {theory.keyTakeaways && theory.keyTakeaways.length > 0 && (
          <View style={styles.takeawaysSection}>
            <View style={styles.takeawaysHeader}>
              <MaterialIcons name="check-circle" size={20} color={Colors.success} />
              <Text style={styles.takeawaysTitle}>Puntos clave:</Text>
            </View>
            {theory.keyTakeaways.map((takeaway, index) => (
              <View key={index} style={styles.takeawayRow}>
                <MaterialIcons name="arrow-right" size={18} color={Colors.primary} />
                <Text style={styles.takeawayText}>{takeaway}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  examplesSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  examplesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  exampleBox: {
    backgroundColor: Colors.backgroundElevated,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: 12,
  },
  exampleText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  takeawaysSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  takeawaysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  takeawaysTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  takeawayText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textPrimary,
    flex: 1,
  },
});
