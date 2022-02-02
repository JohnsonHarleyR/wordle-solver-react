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