import React, { useContext, useRef, useEffect } from 'react';
import { SolverContext } from '../../SolverContext';
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

    const startNewRound = () => {
        startNewUserRound();
    }

    return (
        <div>
            {userMessage}
            <button ref={newUserRoundButton} onClick={startNewUserRound}>New Round</button>
        </div>
    );
}

export default UserMessage;