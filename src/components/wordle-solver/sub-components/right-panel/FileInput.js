import React, { useContext, useEffect, useRef, useState } from 'react';
import { SolverContext } from '../../SolverContext';
import { getWordleGuesses } from '../../ApiCaller';
//import { getWordleGuesses } from '../../LogicController';

const FileInput = () => {

    const input = useRef();
    const {setAddedRound, resetRounds} = useContext(SolverContext);
    const [fileContent, setFileContent] = useState(null);
    const [message, setMessage] = useState("");

    let tempArray = [];
    let tempIndex = null;
    let tempRounds = [];


    const readFile = (e) => {
        try {
            setMessage("Reading file...");
            let fileReader = new FileReader();
            fileReader.onload = () => {
                setFileContent(fileReader.result);
            }
            fileReader.readAsText(e.target.files[0]);

        } catch (error) {
            setMessage("Error: Could not read file.");
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
                    getWordleGuesses(tempArray[tempIndexCopy], setTemp);
                } else {
                    tempRoundsCopy.forEach(round => {
                        setAddedRound(round);
                    })
                    setMessage("");
                    tempArray = [];
                    tempIndex = null;
                    tempRounds = [];
                }
    
            } catch (error) {
                setMessage("Error: The text format is invalid.");
            }
        }

    }

    useEffect(() => {
        if (fileContent != null) {
            try {
                setMessage("Parsing file...");
    
                let answerArray = fileContent.split("\n");
                if (answerArray.length != 0) {
                    resetRounds();
                    tempArray = answerArray;
                    //setTempArray(answerArray);
                    tempIndex = 0;
                    //setTempIndex(0);
                    getWordleGuesses(answerArray[0], setTemp);
                } else {
                    setMessage("No input in files...");
                }
    
            } catch (error) {
                setMessage("Error: The text format is invalid.");
            }
        }
    }, [fileContent]);

    return(
        <>
        Rounds from file: <input type="file" ref={input} onChange={readFile}/><span>{message}</span>
        </>
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