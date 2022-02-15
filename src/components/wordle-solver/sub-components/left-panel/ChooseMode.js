import React, { useContext, useEffect, useRef } from 'react';
import { ChooseModeSection, ButtonSection, Title, ModeButton } from '../../styling/Styles';
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
        <ChooseModeSection>
            <Title>Who is guessing?</Title>
            <ButtonSection>
                <ModeButton ref={computerButton} onClick={computerMode}>Computer</ModeButton>
                <ModeButton ref={userButton} onClick={userMode}>User</ModeButton>
            </ButtonSection>
        </ChooseModeSection>
    );
}

export default ChooseMode;