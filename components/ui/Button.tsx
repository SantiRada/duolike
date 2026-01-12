import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  const buttonStyle: ViewStyle[] = [styles.button];
  const textStyle: TextStyle[] = [styles.text];

  if (variant === 'primary') {
    buttonStyle.push(styles.primary);
    textStyle.push(styles.textPrimary);
  } else if (variant === 'secondary') {
    buttonStyle.push(styles.secondary);
    textStyle.push(styles.textSecondary);
  } else if (variant === 'outline') {
    buttonStyle.push(styles.outline);
    textStyle.push(styles.textOutline);
  }

  if (disabled) {
    buttonStyle.push(styles.disabled);
  }

  if (style) {
    buttonStyle.push(style);
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  textPrimary: {
    color: Colors.textLight,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  textSecondary: {
    color: Colors.textLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  textOutline: {
    color: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.disabled,
  },
});
