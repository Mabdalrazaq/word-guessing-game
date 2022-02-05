import { KeyValue } from '../../lib/keyboard'
import { getKeyStatus } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[],
  initialGuesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, initialGuesses }: Props) => {

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={getKeyStatus("Q", initialGuesses, guesses)} />
        <Key value="W" onClick={onClick} status={getKeyStatus("W", initialGuesses, guesses)} />
        <Key value="E" onClick={onClick} status={getKeyStatus("E", initialGuesses, guesses)} />
        <Key value="R" onClick={onClick} status={getKeyStatus("R", initialGuesses, guesses)} />
        <Key value="T" onClick={onClick} status={getKeyStatus("T", initialGuesses, guesses)} />
        <Key value="Y" onClick={onClick} status={getKeyStatus("Y", initialGuesses, guesses)} />
        <Key value="U" onClick={onClick} status={getKeyStatus("U", initialGuesses, guesses)} />
        <Key value="I" onClick={onClick} status={getKeyStatus("I", initialGuesses, guesses)} />
        <Key value="O" onClick={onClick} status={getKeyStatus("O", initialGuesses, guesses)} />
        <Key value="P" onClick={onClick} status={getKeyStatus("P", initialGuesses, guesses)} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={getKeyStatus("A", initialGuesses, guesses)} />
        <Key value="S" onClick={onClick} status={getKeyStatus("S", initialGuesses, guesses)} />
        <Key value="D" onClick={onClick} status={getKeyStatus("D", initialGuesses, guesses)} />
        <Key value="F" onClick={onClick} status={getKeyStatus("F", initialGuesses, guesses)} />
        <Key value="G" onClick={onClick} status={getKeyStatus("G", initialGuesses, guesses)} />
        <Key value="H" onClick={onClick} status={getKeyStatus("H", initialGuesses, guesses)} />
        <Key value="J" onClick={onClick} status={getKeyStatus("J", initialGuesses, guesses)} />
        <Key value="K" onClick={onClick} status={getKeyStatus("K", initialGuesses, guesses)} />
        <Key value="L" onClick={onClick} status={getKeyStatus("L", initialGuesses, guesses)} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        <Key value="Z" onClick={onClick} status={getKeyStatus("Z", initialGuesses, guesses)} />
        <Key value="X" onClick={onClick} status={getKeyStatus("X", initialGuesses, guesses)} />
        <Key value="C" onClick={onClick} status={getKeyStatus("C", initialGuesses, guesses)} />
        <Key value="V" onClick={onClick} status={getKeyStatus("V", initialGuesses, guesses)} />
        <Key value="B" onClick={onClick} status={getKeyStatus("B", initialGuesses, guesses)} />
        <Key value="N" onClick={onClick} status={getKeyStatus("N", initialGuesses, guesses)} />
        <Key value="M" onClick={onClick} status={getKeyStatus("M", initialGuesses, guesses)} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
