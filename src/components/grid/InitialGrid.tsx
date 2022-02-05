import { CompletedRow } from './CompletedRow'

type Props = {
  guesses: string[]
  initialGuesses: string[]
}

export const InitialGrid = ({ guesses, initialGuesses }: Props) => {

  return (
    <div className="pb-6 mr-6">
      {initialGuesses.map((guess, i) => (
        <CompletedRow initialGuesses={[]} isHidden={i >= guesses.length && i !== initialGuesses.length-1} key={i} guess={guess} />
      ))}
    </div>
  )
}
