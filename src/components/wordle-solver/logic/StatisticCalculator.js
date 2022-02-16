import { countWordsWithLetterInPosition } from "./solve-wordles/Counter";
import { WordProbability } from "./solve-wordles/classes/WordleClasses";

export const getWordProbabilityScoresByUnknownLetters = (positions, words) => {
    let scores = [];
    words.forEach(word => {
        let score = calculateWordProbabilityScoreByUnknownLetters(positions, word, words);
        scores.push(new WordProbability(word, score));
    });
    return scores;
}

export const calculateWordProbabilityScoreByUnknownLetters = (positions, word, words) => {
    let total = 0;
    for (let i = 0; i < positions.length; i++) {
        let letter = word.substring(positions[i], 1);
        total += calculateLetterProbability(words, letter, positions[i]);
    }
    return total;
}

const calculateLetterProbability = (words, letter, position) => {
    let letterCount = countWordsWithLetterInPosition(words, letter, position);
    let totalWords = words.length;

    return letterCount / totalWords;
}

export const getAccuracyPercent = (rounds) => {
    if (rounds.length === 0) {
        return `0%`;
    }

    let totalRounds = rounds.length;
    let wins = 0;
    rounds.forEach(round => {
        if (round.didWin === true) {
            wins++;
        }
    });

    let percent = ((wins / totalRounds) * 100).toFixed(2);
    return `${percent}%`;
}

export const getAverageGuessesToSolve = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let totalRounds = rounds.length;
    let totalGuesses = 0;
    rounds.forEach(round => {
        totalGuesses += round.guessCount;
    });

    let average = (totalGuesses / totalRounds).toFixed(2);
    return `${average}`;
}

export const getAverageTimeToSolve = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let totalRounds = rounds.length;
    let totalTime = 0;
    rounds.forEach(round => {
        totalTime += round.timeToSolve.totalMilliseconds;
    });

    let average = ((totalTime / totalRounds) / 1000).toFixed(3);
    return `${average} seconds`;
}

export const getFailedWords = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let failedWords = "";
    rounds.forEach(round => {
        if (!round.didWin) {
            if (failedWords != "") {
                failedWords += ", ";
            }
            failedWords += round.correctAnswer;
        }
    });

    return failedWords;
}

export const getTotalTime = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let totalTime = 0;
    rounds.forEach(round => {
        totalTime += round.timeToSolve.totalMilliseconds;
    });

    let newTotal = (totalTime / 1000).toFixed(3);
    return `${newTotal} seconds`;
}

export const getAverageGuessesToSolveWithPenalty = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let totalRounds = rounds.length;
    let totalGuesses = 0;
    rounds.forEach(round => {
        if (round.didWin) {
            totalGuesses += round.guessCount;
        } else {
            totalGuesses += 10;
        }
    });

    let average = (totalGuesses / totalRounds).toFixed(2);
    return `${average}`;
}

export const getTotalTimeWithPenalty = (rounds) => {
    if (rounds.length === 0) {
        return 'N/A';
    }

    let totalTime = 0;
    let totalIncorrect = 0;
    rounds.forEach(round => {
        totalTime += round.timeToSolve.totalMilliseconds;
        if (!round.didWin) {
            totalIncorrect++;
        }
    });

    let penaltyPercent = totalIncorrect * .01;
    let penalty = totalTime * penaltyPercent;
    let newTotal = ((totalTime + penalty) / 1000).toFixed(3);
    return `${newTotal} s`;
}