

export class WordleSolution {
    constructor() {
        this.correctAnswer = null;
        this.didWin = false;
        this.guessCount = 0;
        this.timeToSolve = null;
        this.guesses = [];
        this.isFinished = false;
    }
}

export class WordGuess {
    constructor(word) {
        this.guessNumber = null;
        this.word = word;
        this.result = new Array(5);
        this.isCorrect = false;
    }
}

export class LetterPosition {
    constructor(letter, position, status) {
        this.letter = letter;
        this.position = position;
        this.status = status; // correct, incorrect, wrongPosition
    }
}

export class LetterCount {
    constructor(letter, count) {
        this.letter = letter;
        this.count = count;
    }
}

export class WordProbability {
    constructor(word, score) {
        this.word = word;
        this.score = score;
    }
}