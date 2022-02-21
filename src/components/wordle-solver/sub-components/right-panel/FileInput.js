import React, { useContext, useEffect, useRef, useState } from 'react';
import { SolverContext } from '../../SolverContext';
import { ImportTitle, Section, ButtonSection, 
    SelectButton, Check } from '../../styling/Styles';
import { getWordleGuesses } from '../../ApiCaller';

import CheckCommon from './CheckCommon';
//import { getWordleGuesses } from '../../LogicController';

const FileInput = () => {

    const input = useRef();
    const {setAddedRound, resetRounds, uploadMessage,
        setUploadMessage, checkWordleCommon} = useContext(SolverContext);
    const [fileContent, setFileContent] = useState(null);

    let tempArray = [];
    let tempIndex = null;
    let tempRounds = [];


    const readFile = (e) => {
        try {
            setUploadMessage("Reading file...");
            let fileReader = new FileReader();
            fileReader.onload = () => {
                setFileContent(fileReader.result);
            }
            fileReader.readAsText(e.target.files[0]);

        } catch (error) {
            setUploadMessage("Error: Could not read file.");
        }
    }

    const setTemp = (newRound) => {
        if (fileContent != null) {
            try {
                let tempRoundsCopy = [...tempRounds];
                tempRoundsCopy.push(newRound);
                //setTempRounds(tempRoundsCopy);
                tempRounds = tempRoundsCopy;
        
                let tempIndexCopy = tempIndex + 1;
                //setTempIndex(tempIndexCopy);
                tempIndex = tempIndexCopy;
        
                if (tempIndexCopy < tempArray.length) {
                    getWordleGuesses(tempArray[tempIndexCopy], 
                        setTemp, checkWordleCommon);
                } else {
                    tempRoundsCopy.forEach(round => {
                        setAddedRound(round);
                    })
                    setUploadMessage("");
                    tempArray = [];
                    tempIndex = null;
                    tempRounds = [];
                }
    
            } catch (error) {
                setUploadMessage("Error: The text format is invalid.");
            }
        }

    }

    const eraseContent = () => {
        input.current.value = "";
        setFileContent(null);
    }

    useEffect(() => {
        if (fileContent != null) {
            try {
                setUploadMessage("Parsing file...");
    
                let answerArray = fileContent.split("\n");
                if (answerArray.length != 0) {
                    resetRounds();
                    tempArray = answerArray;
                    //setTempArray(answerArray);
                    tempIndex = 0;
                    //setTempIndex(0);
                    getWordleGuesses(answerArray[0], setTemp, 
                        checkWordleCommon);
                } else {
                    setUploadMessage("No input in files...");
                }
    
            } catch (error) {
                setUploadMessage("Error: The text format is invalid.");
            }
        }
    }, [fileContent]);

    const loadFile = () => {
        eraseContent();
        input.current.click();
    }

    return(
        <Section>
            <ImportTitle>
                Import Answers
            </ImportTitle>
            <CheckCommon/>
            <ButtonSection>
                <SelectButton onClick={loadFile}>Select Text File</SelectButton>
                <input type="file" id="fileInput" style={{display: "none"}} ref={input} onChange={readFile}/>
            </ButtonSection>
        </Section>
    );
}

const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

export default FileInput;