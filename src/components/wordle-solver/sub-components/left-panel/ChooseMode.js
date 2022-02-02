import React, { useContext, useEffect, useRef } from 'react';
import { SolverContext } from '../../SolverContext';

const ChooseMode = () => {

    const computerButton = useRef();
    const userButton = useRef();
    const {solveMode, setSolveMode} = useContext(SolverContext);

    const computerMode = () => {
        setSolveMode('computer');
    }

    const userMode = () => {
        setSolveMode('user');
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