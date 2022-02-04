import { WordProbability } from "./classes/WordleClasses";
import { getWordProbabilityScoresByUnknownLetters } from "../StatisticCalculator";



export const chooseRandomWord = (words) => {
    if (words.length === 0) {
        return null;
    }
    let index = Math.floor(Math.random() * words.length);
    return words[index];
}

export const getWordsWithLettersInPosition = (words, letter, position) => {
    let newWordList = [];
    words.forEach(word => {
        if (word.substring(position, 1) === letter) {
            newWordList.push(word);
        }
    })
    return newWordList;
}

export const getWordsWithNoLetterInPosition = (words, letter, position) => {
    let newWordList = [];
    words.forEach(word => {
        if (word.substring(position, 1) !== letter) {
            newWordList.push(word);
        }
    })
    return newWordList;
}

export const getWordsWithNoLetter = (words, letter, correctLetters) => {
    let newWordList = [];
    words.forEach(word => {
        let changedWord = getWordWithoutCorrectLetters(word, correctLetters);
        if (!changedWord.includes(letter)) {
            newWordList.push(word);
        }
    });
    return newWordList;
}

export const getWordWithoutCorrectLetters = (word, correctLetters) => {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {

        let doesApply = false;
        correctLetters.forEach(letter => {
            if (letter.position === i && 
                letter.letter === word.substring(i, 1)) {
                    doesApply = true;
            }
        });

        if (!doesApply) {
            newWord += word.substring(i, 1);
        }
    }
    return newWord;
}

export const getStatusLetters = (letters, letterStatus) => {
    let correctLetters = [];
    letters.forEach(letter => {
        if (letter.status === letterStatus) {
            correctLetters.push(letter);
        }
    });
    return correctLetters;
}

export const getListOfWordsWithLetters = (letters, wordList) => {
    let wordsWithLetters = [];
    wordList.forEach(word => {
        let doesContainLetters = true;
        for (let i = 0; i < letters.length; i++) {
            if (!word.includes(letters[i])) {
                doesContainLetters = false;
                break;
            }
        }
        if (doesContainLetters) {
            wordsWithLetters.push(word);
        }
    });
    return wordsWithLetters;
}

export const getProbablyWordFromUnknownLetters = (pattern, words) => {
    if (words.length === 0) { // TODO fix cases where this happens - figure out why it happens sometimes
        return "error";
    }

    let unknownPositions = [];
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i].status === 'incorrect') {
            unknownPositions.push(i);
        }
    }

    let scores = getWordProbabilityScoresByUnknownLetters(unknownPositions, words);
    scores.sort(function(a,b) {b.score - a.score});

    return scores[0].word;
}