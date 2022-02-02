import React, {createContext, useEffect, useState} from 'react';
import { getTestRounds1 } from './tests/Testing';

const SolverContext = createContext({rounds:[]});

const SolverProvider = ({children}) => {
    const [solveMode, setSolveMode] = useState('computer');
    const [userRound, setUserRound] = useState(null);
    const [addedRound, setAddedRound] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [rounds, setRounds] = useState([]);
    const [roundIndex, setRoundIndex] = useState(null);
    const [guesses, setGuesses] = useState(getEmptyGuesses());

    const resetRounds = () => {
        setAddedRound(null);
        setCurrentRound(null);
        setRounds([]);
        setRoundIndex(null);
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

    return (
        <SolverContext.Provider value={{solveMode, addedRound, 
            currentRound, guesses, rounds, roundIndex, userRound,
        setSolveMode, setAddedRound, setCurrentRound, setGuesses, 
        setRounds, setRoundIndex, resetRounds, setUserRound}}>
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