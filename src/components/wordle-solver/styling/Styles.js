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
    padding: 5px;
`;

export const EmptySquare = styled.div`
    border: 2px solid grey;
    color: black;
    background-color: #fff;
    width: 50px;
    height: 50px;
`;

export const GreenSquare = styled.div`
    color: white;
    background-color: #228222;
    width: 50px;
    height: 50px;
`;

export const YellowSquare = styled.div`
    color: white;
    background-color: #DAA520;
    width: 50px;
    height: 50px;
`;

export const GreySquare = styled.div`
    color: white;
    background-color: #696969;
    width: 50px;
    height: 50px;
`;

export const RedSquare = styled.div`
    color: white;
    background-color: #B22222;
    width: 50px;
    height: 50px;
`;

export const LText = styled.div`
    text-transform: uppercase;
`;