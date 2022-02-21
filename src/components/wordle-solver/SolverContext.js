import React, {createContext, useEffect, useState} from 'react';
import { getRandomAnswer, getEmptyRound } from './ApiCaller';

const SolverContext = createContext({rounds:[]});

const SolverProvider = ({children}) => {
    const [solveMode, setSolveMode] = useState('computer');
    const [addedRound, setAddedRound] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [rounds, setRounds] = useState([]);
    const [roundIndex, setRoundIndex] = useState(null);
    const [guesses, setGuesses] = useState(getEmptyGuesses());
    const [guessIndex, setGuessIndex] = useState(null);

    const [userRound, setUserRound] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [userIsGuessing, setUserIsGuessing] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [userRoundFinished, setUserRoundFinished] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const [startTime, setStartTime] = useState(null);
    const [checkWordleCommon, setCheckWordleCommon] = useState(false);

    const resetRounds = () => {
        setUserRound(null);
        setCorrectAnswer(null);
        setUserIsGuessing(false);
        setSolveMode('computer');
        setAddedRound(null);
        setCurrentRound(null);
        setRounds([]);
        setRoundIndex(null);
        setGuesses(getEmptyGuesses());
    }

    const startNewUserRound = () => {
        setUserRound(null);
        setUserIsGuessing(false);
        setUserRoundFinished(false);
        // get a new word if they want to start again
        setCorrectAnswer(getRandomAnswer(setCorrectAnswer));
    }

    useEffect(() => {
        if (addedRound !== null)
        {
            let roundsCopy = [...rounds];
            let newIndex = rounds.length;

            roundsCopy.push(addedRound);
            setRounds(roundsCopy);
            setRoundIndex(newIndex);
            console.log(rounds);

            setStartTime(null);
        }
    }, [addedRound]);

    useEffect(() => {
        if (roundIndex !== null) {
            setCurrentRound(rounds[roundIndex]);
            if (rounds[roundIndex].isFinished) {
                if (!rounds[roundIndex].didWin) {
                    setUserMessage(`The answer was "${rounds[roundIndex].correctAnswer}"`);
                } else {
                    setUserMessage(`Winner.`);
                }
            }
        }
    }, [roundIndex]);

    useEffect(() => {
        if (solveMode === 'computer') {
            setCorrectAnswer(null);
            setUserRound(null);
            if (roundIndex !== null) {
                setCurrentRound(rounds[roundIndex]);
            }
            //setUserMessage("Enter a word for the computer to guess.");
        } else {
            getRandomAnswer(setCorrectAnswer);

        }
    }, [solveMode]);

    // user playing - setting a new answer does this
    useEffect(() => {
        if (correctAnswer !== null) {
            getEmptyRound(correctAnswer, setUserRound);
        }
    }, [correctAnswer]);

    // user playing
    useEffect(() => {
        if (userRound != null) {
            setCurrentRound(userRound);
        }
    }, [userRound]);

        // user playing
        useEffect(() => {
            if (currentRound === userRound) {
                //setUserMessage("Play a round yourself!");
            }
        }, [currentRound]);

    useEffect(() => {
        if (!userRoundFinished && solveMode === 'user') {
            // setUserRound(null);
            // setUserIsGuessing(false);
            // // get a new word if they want to start again
            // getRandomAnswer(setCorrectAnswer);
        } else if (solveMode === 'user') {
            setAddedRound(userRound);
        }
    }, [userRoundFinished]);

    return (
        <SolverContext.Provider value={{solveMode, addedRound, 
            currentRound, guesses, rounds, roundIndex, userRound,
            userIsGuessing, correctAnswer, userMessage,
            userRoundFinished, guessIndex, uploadMessage,
            checkWordleCommon, startTime,
        setSolveMode, setAddedRound, setCurrentRound, setGuesses, 
        setRounds, setRoundIndex, resetRounds, setUserRound,
        setUserIsGuessing, setCorrectAnswer, setUserMessage,
        setUserRoundFinished, startNewUserRound, setGuessIndex, 
        setUploadMessage, setCheckWordleCommon, setStartTime}}>
            {children}
        </SolverContext.Provider>
    )
}


export const getEmptyGuesses = () => {
    let guesses = [];
    for ( let i = 0; i < 6; i++)
    {
        guesses.push(
            getEmptyGuess(i + 1)
        );
    }
    return guesses;
}

export const getEmptyGuess = (guessNum) => {
    return (
        {
            "guessNumber": guessNum,
            "word": null,
            "result" : null
        }
    );
}

export {SolverContext};
export default SolverProvider;