import React, { useContext, useEffect, useRef, useState } from 'react';
import { SolverContext } from '../../SolverContext';
import { getWordleGuesses, checkIfWordExists } from '../../ApiCaller';

const AnswerInput = () => {

    let inputRef = useRef();

    const {addedRound, setAddedRound, solveMode} = useContext(SolverContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [solveWord, setSolveWord] = useState(null);
    const [doesWordExist, setDoesWordExist] = useState(null);
    const [buttonText, setButtonText] = useState("Solve");

    useEffect(() => {
        if (doesWordExist !== null) {
            console.log(`Word exists?: ${doesWordExist}`);

            if (solveWord === null) {
                setErrorMessage("");
            } else if (!doesWordExist) {
                setErrorMessage("Not a valid word. Please choose another.");
            } else {
                setErrorMessage("");
                getWordleGuesses(solveWord, setAddedRound);
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

    useEffect(() => {
        if (solveMode === 'computer') {
            setButtonText('Solve');
        } else {
            setButtonText('Guess');
        }
    }, [solveMode]);

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

    return (
        <>
            <input type="text" ref={inputRef} placeholder="truck"/>
            <button onClick={solveForAnswer}>{buttonText}</button>
            <p>{errorMessage}</p>
        </>
    );
}

export default AnswerInput;