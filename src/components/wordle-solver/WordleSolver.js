import React, {useState} from 'react';
import { SolverContext } from './SolverContext';
import { Solver, Top, Lower } from './styling/Styles';
import LeftPanel from './sub-components/left-panel/LeftPanel';
import SolutionDisplay from './sub-components/solution-display/SolutionDisplay';
import FileHandler from './sub-components/top-panel/FileHandler';

const WordlesSolver = () => {

    return (
        <Solver>
            <Top>
                <FileHandler />
            </Top>
            <Lower>
                <LeftPanel />
                <SolutionDisplay />
            </Lower>
        </Solver>
    );
}

export default WordlesSolver;