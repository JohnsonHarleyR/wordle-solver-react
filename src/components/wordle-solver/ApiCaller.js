const portNumber = "44305";
const startUrl = `https://localhost:${portNumber}`;

export const getWordleGuesses = (correctAnswer, setFunction) => {
    console.log('getting guesses');
    FetchData(`${startUrl}/Wordles/GetWordleGuesses?correctAnswer=${correctAnswer}`, 
    setFunction, "Could not retrieve guesses.");
}

export const checkIfWordExists = (word, setFunction) => {
    console.log('checking if word exists');
    FetchData(`${startUrl}/Wordles/DoesWordExist?word=${word}`, 
    setFunction, "Could not retrieve guesses.");
}

export const getRandomAnswer = (setFunction) => {
    console.log('getting an answer to solve');
    FetchData(`${startUrl}/Wordles/GetRandomWord`, 
    setFunction, "Could not get random answer.");
}

export const getEmptyRound = (correctAnswer, setFunction) => {
    console.log('getting guesses');
    FetchData(`${startUrl}/Wordles/GetEmptyRound?correctAnswer=${correctAnswer}`, 
    setFunction, "Could not create round.");
}

export const getGuessResults = (guessWord, correctWord, setFunction) => {
    console.log('guessing word');
    FetchData(`${startUrl}/Wordles/GetGuessResults?guessWord=${guessWord}&correctWord=${correctWord}`, 
    setFunction, "Could not guess the word.");
}

const FetchData = (url, setFunction, errorMessage) => {
    console.log('fetching');
    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
            console.log('ok');
        } else {
            console.log('not ok');
            throw new Error(errorMessage);
        }
    })
    .then((result) => {
        console.log(result);
        setFunction(result);
    })
    .catch(() => {
        console.log(`Error: ${errorMessage}`);
    })
}