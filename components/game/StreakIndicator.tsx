import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface StreakIndicatorProps {
  streak: number;
}

export function StreakIndicator({ streak }: StreakIndicatorProps) {
  if (streak === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.number}>{streak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.streakFire,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  fire: {
    fontSize: 20,
    marginRight: 4,
  },
  number: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textLight,
  },
});
