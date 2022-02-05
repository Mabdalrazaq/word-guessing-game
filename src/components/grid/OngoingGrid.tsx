import { isGameInProgress } from '../../lib/statuses'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  initialGuesses: string[]
  currentGuess: string
}

export const OngoingGrid = ({ initialGuesses, guesses, currentGuess }: Props) => {
  const empties = initialGuesses.length - guesses.length - 2 >= 0 ? Array(initialGuesses.length - guesses.length - 2).fill(0) : [];

  return (
    <div className="pb-6 mr-6">
      {guesses.map((guess, i) => (
        <CompletedRow initialGuesses={initialGuesses} rowIndex={i} isOnGoingGrid={true} key={i} guess={guess} />
      ))}
      {isGameInProgress(guesses, initialGuesses) && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
