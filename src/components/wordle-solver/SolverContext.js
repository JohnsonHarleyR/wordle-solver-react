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

    const [userRound, setUserRound] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [userIsGuessing, setUserIsGuessing] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [userRoundFinished, setUserRoundFinished] = useState(false);

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
        }
    }, [addedRound]);

    useEffect(() => {
        if (roundIndex !== null) {
            setCurrentRound(rounds[roundIndex]);
        }
    }, [roundIndex]);

    useEffect(() => {
        if (solveMode === 'computer') {
            setCorrectAnswer(null);
            setUserRound(null);
            if (roundIndex !== null) {
                setCurrentRound(rounds[roundIndex]);
            }
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
            userRoundFinished,
        setSolveMode, setAddedRound, setCurrentRound, setGuesses, 
        setRounds, setRoundIndex, resetRounds, setUserRound,
        setUserIsGuessing, setCorrectAnswer, setUserMessage,
        setUserRoundFinished, startNewUserRound}}>
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