import { WIN_MESSAGE_1, WIN_MESSAGE_2, WIN_MESSAGE_3, WIN_MESSAGE_4, WIN_MESSAGE_5, WIN_MESSAGE_6 } from '../constants/strings'
import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'incorrect-all' | 'correct-all' | ''

export type CharValue =
  | 'Q'
  | 'W'
  | 'E'
  | 'R'
  | 'T'
  | 'Y'
  | 'U'
  | 'I'
  | 'O'
  | 'P'
  | 'A'
  | 'S'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'K'
  | 'L'
  | 'Z'
  | 'X'
  | 'C'
  | 'V'
  | 'B'
  | 'N'
  | 'M'

export const getWinMessage = (numberOfCorrectGuesses: number, initialGuesses: string[]): string => {
  const ratio = numberOfCorrectGuesses / (initialGuesses.length - 1);
  if (ratio > 0 && ratio < 0.2)
    return WIN_MESSAGE_1
  else if (ratio < 0.4)
    return WIN_MESSAGE_2
  else if (ratio < 0.6)
    return WIN_MESSAGE_3
  else if (ratio < 0.8)
    return WIN_MESSAGE_4
  else if (ratio < 1)
    return WIN_MESSAGE_5
  else if (ratio === 1)
    return WIN_MESSAGE_6
  else
    return 'NAW: NOT A WIN'
}

export const doGuessesReflectAWinningState = (guesses: string[], initialGuesses: string[]) => {
  return getNumberOfCorrectGuesses(guesses, initialGuesses) > 0 && !isGameInProgress(guesses, initialGuesses)
}

export const doGuessesReflectALosingState = (guesses: string[], initialGuesses: string[]) => {
  return getNumberOfCorrectGuesses(guesses, initialGuesses) === 0 && !isGameInProgress(guesses, initialGuesses)
}

export const isGameInProgress = (guesses: string[], initialGuesses: string[]): boolean => {
  return guesses.length < initialGuesses.length - 1;
}

export const getNumberOfCorrectGuesses = (guesses: string[], initialGuesses: string[]): number => {
  let sum = 0;
  guesses.forEach((guess, i) => {
    if (guess === initialGuesses[i]) {
      sum++;
    }
  })
  return sum;
}

export const getKeyStatus = (char: CharValue, initialGuesses: string[], guesses: string[]): CharStatus => {
  const revealedInitialGuesses = initialGuesses.slice(0, guesses.length).join("");
  if (revealedInitialGuesses.includes(char) && !solution.includes(char))
    return 'absent';
  return '';
}

export const getGuessStatuses = (guess: string, initialGuesses: string[], isOnGoingGrid?: boolean, rowIndex?: number): CharStatus[] => {
  let selectdSolution = solution;
  if (isOnGoingGrid && rowIndex != null) {
    selectdSolution = initialGuesses[rowIndex];
  }
  const splitSolution = selectdSolution.split('')
  const splitGuess = guess.split('')

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      return
    }

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    statuses[i] = 'present';
  })

  if (isOnGoingGrid) {
    const allCorrect = statuses.filter(status => status === 'correct').length === 5;
    if (allCorrect) {
      return statuses.map(status => 'correct-all');
    } else {
      return statuses.map(status => 'incorrect-all');
    }
  }

  return statuses
}
