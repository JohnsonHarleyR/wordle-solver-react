import React, {useContext, useEffect, useState} from 'react';
import { SolverContext, getEmptyGuesses, getEmptyGuess } from '../../SolverContext';
import { Solution } from '../../styling/Styles';
import GuessRow from './GuessRow';
import UserMessage from './UserMessage';

const SolutionDisplay = () => {


    const {currentRound, guesses, 
        setGuesses, userMessage} = useContext(SolverContext);
    const [rows, setRows] = useState(getRows(currentRound, guesses));

    useEffect(() => {
        if (currentRound === null)
        {
            setGuesses(getEmptyGuesses());
            console.log('round null');
        } else {
            if (currentRound !== undefined) {
                setGuesses(currentRound.guesses);
                console.log(currentRound);
            }
        }
    }, [currentRound]);

    useEffect(() => {
        let newRows = getRows(currentRound, guesses);
        setRows(newRows);
    }, [guesses]);

    return (
        <Solution>
            {rows}
            <UserMessage />
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