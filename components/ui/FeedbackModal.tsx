import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
          <View style={styles.titleContainer}>
            {isCorrect ? (
              <MaterialIcons name="check-circle" size={40} color={Colors.success} />
            ) : (
              <MaterialIcons name="cancel" size={40} color={Colors.error} />
            )}
            <Text style={styles.title}>
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </Text>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    backgroundColor: Colors.backgroundElevated,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
    minHeight: height * 0.3,
    maxHeight: height * 0.5,
    borderTopWidth: 6,
  },
  containerCorrect: {
    borderTopColor: Colors.success,
  },
  containerWrong: {
    borderTopColor: Colors.error,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  feedback: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 26,
  },
});
