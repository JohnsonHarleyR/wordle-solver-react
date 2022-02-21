import React from 'react';
import { SidePanel } from '../../styling/Styles';
import FileHandler from './FileHandler';
import Statistics from './Statistics';

const RightPanel = () => {
    return (
        <SidePanel>
            <FileHandler />
            <Statistics />
        </SidePanel>
    );
}

export default RightPanel;