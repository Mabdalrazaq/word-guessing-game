import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const shuffleWords = (words: string[]): string[] => {
  const shuffledWords = [...words];
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }
  return shuffledWords;
}

export const calculateInitialGuessesForWord = (word: string): string[] => {
  const excludedLetters: string[] = [];
  const presentLettersInCorrectIndecies = new Map<string, number[]>();
  const presentLettersInIncorrectIndecies = new Map<string, number[]>();
  const calculatedGuesses: string[] = [];

  while (true) {
    const shuffledValidGuesses = shuffleWords([...VALIDGUESSES, ...WORDS]);

    let calculatedGuess = calculateOneGuess(excludedLetters,
      presentLettersInCorrectIndecies,
      presentLettersInIncorrectIndecies,
      calculatedGuesses,
      shuffledValidGuesses,
      word);

    calculatedGuesses.push(calculatedGuess);

    //this will happen when the computer solves the wordle
    if (calculatedGuess === word)
      break;
    
    //force the computer to solve the wordle if not solved after 10 guesses
    if(calculatedGuesses.length===10){
      calculatedGuesses.push(word);
      break;
    }

    populateExcludedLetters(excludedLetters, calculatedGuess.split(""), word.split(""));
    populatePresentLettersInCorrectIndecies(presentLettersInCorrectIndecies, calculatedGuess.split(""), word.split(""));
    populatePresentLettersInIncorrectIndecies(presentLettersInIncorrectIndecies, calculatedGuess.split(""), word.split(""));
  }
  return calculatedGuesses.map(guess => guess.toUpperCase());
}

export const populateExcludedLetters = (excludedLetters: string[], guessLetters: string[], solutionLetters: string[]) => {
  for (let letter of guessLetters) {
    if (!solutionLetters.includes(letter))
      excludedLetters.push(letter);
  }
}

export const populatePresentLettersInCorrectIndecies = (map: Map<string, number[]>, guessLetters: string[], solutionLetters: string[]) => {
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      const correctIndecies = map.get(guessLetters[i]);
      if (correctIndecies == null) {
        map.set(guessLetters[i], [i]);
      }
      else {
        correctIndecies.push(i);
        map.set(guessLetters[i], correctIndecies);
      }
    }
  }
}

export const populatePresentLettersInIncorrectIndecies = (map: Map<string, number[]>, guessLetters: string[], solutionLetters: string[]) => {
  guessLetters.forEach((letter, i) => {
    if (solutionLetters.includes(letter) && solutionLetters.indexOf(letter) !== i) {
      const incorrectIndecies = map.get(letter);
      if (incorrectIndecies == null) {
        map.set(letter, [i]);
      }
      else {
        incorrectIndecies.push(i);
        map.set(letter, incorrectIndecies);
      }
    }
  })
}

export const calculateOneGuess = (excludedLetters: string[],
  presentLettersInCorrectIndecies: Map<string, number[]>,
  presentLettersInIncorrectIndecies: Map<string, number[]>,
  forbiddenWords: string[],
  validGuesses: string[],
  word: string): string => {
  forbiddenWords = [...forbiddenWords, word];
  outerLoop:
  for (let guess of validGuesses) {
    if (forbiddenWords.includes(guess))
      continue;
    for (let letter of excludedLetters) {
      if (guess.includes(letter))
        continue outerLoop;
    }
    for (const [letter, correctIndecies] of presentLettersInCorrectIndecies.entries()) {
      if (!guess.includes(letter))
        continue outerLoop;
      if (!correctIndecies.includes(guess.indexOf(letter)))
        continue outerLoop;
      for (let correctIndex of correctIndecies) {
        if (guess[correctIndex] !== letter)
          continue outerLoop;
      }
    }
    for (const [letter, incorrectIndecies] of presentLettersInIncorrectIndecies.entries()) {
      if (!guess.includes(letter))
        continue outerLoop;
      if (incorrectIndecies.includes(guess.indexOf(letter)))
        continue outerLoop;
    }
    return guess;
  }
  return word;
}

export const solveAndGetGuesses = (solution: string): string[] => {
  return calculateInitialGuessesForWord(solution.toLowerCase());
}

export const getWordOfDay = () => {
  // February 5, 2022 Game Epoch
  const epochMs = new Date('February 5, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()