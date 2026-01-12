import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Button } from './Button';

interface FeedbackModalProps {
  visible: boolean;
  isCorrect: boolean;
  feedback: string;
  onContinue: () => void;
}

export function FeedbackModal({
  visible,
  isCorrect,
  feedback,
  onContinue,
}: FeedbackModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            isCorrect ? styles.containerCorrect : styles.containerWrong,
          ]}
        >
          <Text style={styles.title}>
            {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto'}
          </Text>
          <Text style={styles.feedback}>{feedback}</Text>
          <Button
            title="Continuar"
            onPress={onContinue}
            variant={isCorrect ? 'primary' : 'secondary'}
          />
        </View>
      </View>
    </Modal>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: height * 0.3,
    maxHeight: height * 0.5,
  },
  containerCorrect: {
    borderTopWidth: 4,
    borderTopColor: Colors.success,
  },
  containerWrong: {
    borderTopWidth: 4,
    borderTopColor: Colors.error,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  feedback: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 26,
  },
});
