import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  initialGuesses: string[]
}

export const InitialGrid = ({ guesses, initialGuesses }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : []

  return (
    <div className="pb-6 mr-6">
      {initialGuesses.map((guess, i) => (
        <CompletedRow initialGuesses={[]} isHidden={i >= guesses.length && i !== initialGuesses.length-1} key={i} guess={guess} />
      ))}
    </div>
  )
}
