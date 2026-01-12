import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface HeartCounterProps {
  hearts: number;
  maxHearts: number;
}

export function HeartCounter({ hearts, maxHearts }: HeartCounterProps) {
  const heartIcons = Array.from({ length: maxHearts }, (_, i) => {
    const filled = i < hearts;
    return (
      <Text key={i} style={styles.heart}>
        {filled ? '❤️' : '🤍'}
      </Text>
    );
  });

  return <View style={styles.container}>{heartIcons}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    fontSize: 20,
    marginHorizontal: 2,
  },
});
