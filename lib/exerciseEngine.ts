import {
  Exercise,
  MultipleChoiceExercise,
  FillBlankExercise,
  ReorderExercise,
  MatchPairsExercise,
  ChooseDesignExercise,
  HighlightExercise,
} from '@/types';

export const exerciseEngine = {
  /**
   * Valida si la respuesta del usuario es correcta
   */
  validateAnswer(exercise: Exercise, userAnswer: any): boolean {
    switch (exercise.type) {
      case 'multiple_choice':
        return this.validateMultipleChoice(exercise, userAnswer);
      case 'fill_blank':
        return this.validateFillBlank(exercise, userAnswer);
      case 'reorder':
        return this.validateReorder(exercise, userAnswer);
      case 'match_pairs':
        return this.validateMatchPairs(exercise, userAnswer);
      case 'choose_design':
        return this.validateChooseDesign(exercise, userAnswer);
      case 'highlight':
        return this.validateHighlight(exercise, userAnswer);
      default:
        return false;
    }
  },

  validateMultipleChoice(
    exercise: MultipleChoiceExercise,
    userAnswer: number
  ): boolean {
    return userAnswer === exercise.correctAnswer;
  },

  validateFillBlank(
    exercise: FillBlankExercise,
    userAnswer: string
  ): boolean {
    const caseSensitive = exercise.caseSensitive ?? false;

    const correct = exercise.correctAnswer.trim();
    const user = userAnswer.trim();

    if (caseSensitive) {
      return user === correct;
    } else {
      return user.toLowerCase() === correct.toLowerCase();
    }
  },

  validateReorder(exercise: ReorderExercise, userAnswer: number[]): boolean {
    if (userAnswer.length !== exercise.correctOrder.length) return false;

    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i] !== exercise.correctOrder[i]) return false;
    }

    return true;
  },

  validateMatchPairs(
    exercise: MatchPairsExercise,
    userAnswer: Record<number, number>
  ): boolean {
    const correctPairs = exercise.correctPairs;
    const userKeys = Object.keys(userAnswer).map(Number);
    const correctKeys = Object.keys(correctPairs).map(Number);

    if (userKeys.length !== correctKeys.length) return false;

    for (const key of correctKeys) {
      if (userAnswer[key] !== correctPairs[key]) return false;
    }

    return true;
  },

  validateChooseDesign(
    exercise: ChooseDesignExercise,
    userAnswer: number
  ): boolean {
    return userAnswer === exercise.correctAnswer;
  },

  validateHighlight(
    exercise: HighlightExercise,
    userAnswer: string
  ): boolean {
    const correct = exercise.correctHighlight.trim().toLowerCase();
    const user = userAnswer.trim().toLowerCase();
    return user === correct;
  },

  /**
   * Obtiene el feedback apropiado
   */
  getFeedback(exercise: Exercise, isCorrect: boolean): string {
    return isCorrect ? exercise.feedbackCorrect : exercise.feedbackWrong;
  },
};
