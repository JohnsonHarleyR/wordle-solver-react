import React, { useContext, useEffect, useState } from 'react';
import { SolverContext } from '../../SolverContext';
import {Stats} from '../../styling/Styles';
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
            <h4>Statistics</h4>
            <span>Rounds: {numberOfRounds}</span>
            <span>Percent correct: {correctAnswerRate}</span>
            <span>Average guesses to win: {averageGuesses}</span>
            <span>Average time: {averageTime}</span>
            <span>Failed words: {failedWords}</span>
            <span>Total time: {totalTime}</span>
            <br></br>
            <span>Average guesses with penalty: {averageGuessesWithPenalty}</span>
            <span>Total time with penalty: {totalTimeWithPenalty}</span>
        </Stats>
    );
}

export default Statistics;