import React, { useContext, useEffect, useRef, useState } from 'react';
import { getEmptyGuesses, SolverContext } from '../../SolverContext';
import { getWordleGuesses, checkIfWordExists,
     getGuessResults, getRandomAnswer } from '../../ApiCaller';
import { GuessButton, Input, Section, AnswerTitle,
    ButtonSection, TopSection, Message } from '../../styling/Styles';
//import { getWordleGuesses, checkIfWordExists,
//    getGuessResults, getRandomAnswer } from '../../LogicController';

const AnswerInput = () => {

    let inputRef = useRef();

    const {addedRound, setAddedRound, solveMode,
    userRound, setUserRound, correctAnswer,
    guesses, setGuesses, setUserIsGuessing, setUserMessage,
    userIsGuessing, setUserRoundFinished,
    userRoundFinished, setStartTime, startTime, 
    checkWordleCommon} = useContext(SolverContext);

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
                if (checkWordleCommon && solveMode === "computer") {
                    setErrorMessage('Word is not common. Uncheck "words are common" to use all.');
                } else {
                    setErrorMessage("Not a valid word. Please choose another.");
                }
                
            } else {
                setErrorMessage("");
                if (solveMode === 'computer') {
                    getWordleGuesses(solveWord, setAddedRound, 
                        checkWordleCommon);
                    inputRef.current.value = "";
                } else {
                    makeGuess(solveWord);
                    inputRef.current.value = "";
                }
            }
        }

    }, [doesWordExist]);

    useEffect(() => {
        setSolveWord(null);
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
            setSolveWord(null);
            inputRef.current.placeholder="Enter answer for computer";
        } else {
            setUserGuess(null);
            setSolveWord(null);
            setButtonText('Guess');
            inputRef.current.value = "";
            inputRef.current.placeholder="Guess an answer";
        }
        setErrorMessage("");
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

            setUserRound(roundCopy);

            // once the user is done with a round
            if (roundCopy.didWin || roundCopy.guesses.length >= 6) {
                roundCopy.isFinished = true;
                console.log('round finished');
                let nowTime = Date.now();
                let mSeconds = (nowTime - startTime);
                roundCopy.timeToSolve.totalMilliseconds = mSeconds;
                setUserRound(roundCopy);
                setUserRoundFinished(true);
            }
        }
    }, [userGuess]);

    useEffect(() => {
        if (userRound) {
            let newMessage = "Round complete. ";
            if (userRound != null && userRound.didWin) {
                newMessage += "You win!";
            } else {
                newMessage += `You are out of guesses. The answer was ${userRound.correctAnswer}`;
            }
            setUserMessage(newMessage);
        }

    }, [userRoundFinished]);

    useEffect(() => {
        if (userIsGuessing) {
            setUserMessage("Round has started!");
            if (startTime === null) {
                setStartTime(Date.now);
            }
        } else {
            if (solveMode === "user") {
                setUserMessage("Guess the answer. :)");
            }
        }
    }, [userIsGuessing]);

    useEffect(() => {
        setSolveWord(null);
    }, [checkWordleCommon]);

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
            let userGuessing = solveMode === 'computer' ? false: true;
            checkIfWordExists(newSolveWord, setDoesWordExist, 
                checkWordleCommon, userGuessing);
        }
    }

    const makeGuess = (guessWord) => {
        setUserIsGuessing(true);
        getGuessResults(guessWord, correctAnswer, setUserGuess);
    }

    return (
        <TopSection>
            <AnswerTitle>Answer</AnswerTitle>
            <ButtonSection>
                <Input type="text" ref={inputRef} placeholder="Enter answer for computer"/>
                <GuessButton onClick={solveForAnswer}>{buttonText}</GuessButton>
            </ButtonSection>
            <Message>{errorMessage}</Message>
        </TopSection>
    );
}

export default AnswerInput;