import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

export const fetchAndStoreStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of correct guesses out of 6
  const stats = { ...gameStats }

  stats.totalGames += 1

  if (count > 0) {
    // A win situation
    stats.winDistribution[count] += 1
    stats.currentStreak += 1
  } else {
    stats.currentStreak = 0
    stats.gamesFailed += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array(11).fill(0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
