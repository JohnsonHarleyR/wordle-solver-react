import React, { useContext, useEffect, useState } from 'react';
import { SolverContext } from '../../SolverContext';

const FileOutput = () => {

    const {rounds} = useContext(SolverContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, [rounds]);

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
        setMessage('(check downloads folder...)')
    }

    return(
        <>
        <a href="" onClick={download}>Download Output...</a><span> {message}</span>
        </>
    );
}

export default FileOutput;