import React, { useContext, useEffect, useState } from 'react';
import { Section, ImportMessage, DownloadLink } from '../../styling/Styles';
import { SolverContext } from '../../SolverContext';

const FileOutput = () => {

    const {rounds, uploadMessage, guessIndex,
        setUploadMessage, roundIndex} = useContext(SolverContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setUploadMessage("");
    }, [rounds, guessIndex, roundIndex]);

    const createOutputText = () => {
        let output = "";
        rounds.forEach(round => {
            let line = "";
            round.guesses.forEach(guess => {
                if (line !== "") {
                    line += ",";
                }
                line += guess.word;
            });
            output += `${line}\n`;
        });
        return output;
    }

    const download = (e) => {
        setMessage('(downloading...');
        let text = createOutputText();
        e.target.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
        e.target.download = "solver-output.txt";
        setUploadMessage('(check downloads folder...)')
    }

    return(
        <>
        <DownloadLink href="" onClick={download}>Download Output</DownloadLink>
        <ImportMessage>{uploadMessage}</ImportMessage>
        </>
    );
}

export default FileOutput;