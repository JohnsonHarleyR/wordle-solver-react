import React, { useContext, useEffect, useRef, useState } from 'react';
import { getEmptyGuesses, SolverContext } from '../../SolverContext';
import { getWordleGuesses, checkIfWordExists,
     getGuessResults, getRandomAnswer } from '../../ApiCaller';
import { GuessButton, Input, Section, ButtonSection } from '../../styling/Styles';
//import { getWordleGuesses, checkIfWordExists,
//    getGuessResults, getRandomAnswer } from '../../LogicController';

const AnswerInput = () => {

    let inputRef = useRef();

    const {addedRound, setAddedRound, solveMode, setRoundIndex,
    userRound, setUserRound, correctAnswer, rounds, setRounds,
    guesses, setGuesses, setUserIsGuessing, setUserMessage,
    setCorrectAnswer, userIsGuessing, setUserRoundFinished
    } = useContext(SolverContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [solveWord, setSolveWord] = useState(null);
    const [doesWordExist, setDoesWordExist] = useState(null);
    const [buttonText, setButtonText] = useState("Solve");

    const [userGuess, setUserGuess] = useState(null);

    useEffect(() => {
        if (doesWordExist !== null) {
            console.log(`Word exists?: ${doesWordExist}`);

            if (solveWord === null) {
                setErrorMessage("");
            } else if (!doesWordExist) {
                setErrorMessage("Not a valid word. Please choose another.");
            } else {
                setErrorMessage("");
                if (solveMode === 'computer') {
                    getWordleGuesses(solveWord, setAddedRound);
                } else {
                    makeGuess(solveWord);
                }
            }
        }

    }, [doesWordExist]);

    useEffect(() => {
        if (addedRound === null) {
            setSolveWord(null);
            setErrorMessage("");
            setDoesWordExist(null);
        }
    }, [addedRound]);

    // These next two revolve around a user game
    useEffect(() => {
        if (solveMode === 'computer') {
            setButtonText('Solve');
            setUserGuess(null);
            inputRef.current.placeholder="Enter answer for computer";
        } else {
            setSolveWord(null);
            setButtonText('Guess');
            inputRef.current.value = "";
            inputRef.current.placeholder="Guess an answer";
        }
    }, [solveMode]);

    useEffect(() => { // TODO move starting a user round to method inside context
        if (userGuess !== null) {
            // set the guess index
            let guessIndex = userRound.guesses.length;
            userGuess.guessNumber = guessIndex + 1;

            let roundCopy = {...userRound};
            let guessesCopy = [...guesses];

            guessesCopy.push(userGuess);
            setGuesses(guessesCopy);

            roundCopy.guessCount++;
            roundCopy.guesses.push(userGuess);
            if (userGuess.isCorrect) {
                roundCopy.didWin = true;
            }

            // once the user is done with a round
            if (roundCopy.didWin || roundCopy.guesses.length >= 6) {
                roundCopy.isFinished = true;
                setUserRoundFinished(true);

                let newMessage = "Round complete. ";
                if (roundCopy.didWin) {
                    newMessage += "You win!";
                } else {
                    newMessage += `You are out of guesses. The answer was ${roundCopy.correctAnswer}`;
                }
                setUserMessage(newMessage);

                // add it to rounds, set the index to the new round
                // setAddedRound(roundCopy);

                // let roundsCopy = [...rounds];
                // roundsCopy.push(roundCopy);
                // setRounds(roundsCopy);
                // setGuesses(roundCopy.guesses);
                // setRoundIndex(roundsCopy.length - 1);

                //make the user round null, as well as answer, 
                //and set isguessing to false

                // setUserRound(null);
                // setUserIsGuessing(false);
                // // get a new word if they want to start again
                // setCorrectAnswer(getRandomAnswer(setCorrectAnswer));
                
            }

            setUserRound(roundCopy);
        }
    }, [userGuess]);

    useEffect(() => {
        if (userIsGuessing) {
            setUserMessage("Round has started!");
        } else {
            if (solveMode === "user") {
                setUserMessage("Guess the answer. :)");
            }
        }
    }, [userIsGuessing]);

    const solveForAnswer = (e) => {
        let newSolveWord = inputRef.current.value.toLowerCase().trim();

        if (newSolveWord.length !== 5) {
            setErrorMessage("Answer must be 5 letters long");
            setDoesWordExist(null);
        } else if (!/^[a-zA-Z]+$/.test(newSolveWord)) {
            setErrorMessage("Answer must be alphabetical.");
            setDoesWordExist(null);
        } else if (solveWord === newSolveWord) {
            setErrorMessage("Please choose a new word.");
            setDoesWordExist(null);
        } else {
            setSolveWord(newSolveWord);
            setDoesWordExist(null);
            checkIfWordExists(newSolveWord, setDoesWordExist);
        }
    }

    const makeGuess = (guessWord) => {
        setUserIsGuessing(true);
        getGuessResults(guessWord, correctAnswer, setUserGuess);
    }

    return (
        <Section>
            <ButtonSection>
                <Input type="text" ref={inputRef} placeholder="Enter answer for computer"/>
                <GuessButton onClick={solveForAnswer}>{buttonText}</GuessButton>
            </ButtonSection>
            <p>{errorMessage}</p>
            
        </Section>
    );
}

export default AnswerInput;