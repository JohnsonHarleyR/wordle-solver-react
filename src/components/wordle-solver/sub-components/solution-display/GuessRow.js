import React, { useEffect, useState, useContext } from 'react';
import { Row } from '../../styling/Styles';
import GuessSquare from './GuessSquare';

const GuessRow = ({rowId, guess}) => {

    const [squares, setSquares] = useState(getRowSquares(rowId, guess));
    const [squareDisplays, setSquareDisplays] = useState(getSquaresDisplay(squares));

    useEffect(() => {
        let newSquares = getRowSquares(rowId, guess)
        setSquares(newSquares);
        setSquareDisplays(getSquaresDisplay(newSquares));
    }, [guess]);
    
    return (
        <Row >
            {squareDisplays}
        </Row>
    )
}

const getSquaresDisplay = (squares) => {
    let display = [];
    squares.forEach(square => {
        display.push(
            <GuessSquare key={square.key} state={square.state}>
                {square.text}
            </GuessSquare>
        );
    });
    return display;
}

const getRowSquares = (rowId, guess) => {
    let squareStates = ['unused', 'unused', 'unused', 'unused', 'unused'];
    let squareTexts = ["", "", "", "", ""];
    let squares = [];
    for (let i = 0; i < 5; i++)
    {
        if (guess != undefined && guess.result != null)
        {
            squareStates[i] = getSquareState(rowId, guess.isCorrect, guess.result[i].status);
            squareTexts[i] = guess.result[i].letter;   
        }

        squares.push(
            {state: squareStates[i], text: squareTexts[i], key: `r${rowId}s${i + 1}`}
        );
    }

    return squares;
}


const getSquareState = (rowId, isCorrect, enumNumber) => {
    if (rowId === 6 && !isCorrect) {
        return 'red';
    } else if (enumNumber === 0) {
            return 'correct';
    } else if (enumNumber === 1) {
        return 'wrong position';
    } else if (enumNumber === 2) {
        return 'incorrect';
    } else {
        return 'error';
    }
}

export default GuessRow;