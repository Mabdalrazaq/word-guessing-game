import { getGuessStatuses, getNumberOfCorrectGuesses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (guesses: string[], lost: boolean, initialGuesses: string[]) => {
  const text = `${GAME_TITLE} ${solutionIndex} ${lost ? '0' : getNumberOfCorrectGuesses(guesses, initialGuesses)}/${initialGuesses.length - 1}\n\n` +
    generateEmojiGrid(guesses, initialGuesses);
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text));
  navigator.clipboard.writeText(text);
}

export const generateEmojiGrid = (guesses: string[], initialGuesses: string[]) => {
  return guesses
    .map((guess, i) => {
      const guessStatus = getGuessStatuses(guess, initialGuesses, true, i)
      const initialGuessStatus = getGuessStatuses(initialGuesses[i], initialGuesses, false, i);
      return initialGuesses[i].split('')
        .map((letter, i) => {
          switch (initialGuessStatus[i]) {
            case 'present':
              return '🟧'
            case 'correct':
              return '🟦'
            default:
              return '⬜'
          }
        })
        .join('') + ' ' +
        guess.split('')
          .map((letter, i) => {
            switch (guessStatus[i]) {
              case 'correct-all':
                return '🟩'
              case 'incorrect-all':
                return '🟥'
              case 'always-correct':
                return '❤️';
              default:
                return '⬜'
            }
          })
          .join('');
    })
    .join('\n')
}
