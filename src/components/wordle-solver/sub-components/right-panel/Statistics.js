import React, { useContext, useEffect, useState } from 'react';
import { SolverContext } from '../../SolverContext';
import {Stats, StatTitle, PenaltyTitle, 
    StatWrapper} from '../../styling/Styles';
import { getAccuracyPercent, getAverageGuessesToSolve, 
getAverageTimeToSolve, getFailedWords, getTotalTime,
getAverageGuessesToSolveWithPenalty, 
getTotalTimeWithPenalty } from '../../logic/StatisticCalculator';

const Statistics = () => {
    const {rounds, resetRounds} = useContext(SolverContext);

    const [numberOfRounds, setNumberOfRounds] = useState(0);
    const [correctAnswerRate, setCorrectAnswerRate] = useState('NA');
    const [averageGuesses, setAverageGuesses] = useState('NA');
    const [averageTime, setAverageTime] = useState('NA');
    const [failedWords, setFailedWords] = useState('NA');
    const [totalTime, setTotalTime] = useState('NA');

    const [averageGuessesWithPenalty, setAverageGuessesWithPenalty] = useState('NA');
    const [totalTimeWithPenalty, setTotalTimeWithPenalty] = useState('NA');

    useEffect(() => {
        setNumberOfRounds(rounds.length);
        setCorrectAnswerRate(getAccuracyPercent(rounds));
        setAverageGuesses(getAverageGuessesToSolve(rounds));
        setAverageTime(getAverageTimeToSolve(rounds));
        setFailedWords(getFailedWords(rounds));
        setTotalTime(getTotalTime(rounds));
        setAverageGuessesWithPenalty(getAverageGuessesToSolveWithPenalty(rounds));
        setTotalTimeWithPenalty(getTotalTimeWithPenalty(rounds));
    }, [rounds]);

    

    return(
        <Stats>
            <StatTitle>Statistics</StatTitle>
            <StatWrapper>
            <span>Rounds: {numberOfRounds}</span><br></br>
            <span>Percent correct: {correctAnswerRate}</span><br></br>
            <span>Average guesses to win: {averageGuesses}</span><br></br>
            <span>Average time: {averageTime}</span><br></br>
            <span>Failed words: {failedWords}</span><br></br>
            <span>Total time: {totalTime}</span><br></br>

            <PenaltyTitle>With Contest Penalties</PenaltyTitle>
            <span>Average guesses: {averageGuessesWithPenalty}</span><br></br>
            <span>Total time: {totalTimeWithPenalty}</span>
            </StatWrapper>

        </Stats>
    );
}

export default Statistics;