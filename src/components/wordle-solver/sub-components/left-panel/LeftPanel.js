import React from 'react';
import { SidePanel } from '../../styling/Styles';
import ChooseMode from './ChooseMode';
import AnswerInput from './AnswerInput';
import RoundChanger from './RoundChanger';
import Statistics from './Statistics';

const LeftPanel = () => {
    return (
        <SidePanel>
            <ChooseMode />
            <AnswerInput />
            <RoundChanger />
            <Statistics />
        </SidePanel>
    );
}

export default LeftPanel;