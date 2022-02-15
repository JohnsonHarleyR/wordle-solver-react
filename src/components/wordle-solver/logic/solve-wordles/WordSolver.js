import { getGuessWords } from "./word-banks/GuessWords";
import { WordleSolution, WordGuess, LetterCount, LetterPosition } from "./classes/WordleClasses";
import { getMostCommonLetters, countInstancesInWord } from "./Counter";
import { chooseRandomWord, getListOfWordsWithLetters, getProbablyWordFromUnknownLetters,
    getStatusLetters, getWordsWithLettersInPosition, getWordsWithNoLetterInPosition,
    getWordsWithNoLetter, getWordWithoutCorrectLetters} from "./WordSorter";

export const getWordleSolution = (correctAnswer) => {
    let beginningTime = Date.now();
    let endResult = new WordleSolution();
    endResult.correctAnswer = correctAnswer;
    let possibleWords = getGuessWords();

    // figure out the most common letter in possible answers - TODO improve this part?
    for (let i = 0; i < 6; i++) {
        let mostCommonLetters = getMostCommonLetters(possibleWords, 3);

        let newGuessWord;
        if (i === 0) {
            newGuessWord = chooseRandomWord(
                getListOfWordsWithLetters(mostCommonLetters, possibleWords));
        } else {
            let lastResults = endResult.guesses[i - 1].result;
            newGuessWord = getProbablyWordFromUnknownLetters(lastResults, possibleWords);
        }

        // make guess, get results
        let newGuess = determineGuessResults(newGuessWord, correctAnswer);
        newGuess.guessNumber = i + 1;
        endResult.guesses.push(newGuess);

        // if it was correct, set winner
        if (newGuess.isCorrect) {
            endResult.didWin = true;
            break;
        }

        // otherwise, eliminate possibilities based on guess result
        possibleWords = eliminateBasedOnGuess(possibleWords, newGuess);
        // now it will loop until it gets a correct answer
    }
    let endTime = Date.now();
    let difference = endTime - beginningTime;
    
    endResult.timeToSolve = {
        totalMilliseconds: difference
    };
    endResult.guessCount = endResult.guesses.length;
    endResult.isFinished = true;
    return endResult;
}

export const eliminateBasedOnGuess = (possibleWords, guess) => {
    let correctLetters = getStatusLetters(guess.result, 'correct');
    let incorrectLetters = getStatusLetters(guess.result, 'incorrect');
    let wrongPositionLetters = getStatusLetters(guess.result, 'wrongPosition');

    correctLetters.forEach(correctLetter => {
        possibleWords = getWordsWithLettersInPosition(possibleWords, 
            correctLetter.letter, correctLetter.position);
    });

    incorrectLetters.forEach(incorrectLetter => {
        let isContainedInWrongPositions = false;
        wrongPositionLetters.every(wrongPosLetter => {
            if (wrongPosLetter.letter === incorrectLetter.letter) {
                isContainedInWrongPositions = true;
            }
        });
        if (isContainedInWrongPositions) {
            possibleWords = getWordsWithNoLetterInPosition(possibleWords, 
                incorrectLetter.letter, incorrectLetter.position);
        } else {
            possibleWords = getWordsWithNoLetter(possibleWords, 
                incorrectLetter.letter, correctLetters);
        }
    });

    let possibleWordsFinal = [];
    possibleWords.forEach(word => {
        let canAdd = true;
        let correctLettersCopy = [...correctLetters];
        
        let wordWithNoEliminatedLetters = getWordWithoutCorrectLetters(word, correctLettersCopy);
        wrongPositionLetters.every(wrongPosLetter => {
            if (!wordWithNoEliminatedLetters.includes(wrongPosLetter.letter)) {
                canAdd = false;
                return true;
            } else {
                correctLettersCopy.push(wrongPosLetter);
                wordWithNoEliminatedLetters = getWordWithoutCorrectLetters(
                    wordWithNoEliminatedLetters, correctLettersCopy);
                return false;
            }
        });

        if (canAdd) {
            possibleWordsFinal.push(word);
        }
    });

    return possibleWordsFinal;
}

export const determineGuessResults = (guessWord, correctWord) => {
    let guess = new WordGuess(guessWord);
    let containedLetters = [];

    for (let i = 0; i < guessWord.length; i++) {
        let guessLetter = guessWord.substring(i, 1);
        let correctLetter = correctWord.substring(i, 1);
        let result;

        if (guessLetter === correctLetter) {
            result = 'correct';

            // TODO move this to own method
            let isInContainedList = false;
            let timesInContainedList = 1;
            let containedLetterCount = 
            new LetterCount(guessLetter, timesInContainedList);

            let containedLetterIndex = 0;
            for (let n = 0; n < containedLetters.length; n++) {
                let l = containedLetters[n];
                if (l.letter === guessLetter) {
                    l.count++;
                    timesInContainedList = l.count;
                    containedLetterCount = l;
                    isInContainedList = true;
                    containedLetterIndex = n;
                }
            }
            if (!isInContainedList) {
                containedLetters.push(containedLetterCount);
                containedLetterIndex = containedLetters.length - 1;
            }

            // if there are too many letter instances in contained list, 
            // change one of the previous "Wrong Position" guess letters to being incorrect
            let timesInCorrectWord = countInstancesInWord(guessLetter, correctWord);
            if (timesInContainedList > timesInCorrectWord) {
                do {
                    guess.result.forEach(guessResult => {
                        if (guessResult !== null && guessResult.letter === guessLetter && 
                            guessResult.status === 'wrongPosition') {
                                guessResult.status = 'incorrect';
                                timesInContainedList--;
                                containedLetters[containedLetterIndex].length = timesInContainedList;
                                //break;
                            }
                    });
                } while (timesInContainedList > timesInCorrectWord);
            }
            ///////////////////
        } else if (correctWord.includes(guessLetter)) {
            let timesInCorrectWord = countInstancesInWord(guessLetter, correctWord);
            let timesInContainedList = 1;

            // TODO move this to own method
            let isInContainedList = false;
            let containedLetterCount = 
            new LetterCount(guessLetter, timesInContainedList);

            containedLetters.forEach(l => {
                if (l.letter === guessLetter) {
                    l.count++;
                    containedLetterCount = l;
                    timesInContainedList = l.count;
                    isInContainedList = true;
                }
            });
            
            if (!isInContainedList) {
                containedLetters.push(containedLetterCount);
            }
            /////////////////

            if (timesInContainedList <= timesInCorrectWord) {
                result = 'wrongPosition';
            } else {
                result = 'incorrect';
                containedLetterCount.count--;
            }
        } else {
            result = 'incorrect';
        }

        guess.result[i] = new LetterPosition(guessLetter, i, result);
    }

    // determine if guess was correct or not
    let isCorrect = true;
    guess.result.every(result => {
        if (result.status !== 'correct') {
            isCorrect = false;
            return false;
        }
        return true;
    });

    guess.isCorrect = isCorrect;
    return guess;
}

export const doesWordExist = (word) => {
    let words = getGuessWords();
    let doesExist = false;
    words.forEach(w => {
        if (w.trim() === word) {
            doesExist = true;
        }
    });
    return doesExist;
}