import React, { useContext, useEffect, useRef } from 'react';
import { SolverContext } from '../../SolverContext';

const RoundChanger = () => {

    const prevButton = useRef();
    const nextButton = useRef();
    const {rounds, roundIndex, setRoundIndex,
         resetRounds} = useContext(SolverContext);

    const nextRound = () => {
        let roundCount = rounds.length;
        if (roundIndex !== roundCount - 1) {
            setRoundIndex(roundIndex + 1);
        }
    }

    const prevRound = () => {
        if (roundIndex !== 0) {
            setRoundIndex(roundIndex - 1);
        }
    }

    useEffect(() => {
        if (roundIndex !== null) {
            let roundCount = rounds.length;
            prevButton.current.disabled = false;
            nextButton.current.disabled = false;

            if (roundIndex === roundCount - 1) {
                nextButton.current.disabled = true;
            }
            if (roundIndex === 0) {
                prevButton.current.disabled = true;
            }
        } else {
            prevButton.current.disabled = true;
            nextButton.current.disabled = true;
        }
    },[roundIndex]);

    return (
        <div>
            <button ref={prevButton} onClick={prevRound}>Prev</button>
            <span>Round {roundIndex !== null ? (roundIndex + 1) : 0}</span>
            <button ref={nextButton} onClick={nextRound}>Next</button>
            <br></br>
            <button onClick={resetRounds}>Reset Rounds</button>
        </div>
    );
}

export default RoundChanger;