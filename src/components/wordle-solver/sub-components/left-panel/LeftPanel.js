import React from 'react';
import { SidePanel } from '../../styling/Styles';
import ChooseMode from './ChooseMode';
import AnswerInput from './AnswerInput';
import RoundChanger from './RoundChanger';

const LeftPanel = () => {
    return (
        <SidePanel>
            <AnswerInput />
            <ChooseMode />
            <RoundChanger />
        </SidePanel>
    );
}

export default LeftPanel;