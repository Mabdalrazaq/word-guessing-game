import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { InitialGrid } from './components/grid/InitialGrid'
import { OngoingGrid } from './components/grid/OngoingGrid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  LOST_MESSAGE,
} from './constants/strings'
import { isWordInWordList, solution, solveAndGetGuesses } from './lib/words'
import {
  fetchAndStoreStatsForCompletedGame as addStatsForCompletedGame,
  loadStats,
} from './lib/stats'
import {
  getWinMessage,
  getNumberOfCorrectGuesses,
  doGuessesReflectAWinningState,
  doGuessesReflectALosingState,
  isGameInProgress,
} from './lib/statuses'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isGameWonAlertDisplayed, setIsGameWonAlertDisplayed] = useState(false)
  const [isGameLostAlertDisplayed, setIsGameLostAlertDisplayed] =
    useState(false)
  const [isGameCopiedAlertDisplayed, setIsGameCopiedAlertDisplayed] =
    useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [initialGuesses, setInitialGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded) return loaded.initialGuesses
    return solveAndGetGuesses(solution)
  })
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded) return loaded.guesses
    return []
  })
  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      const calculatedInitialGuesses = solveAndGetGuesses(solution)
      saveGameStateToLocalStorage({
        guesses: [],
        initialGuesses: calculatedInitialGuesses,
        solution,
      })
      setInitialGuesses(calculatedInitialGuesses)
      setGuesses([])
      setIsGameLost(false)
      setIsGameWon(false)
      setIsStatsModalOpen(false)
      setTimeout(() => {}, 5000)
      return
    }
    if (doGuessesReflectAWinningState(loaded.guesses, loaded.initialGuesses)) {
      setIsGameWon(true)
    }
    if (doGuessesReflectALosingState(loaded.guesses, loaded.initialGuesses)) {
      setIsGameLost(true)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    if (isGameWon) {
      setIsGameWonAlertDisplayed(true)
      setTimeout(() => {
        setIsGameWonAlertDisplayed(false)
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setIsGameLostAlertDisplayed(true)
      setTimeout(() => {
        setIsGameLostAlertDisplayed(false)
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution, initialGuesses })
  })

  const onChar = (value: string) => {
    if (
      currentGuess.length < 5 &&
      guesses.length < initialGuesses.length - 1 &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (
      currentGuess.length === 5 &&
      isGameInProgress(guesses, initialGuesses)
    ) {
      const updatedGuesses = [...guesses, currentGuess]
      if (doGuessesReflectAWinningState(updatedGuesses, initialGuesses)) {
        setStats(
          addStatsForCompletedGame(
            stats,
            getNumberOfCorrectGuesses(updatedGuesses, initialGuesses)
          )
        )
        setIsGameWon(true)
      }

      if (doGuessesReflectALosingState(updatedGuesses, initialGuesses)) {
        setStats(
          addStatsForCompletedGame(
            stats,
            getNumberOfCorrectGuesses(updatedGuesses, initialGuesses)
          )
        )
        setIsGameLost(true)
      }
      setGuesses(updatedGuesses)
      setCurrentGuess('')
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-12">
        <h1 className="text-xl grow font-bold dark:text-white">{GAME_TITLE}</h1>
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <div className="flex justify-center mb-1">
        <InitialGrid initialGuesses={initialGuesses} guesses={guesses} />
        <OngoingGrid
          initialGuesses={initialGuesses}
          guesses={guesses}
          currentGuess={currentGuess}
        />
      </div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        initialGuesses={initialGuesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        initialGuesses={initialGuesses}
        handleShare={() => {
          setIsGameCopiedAlertDisplayed(true)
          return setTimeout(
            () => setIsGameCopiedAlertDisplayed(false),
            ALERT_TIME_MS
          )
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={LOST_MESSAGE} isOpen={isGameLostAlertDisplayed} />
      <Alert
        message={getWinMessage(
          getNumberOfCorrectGuesses(guesses, initialGuesses),
          initialGuesses
        )}
        isOpen={isGameWonAlertDisplayed}
        variant="success"
      />
      <Alert
        message={GAME_COPIED_MESSAGE}
        isOpen={isGameCopiedAlertDisplayed}
        variant="success"
      />
    </div>
  )
}

export default App
