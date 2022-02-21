import React from 'react';
import FileInput from './FileInput';
import FileOutput from './FileOutput';
import { TopSection } from '../../styling/Styles';
import CheckCommon from './CheckCommon';

const FileHandler = () => {

    return (
        <TopSection>
            <FileInput />
            <FileOutput />
        </TopSection>
    );
}

export default FileHandler;