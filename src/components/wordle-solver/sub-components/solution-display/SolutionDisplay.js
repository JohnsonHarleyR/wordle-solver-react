import React, {useContext, useEffect, useState} from 'react';
import { SolverContext, getEmptyGuesses, getEmptyGuess } from '../../SolverContext';
import { Solution, Section, GameTitle } from '../../styling/Styles';
import GuessRow from './GuessRow';
import UserMessage from './UserMessage';
import GuessChanger from './GuessChanger';

const SolutionDisplay = () => {


    const {currentRound, guesses, solveMode, rounds,
        setGuesses} = useContext(SolverContext);
    const [rows, setRows] = useState(getRows(currentRound, guesses));

    useEffect(() => {
        if (currentRound === null)
        {
            setGuesses(getEmptyGuesses());
        } else {
            if (currentRound !== undefined) {
                setGuesses(currentRound.guesses);
                console.log(currentRound);
            }
        }
    }, [currentRound]);

    useEffect(() => {
        if (solveMode === "computer" && 
            rounds !== null && rounds !== undefined &&
            rounds.length === 0) {
            setGuesses(getEmptyGuesses());
        }
    }, [solveMode]);

    useEffect(() => {
        let newRows = getRows(currentRound, guesses);
        setRows(newRows);
    }, [guesses]);

    return (
        <Solution>
            <Section>
            <GameTitle>Wordle Solver</GameTitle>
            </Section>
            
            {rows}
            <UserMessage />
            <GuessChanger />
        </Solution>
    );
}

const getRows = (currentRound, guesses) => {
    let rows = [];

    if (guesses != null)
    {
        guesses.forEach(g => {
            rows.push(
                <GuessRow key={`r${g.guessNumber}`} rowId={g.guessNumber} guess={g}/>
            );
        });
    }

    let remaining = 6 - guesses.length;
    for (let i = 0; i < remaining; i++) {
        let newGuess = getEmptyGuess(guesses.length + i + 1);
        rows.push(
            <GuessRow key={`r${guesses.length + i + 1}`} rowId={guesses.length + i + 1} guess={newGuess}/>
        );
    }

    return rows;
}


export default SolutionDisplay;