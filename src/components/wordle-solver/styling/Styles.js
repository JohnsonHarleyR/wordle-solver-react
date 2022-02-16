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
    justify-content: center;
`;

export const Lower = styled.div`
    border: 1px solid cyan;
    display: flex;
    justify-content: center;
`;

export const SidePanel = styled.div`
    width: 250px;
    border: 1px solid cyan;
    display: flex;
    flex-direction: column;
`;

export const ChooseModeSection = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    float: center;
    justify-content: center;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 15px;
`;

export const Section = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    float: center;
    justify-content: center;
    text-align: center;
`;

export const AnswerSection = styled(Section)`
    margin-top: 27px;
`;


export const Message = styled.div`
    height: 30px;
    width: 200px;
    color: red;
    align-self: center;
    font-size: 12px;
    font-weight: bold;
    font-family: "Arial", sans-serif;
    margin-top: 1px;
`;

export const Title = styled.h3`
    padding: 0;
    margin-top: 3px;
    margin-bottom: 8px;
`

export const RoundTitle = styled(Title)`
    margin-top: 10px;
    margin-bottom: 5px;
`;

export const AnswerTitle = styled(Title)`
    margin: 0;
`;

export const GameTitle = styled.h2`
    padding: 0;
    margin: 10px;
`;

export const ButtonSection = styled.div`
    display: block;
`;

export const Button = styled.button`
    display:inline-block;
    padding:0.7em 0em;
    border-radius:0.15em;
    text-decoration:none;
    font-family:'Verdana',sans-serif;
    font-weight: bold;
    color:#FFFFFF;
    text-align:center;
    position:relative;
    border: 1.5px solid #105410;
    background-color: #228222;
    :disabled {
        background-color: #C7F3C7;
        border: 1.5px solid #228222;
        color: #105410;
    }
`;

export const ModeButton = styled(Button)`
    width: 100px;
`;

export const GuessButton = styled(Button)`
    width: 200px;
`;

export const NavButton = styled(Button)`
    width: 100px;
`;

export const ResetButton = styled(Button)`
    width: 200px;
`;

export const Input = styled.input`
    width: 190px;
    height: 30px;
    border-radius: 3px;
    margin: 5px;
`;

export const Stats = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Solution = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid cyan;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

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

export const Square = styled.div`
    width: 50px;
    height: 50px;
    margin: 3px;
`;

export const EmptySquare = styled(Square)`
    border: 2px solid #C7C7C7;
    border-radius: 3px;
    background-color: #fff;
`;

export const GreenSquare = styled(Square)`
    border: 2px solid #228222;
    border-radius: 3px;
    background-color: #228222;
`;

export const YellowSquare = styled(Square)`
    border: 2px solid #DAA520;
    border-radius: 3px;
    background-color: #DAA520;
`;

export const GreySquare = styled(Square)`
    border: 2px solid #696969;
    border-radius: 3px;
    background-color: #696969;
`;

export const RedSquare = styled(Square)`
    border: 2px solid #b8211f;
    border-radius: 3px;
    background-color: #b8211f;
`;