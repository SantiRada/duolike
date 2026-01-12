import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface StreakIndicatorProps {
  streak: number;
}

export function StreakIndicator({ streak }: StreakIndicatorProps) {
  if (streak === 0) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons name="local-fire-department" size={20} color="#FFFFFF" />
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
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  number: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
