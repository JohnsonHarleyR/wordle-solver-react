import React, { useContext, useEffect, useRef } from 'react';
import { SolverContext } from '../../SolverContext';

const ChooseMode = () => {

    const computerButton = useRef();
    const userButton = useRef();
    const {solveMode, setSolveMode,
        setUserMessage} = useContext(SolverContext);

    const computerMode = () => {
        setSolveMode('computer');
        setUserMessage("Enter a word for the computer to guess.");
    }

    const userMode = () => {
        setSolveMode('user');
        setUserMessage("Your turn to guess!\nOnce you guess, the round has started.");
    }

    useEffect(() => {
        if (solveMode === 'computer') {
            computerButton.current.disabled = true;
            userButton.current.disabled = false;
        } else {
            computerButton.current.disabled = false;
            userButton.current.disabled = true;
        }
    }, [solveMode]);

    return (
        <div>
            <button ref={computerButton} onClick={computerMode}>Computer</button>
            <button ref={userButton} onClick={userMode}>User</button>
        </div>
    );
}

export default ChooseMode;