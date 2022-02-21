import React, { useContext, useEffect, useRef } from 'react';
import { ChooseModeSection, ButtonSection, Title, ModeButton } from '../../styling/Styles';
import { SolverContext } from '../../SolverContext';

const ChooseMode = () => {

    const computerButton = useRef();
    const userButton = useRef();
    const {solveMode, setSolveMode, rounds, setCurrentRound,
        setUserIsGuessing, setUserRound, userIsGuessing, setUserRoundFinished,
        setUserMessage, setRoundIndex} = useContext(SolverContext);

    const computerMode = () => {
        setSolveMode('computer');
        setUserMessage("Enter a new word for the computer.");
    }

    const userMode = () => {
        setSolveMode('user');
        setUserMessage("Your turn! Once you guess, the round will begin.");
    }

    useEffect(() => {
        if (!rounds || rounds.length === 0) {
            if (solveMode === "computer") {
                setUserMessage("Enter a word for the computer to guess.");
            } else {

                    setUserMessage("Your turn! Once you guess, the round will begin.");

            }
        }
    }, [rounds]);

    useEffect(() => {
        if (solveMode === 'computer') {
            computerButton.current.disabled = true;
            userButton.current.disabled = false;
            setUserRound(null);
            setCurrentRound(null);
            setUserIsGuessing(false);
            setUserRoundFinished(false);
        } else {
            computerButton.current.disabled = false;
            userButton.current.disabled = true;

            if (rounds.length !== 0) {
                setRoundIndex(rounds.length - 1);
                setUserMessage("Your turn! Once you guess, the round will begin.");
            }
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