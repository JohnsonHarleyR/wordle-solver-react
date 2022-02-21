import React, { useContext, useRef, useEffect } from 'react';
import { SolverContext } from '../../SolverContext';
import { Section, CheckSection, CheckWords, Check } from '../../styling/Styles';
import { getCommonWordleWords } from 
'../../logic/solve-wordles/word-banks/CommonWordleWords';
import '../../styling/css-styles.css';

export const CheckCommon = () => {

    const {setCheckWordleCommon} 
    = useContext(SolverContext);
    const checkRef = useRef();

    const createOutputText = () => {
        let output = "";
        let words = getCommonWordleWords();
        words.forEach(word => {
            output += `${word}\n`;
        });
        return output;
    }

    const download = (e) => {
        let text = createOutputText();
        e.target.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
        e.target.download = "common-wordle-words.txt";
    }

    const changeStatus = (e) => {
        if (e.target.checked) {
            setCheckWordleCommon(true);
        } else {
            setCheckWordleCommon(false);
        }
    }

    useEffect(() => {
        checkRef.current.checked = false;
    }, []);

    return (
        <Section>
            <CheckSection>
                <input type="checkbox" ref={checkRef}
                onChange={changeStatus} className="check"/>
                <CheckWords>
                <sup>words are common</sup>
                    <a href="" onClick={download} style={{fontSize: "8.5px"}}>
                        (Download common words)
                    </a>
                
                </CheckWords>
            </CheckSection>
            <span>
                <sup>
                    
                </sup>
            </span>

        </Section>
    )
}

export default CheckCommon;