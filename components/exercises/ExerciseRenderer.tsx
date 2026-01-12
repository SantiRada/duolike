import React from 'react';
import { Exercise } from '@/types';
import { MultipleChoice } from './MultipleChoice';
import { FillBlank } from './FillBlank';
import { Reorder } from './Reorder';
import { MatchPairs } from './MatchPairs';
import { ChooseDesign } from './ChooseDesign';
import { Highlight } from './Highlight';
import { TheoryScreen } from './TheoryScreen';

interface ExerciseRendererProps {
  exercise: Exercise;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
}

export function ExerciseRenderer({
  exercise,
  onAnswer,
  disabled = false,
}: ExerciseRendererProps) {
  switch (exercise.type) {
    case 'multiple_choice':
      return (
        <MultipleChoice
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case 'fill_blank':
      return (
        <FillBlank
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case 'reorder':
      return (
        <Reorder exercise={exercise} onAnswer={onAnswer} disabled={disabled} />
      );

    case 'match_pairs':
      return (
        <MatchPairs
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case 'choose_design':
      return (
        <ChooseDesign
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case 'highlight':
      return (
        <Highlight
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case 'theory':
      return (
        <TheoryScreen
          theory={exercise}
          onContinue={() => onAnswer(true)}
        />
      );

    default:
      return null;
  }
}
