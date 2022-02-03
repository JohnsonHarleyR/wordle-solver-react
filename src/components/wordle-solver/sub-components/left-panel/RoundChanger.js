import React, { useContext, useEffect, useRef } from 'react';
import { SolverContext } from '../../SolverContext';

const RoundChanger = () => {

    const prevButton = useRef();
    const nextButton = useRef();
    const {rounds, roundIndex, setRoundIndex,
         resetRounds, userIsGuessing, userRound,
        setCurrentRound, currentRound} = useContext(SolverContext);

    const nextRound = () => {
        let roundCount = rounds.length;
        if (roundIndex !== roundCount - 1 && 
            !userIsGuessing) {
            setRoundIndex(roundIndex + 1);
        } else if (userRound !== null && 
            roundIndex === roundCount - 1) {
            setCurrentRound(userRound);
            nextButton.current.disabled = true;
        }
    }

    const prevRound = () => {
        if (roundIndex !== 0 && !userIsGuessing) {
            if (userRound != null && currentRound === userRound) {
                setCurrentRound(rounds[roundIndex]);
            } else {
                setRoundIndex(roundIndex - 1);
            }

        } else if (roundIndex === 0 && !userIsGuessing && userRound !== null && 
                rounds.length === 1) {
                    setCurrentRound(rounds[roundIndex]);
        }
    }

    const getRoundNumber = () => {
        if (roundIndex === null) {
            return 0;
        } else if (userRound !== null && 
            roundIndex === rounds.length - 1 && 
            currentRound === userRound) {
            return (roundIndex + 2);
        } else {
            return (roundIndex + 1);
        }
    }

    const determineButtonStates = () => {
        if (roundIndex !== null) {
            let roundCount = rounds.length;
            prevButton.current.disabled = false;
            nextButton.current.disabled = false;

            if (roundIndex === rounds.length - 1 || userIsGuessing) {
                nextButton.current.disabled = true;
            }
            if (roundIndex === 0 || userIsGuessing) {
                prevButton.current.disabled = true;

                if (!userIsGuessing && userRound !== null && 
                    rounds.length === 1 && userRound === currentRound) {
                        prevButton.current.disabled = false;
                    }
            }
        } else {
            prevButton.current.disabled = true;
            if (userRound !== null && 
                roundIndex === rounds.length - 1) {
                    nextButton.current.disabled = false;
            } else {
                nextButton.current.disabled = true;
            }
        }

        if (roundIndex === rounds.length - 1 && userRound !== null && 
            currentRound !== userRound &&
            !userIsGuessing) {
                nextButton.current.disabled = false;
            }
    }

    useEffect(() => {
        determineButtonStates();
    },[roundIndex]);

    useEffect(() => {
        if (userIsGuessing) {
            prevButton.current.disabled = true;
            nextButton.current.disabled = true;
        } else {
            determineButtonStates();
        }
    },[userIsGuessing, currentRound]);

    return (
        <div>
            <button ref={prevButton} onClick={prevRound}>Prev</button>
            <span>Round {getRoundNumber()}</span>
            <button ref={nextButton} onClick={nextRound}>Next</button>
            <br></br>
            <button onClick={resetRounds}>Reset Rounds</button>
        </div>
    );
}

export default RoundChanger;