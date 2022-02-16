import React, {useState} from 'react';
import { SolverContext } from './SolverContext';
import { Solver, Top, Lower } from './styling/Styles';
import LeftPanel from './sub-components/left-panel/LeftPanel';
import RightPanel from './sub-components/right-panel/RightPanel';
import SolutionDisplay from './sub-components/solution-display/SolutionDisplay';

const WordlesSolver = () => {

    return (
        <Solver>
            <Lower>
                <LeftPanel />
                <SolutionDisplay />
                <RightPanel />
            </Lower>
        </Solver>
    );
}

export default WordlesSolver;