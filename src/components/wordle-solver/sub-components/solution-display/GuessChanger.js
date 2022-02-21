import React, { useContext, useRef, useEffect } from 'react';
import { SolverContext, getEmptyGuess } from '../../SolverContext';
import { GuessSection, ButtonSection, GuessChangeButton, SeeGuesses } from '../../styling/Styles';

const GuessChanger = () => {

    const changeSpan = useRef();
    const prevButton = useRef();
    const nextButton = useRef();

    const {guessIndex, guesses, currentRound, setGuesses,
        setGuessIndex, solveMode} = useContext(SolverContext);

    useEffect(() => {
        if (currentRound === null || solveMode === "user") {
            changeSpan.current.style.display = "none";
        } else if (currentRound !== null && solveMode === "computer") {
            let topIndex = currentRound.guesses.length - 1;
            setGuessIndex(topIndex);
            changeSpan.current.style.display = "block";
        }
    }, [currentRound]);

    useEffect(() => {
        if (guessIndex !== null && currentRound !== null) {
            let newGuesses = [];
            for (let i = 0; i <= guessIndex; i++) {
                newGuesses.push(currentRound.guesses[i]);
            }
            
            let remaining = currentRound.guesses.length - newGuesses.length;
            let guessNum = newGuesses.length + 1;
            for (let i = 0; i < remaining; i++) {
                newGuesses.push(getEmptyGuess(guessNum));
                guessNum++;
            }

            setGuesses(newGuesses);
        }

    }, [guessIndex]);

    const prevGuess = () => {
        let newIndex = guessIndex - 1;
        if (newIndex < 0) {
            newIndex = guesses.length - 1;
        }
        setGuessIndex(newIndex);
    }

    const nextGuess = () => {
        let newIndex = guessIndex + 1;
        if (newIndex >= guesses.length) {
            newIndex = 0;
        }
        setGuessIndex(newIndex);
    }

    return(
        <GuessSection>
        <ButtonSection>
        <span ref={changeSpan}>
            <GuessChangeButton ref={prevButton} onClick={prevGuess}>Prev</GuessChangeButton>
            <SeeGuesses>
                See Guesses
            </SeeGuesses>
            <GuessChangeButton ref={nextButton} onClick={nextGuess}>Next</GuessChangeButton>
        </span>
        </ButtonSection>
        </GuessSection>

    );
}

export default GuessChanger;