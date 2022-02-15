import { getWordleSolution, doesWordExist, determineGuessResults } 
from "./logic/solve-wordles/WordSolver";
import { getAnswerWords } from "./logic/solve-wordles/word-banks/AnswerWords";
import { WordleSolution } from "./logic/solve-wordles/classes/WordleClasses";

export const getWordleGuesses = (correctAnswer, setFunction) => {
    console.log('getting guesses');
    let result = getWordleSolution(correctAnswer);
    setFunction(result);
}

export const checkIfWordExists = (word, setFunction) => {
    console.log('checking if word exists');
    let result = doesWordExist(word);
    setFunction(result);
}

export const getRandomAnswer = (setFunction) => {
    console.log('getting an answer to solve');
    let answerWords = getAnswerWords();
    let index = Math.floor(Math.random() * answerWords.length);
    let answer = answerWords[index];
    setFunction(answer);
}

export const getEmptyRound = (correctAnswer, setFunction) => {
    console.log('getting empty round');
    let emptyRound = new WordleSolution();
    emptyRound.correctAnswer = correctAnswer;
    setFunction(emptyRound);
}

export const getGuessResults = (guessWord, correctWord, setFunction) => {
    console.log('guessing word');
    let results = determineGuessResults(guessWord, correctWord);
    setFunction(results);
}