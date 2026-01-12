import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface HeartCounterProps {
  hearts: number;
  maxHearts: number;
}

export function HeartCounter({ hearts, maxHearts }: HeartCounterProps) {
  const heartIcons = Array.from({ length: maxHearts }, (_, i) => {
    const filled = i < hearts;
    return (
      <MaterialIcons
        key={i}
        name={filled ? 'favorite' : 'favorite-border'}
        size={22}
        color={filled ? Colors.heartRed : Colors.disabled}
        style={styles.heart}
      />
    );
  });

  return <View style={styles.container}>{heartIcons}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heart: {
    marginHorizontal: 1,
  },
});
