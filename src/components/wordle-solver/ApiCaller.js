//const portNumber = "44320";
//const startUrl = `https://localhost:${portNumber}`;
const startUrl = `http://wordlesolverapi-dev.us-east-1.elasticbeanstalk.com`;

export const getWordleGuesses = (correctAnswer, setFunction, isForContest) => {
    //console.log('getting guesses');
    if (isForContest === undefined)
    {
        isForContest = false;
    }
    FetchData(`${startUrl}/Wordle/GetWordleGuesses?correctAnswer=${correctAnswer}&isForContest=${isForContest}`, 
    setFunction, "Could not retrieve guesses.");
}

export const checkIfWordExists = (word, setFunction, isForContest, userIsGuessing) => {
    //console.log('checking if word exists');
    if (isForContest === undefined)
    {
        isForContest = false;
    }
    if (userIsGuessing === undefined)
    {
        userIsGuessing = true;
    }
    FetchData(`${startUrl}/Wordle/DoesWordExist?word=${word}&isForContest=${isForContest}&userIsGuessing=${userIsGuessing}`, 
    setFunction, "Could not retrieve guesses.");
}

export const getRandomAnswer = (setFunction) => {
    //console.log('getting an answer to solve');
    FetchData(`${startUrl}/Wordle/GetRandomGuessWord`, 
    setFunction, "Could not get random answer.");
}

export const getEmptyRound = (correctAnswer, setFunction) => {
    //console.log('getting guesses');
    FetchData(`${startUrl}/Wordle/GetEmptyRound?correctAnswer=${correctAnswer}`, 
    setFunction, "Could not create round.");
}

export const getGuessResults = (guessWord, correctWord, setFunction) => {
    //console.log('guessing word');
    FetchData(`${startUrl}/Wordle/GetGuessResults?guessWord=${guessWord}&correctWord=${correctWord}`, 
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
        //console.log(result);
        setFunction(result);
    })
    .catch(() => {
        console.log(`Error: ${errorMessage}`);
    })
}