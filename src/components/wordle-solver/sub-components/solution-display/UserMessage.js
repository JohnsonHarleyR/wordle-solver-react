import React, { useContext, useRef, useEffect } from 'react';
import { SolverContext } from '../../SolverContext';
import { UserMsgSection, ButtonSection, 
    SolutionText, RoundButton, Section } from '../../styling/Styles';
import { getRandomAnswer } from '../../ApiCaller';

const UserMessage = () => {

    const {userMessage, solveMode, startNewUserRound, 
        userRoundFinished} = useContext(SolverContext);

    const newUserRoundButton = useRef();

    useEffect(() => {
        if (!userRoundFinished || solveMode === 'computer') {
            newUserRoundButton.current.style.display = "none";
            // setUserRound(null);
            // setUserIsGuessing(false);
            // // get a new word if they want to start again
            // getRandomAnswer(setCorrectAnswer);
        } else if (userRoundFinished && solveMode === 'user') {
            newUserRoundButton.current.style.display = "block";
        }
    }, [userRoundFinished, solveMode]);

    return (
        <UserMsgSection>

            <SolutionText>
                {userMessage}
            </SolutionText>
            <RoundButton ref={newUserRoundButton} onClick={startNewUserRound}>New Round</RoundButton>
        </UserMsgSection>
    );
}

export default UserMessage;