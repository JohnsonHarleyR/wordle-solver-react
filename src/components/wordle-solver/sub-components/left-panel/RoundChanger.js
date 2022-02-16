import React, { useContext, useEffect, useRef } from 'react';
import { SolverContext } from '../../SolverContext';
import { Section, ButtonSection, NavButton, 
    ResetButton, RoundTitle } from '../../styling/Styles';

const RoundChanger = () => {

    const prevButton = useRef();
    const nextButton = useRef();
    const {rounds, roundIndex, setRoundIndex,
         resetRounds, userIsGuessing, userRound,
        setCurrentRound, userRoundFinished,
        currentRound, setUserMessage} = useContext(SolverContext);

    const nextRound = () => {
        let roundCount = rounds.length;
        if (roundIndex !== roundCount - 1 && 
            !userIsGuessing) {
            setRoundIndex(roundIndex + 1);
        } else if (userRound !== null && 
            roundIndex === roundCount - 1) {
                if (currentRound === userRound) {
                    if (roundCount === 0) {
                        nextButton.current.disabled = true;
                    } else {
                        setRoundIndex(0);
                    }
                } else {
                    setCurrentRound(userRound);
                    //nextButton.current.disabled = true;
                    setUserMessage(`Play a round yourself!`);
                    if (roundCount === 0) {
                        nextButton.current.disabled = true;
                    }
                }
            
        } else if (roundIndex === roundCount - 1) {
            if (roundCount === 0) {
                nextButton.current.disabled = true;
            } else {
                setRoundIndex(0);
            }
        }
    }

    const prevRound = () => {
        if (roundIndex !== 0 && !userIsGuessing) {
            if (userRound != null && currentRound === userRound) {
                setCurrentRound(rounds[roundIndex]);
                if (!rounds[roundIndex].didWin) {
                    setUserMessage(`The answer was "${rounds[roundIndex].correctAnswer}"`);
                } else {
                    setUserMessage(`Winner.`);
                }
            } else {
                setRoundIndex(roundIndex - 1);
            }

        } else if (roundIndex === 0 && !userIsGuessing && userRound !== null && 
                rounds.length === 1) {
                    setCurrentRound(rounds[roundIndex]);
        } else if (roundIndex === 0 && !userIsGuessing & userRound !== null) {
            if (currentRound === userRound) {
                setRoundIndex(rounds.length - 1);
            } else {
                setCurrentRound(userRound)
            }
        } else if (roundIndex === 0) {
                setRoundIndex(rounds.length - 1);
        }
    }

    const getRoundNumber = () => {
        if (roundIndex === null) {
            return 0;
        } else if (userRound !== null && 
            (roundIndex === rounds.length - 1 || 
            roundIndex === 0) && 
            currentRound === userRound) {
                if (!userIsGuessing && userRound !== null && 
                    rounds.length === 1 && userIsGuessing) {
                        return (roundIndex + 1);
                    }
                if (userIsGuessing && userRoundFinished) {
                    return (roundIndex + 1);
                }
                if (roundIndex === rounds.length - 1) {
                    return (roundIndex + 2);
                } else {
                    if (rounds.length === 0) {
                        return 1;
                    } else {
                        return (rounds.length + 1);
                    }
                }
                
        } else {
            return (roundIndex + 1);
        }
    }

    const determineButtonStates = () => {
        if (roundIndex !== null) {
            prevButton.current.disabled = false;
            nextButton.current.disabled = false;

            if (roundIndex === 0) {
                if (userIsGuessing || rounds.length == 1) {
                    prevButton.current.disabled = true;
                }
                
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
        <Section>
            <RoundTitle>Round: {getRoundNumber()}</RoundTitle>
            <ButtonSection>
                <NavButton ref={prevButton} onClick={prevRound}>Prev</NavButton>
                <NavButton ref={nextButton} onClick={nextRound}>Next</NavButton>
                <br></br>
                <ResetButton onClick={resetRounds}>Reset Rounds</ResetButton>
            </ButtonSection>
        </Section>
    );
}

export default RoundChanger;