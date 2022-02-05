import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string,
  initialGuesses:string[],
  isHidden?: boolean,
  isOnGoingGrid?: boolean,
  rowIndex?:number
}

export const CompletedRow = ({ guess, initialGuesses, isHidden, isOnGoingGrid, rowIndex}: Props) => {
  const statuses = getGuessStatuses(guess, initialGuesses, isOnGoingGrid, rowIndex)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell isHidden={isHidden} key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
