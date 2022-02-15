import styled from "styled-components";

export const Solver = styled.div`
    border: 1px solid cyan;
    display: flex;
    flex-direction: column;
`;

export const Top = styled.div`
    border: 1px solid cyan;
    display: flex;
    width: 100%;
`;

export const Lower = styled.div`
    border: 1px solid cyan;
    display: flex;
`;

export const SidePanel = styled.div`
    width: 300px;
    border: 1px solid cyan;
    display: flex;
    flex-direction: column;
`;

export const Stats = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Solution = styled.div`
    width: 300px;
    border: 1px solid cyan;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 5px;
`;

export const LText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-family: "Tahoma", "Verdana", 
    "Geneva", "Arial", sans-serif;
    text-transform: uppercase;
    font-size: 27px;
    color: white;
    width: 52px;
    height: 52px;
    margin-top: -2px;
    margin-left: -2px;
`;

export const EmptySquare = styled.div`
    color: black;
    border: 2px solid #C7C7C7;
    border-radius: 2px;
    background-color: #fff;
    width: 50px;
    height: 50px;
`;

export const GreenSquare = styled.div`
    border: 2px solid #228222;
    border-radius: 3px;
    background-color: #228222;
    width: 50px;
    height: 50px;
`;

export const YellowSquare = styled.div`
    color: white;
    border: 2px solid #DAA520;
    border-radius: 3px;
    background-color: #DAA520;
    width: 50px;
    height: 50px;
`;

export const GreySquare = styled.div`
    color: white;
    border: 2px solid #696969;
    border-radius: 3px;
    background-color: #696969;
    width: 50px;
    height: 50px;
`;

export const RedSquare = styled.div`
    color: white;
    border: 2px solid #696969;
    border-radius: 3px;
    background-color: #696969;
    width: 50px;
    height: 50px;
`;