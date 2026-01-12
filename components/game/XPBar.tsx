import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';

interface XPBarProps {
  xp: number;
  level: number;
}

export function XPBar({ xp, level }: XPBarProps) {
  const xpInCurrentLevel = xp % Config.XP_PER_LEVEL;
  const progress = xpInCurrentLevel / Config.XP_PER_LEVEL;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.level}>Nivel {level}</Text>
        <Text style={styles.xpText}>
          {xpInCurrentLevel} / {Config.XP_PER_LEVEL} XP
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  level: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  xpText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  barBackground: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.xpBar,
    borderRadius: 6,
  },
});
