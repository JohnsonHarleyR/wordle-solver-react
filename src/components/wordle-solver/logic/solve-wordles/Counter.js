import { getAllLetters } from "./word-banks/LetterBank";
import { LetterCount } from "./classes/WordleClasses";

export const countWordsWithLetterInPosition = (words, letter, position) => {
    let count = 0;
    words.forEach(word => {
        if (word.substring(position, 1) === letter) {
            count++;
        }
    })
    return count;
}

export const countInstancesInWord = (letter, word) => {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (word.substring(i, 1) === letter) {
            count++;
        }
    }
    return count;
}

export const getMostCommonLetters = (words, howManyLetters) => {
    let letters = [];
    let countsByHighest = getLetterCountsInOrder(words);

    for (let i = 0; i < howManyLetters; i++) {
        letters.push(countsByHighest[i].letter);
    }

    return letters;
}

const getLetterCountsInOrder = (words) => {
    let letterCounts = [];
    let allLetters = getAllLetters();

    for (let i = 0; i < allLetters.length; i++) {
        let letter = allLetters[i];
        let count = 0;

        words.forEach(word => {
            if (word.includes(letter)) {
                for (let n = 0; n < word.length; n++) {
                    if (word.substring(n, 1) === letter) {
                        count++;
                    }
                }
            }
        });

        letterCounts.push(new LetterCount(letter, count));
    }

    letterCounts.sort(function(a,b){return b.count - a.count});
    return letterCounts;
}