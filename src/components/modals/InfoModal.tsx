import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The Computer guessed the word after a couble of tries.
        After each guess, the color of the tiles changed to show how close its guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="W" status="correct" />
        <Cell value="E" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W was in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" />
        <Cell value="I" />
        <Cell value="L" status="present" />
        <Cell value="O" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L was in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell value="U" status="absent" />
        <Cell value="E" />
      </div>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-300">
        The letter U was not in the word in any spot.
      </p>

      <p className="font-bold mt-1 mb-1 text-sm text-gray-500 dark:text-gray-300 m">
        Your goal now is to guess the guesses, using only the colors the computer revealed, and the solution!
      </p>
      <p className="italic mt-1 text-xs text-gray-500 dark:text-gray-300 m">
        Hint: The computer is not stupid; It would never guess a word with information contradicting with the feedback it got from guessing the previous word
      </p>

    </BaseModal>
  )
}
