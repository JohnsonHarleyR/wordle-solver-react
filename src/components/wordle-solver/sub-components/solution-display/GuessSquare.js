import React, { useState, useContext, useEffect } from 'react';
import { SolverContext } from '../../SolverContext';
import { EmptySquare, GreenSquare, YellowSquare, GreySquare, RedSquare, LText } from '../../styling/Styles';

const GuessSquare = ({state, children}) => {

    const {guesses} = useContext(SolverContext);
    const [squareDisplay, setSquareDisplay] = useState(getSquareDisplay(state, children));

    useEffect(() => {
        setSquareDisplay(getSquareDisplay(state, children));
    }, [guesses]);

    
    return (
        <>
            {getSquareDisplay(state, children)}
        </>
    );
}

const getSquareDisplay = (state, children) => {
    if (state === 'unused') {
        return (
            <EmptySquare>
                <LText>
                    {children}
                </LText>
            </EmptySquare>
        );
    } else if (state === 'correct') {
        return (
            <GreenSquare>
                <LText>
                    {children}
                </LText>
            </GreenSquare>
        );
    } else if (state === 'incorrect') {
        return (
            <GreySquare>
                <LText>
                    {children}
                </LText>
            </GreySquare>
        );
    } else if (state === 'wrong position') {
        return (
            <YellowSquare>
                <LText>
                    {children}
                </LText>
            </YellowSquare>
        );
    } else {
        return (
            <RedSquare>
                <LText>
                    {children}
                </LText>
            </RedSquare>
        );
    }
}


export default GuessSquare;