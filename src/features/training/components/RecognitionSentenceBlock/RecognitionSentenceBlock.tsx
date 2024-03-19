import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import styles from "./RecognitionSentenceBlock.module.css";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import {WebCamera} from "../WebCamera/WebCamera";
import {Spinner} from "@nextui-org/react";
import {Word} from "../../../../core/models/Word";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {stopAllTracks} from "../../../../core/utils/stopAllTracks";
import {socket} from "../../../../core/utils/connectToModal";
import {RecognitionCamera} from "../RecognitionCamera";
import {Sentence, StartThemeWords} from "../../../../core/data";
import {Button} from "../../../../components/Button";
import {TaskContinue} from "../../../../components/TaskContinue";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg";


type Props = ComponentProps & Readonly<{
    // word: Word;
    // onSuccess: () => void;
    // intervalID: TimeoutId | undefined;
    // setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    // signRecognizeGrade: number
    // setSignRecognizeGrade: Dispatch<SetStateAction<number>>
    signRecognizeText: string[]
    setSignRecognizeText: Dispatch<SetStateAction<string[]>>
    // correctWords: Set<string>

    sentence: Sentence
    isDoneTask: boolean
    next: () => void
}>

export const RecognitionSentenceBlock: FC<Props> = typedMemo(function RecognitionSentenceBlock(props) {
    const [intervalID, setIntervalID] = useState<TimeoutId>();

    const onReceiveText = useCallback((text: string) => {
        let results: string[] = Object.values(JSON.parse(text))
        console.log(results)

        const findWord = StartThemeWords.find(word => word.id === props.sentence.words[props.signRecognizeText.length])
        console.log(findWord)

        if (results.includes(findWord?.recognitionText || "")) {
            props.setSignRecognizeText([...props.signRecognizeText, findWord?.recognitionText.toLowerCase() || ""])
        }


    }, [props])

    const handleMouseClick = (e: MouseEvent) => {
        e.preventDefault()
        const findWord = StartThemeWords.find(word => word.id === props.sentence.words[props.signRecognizeText.length])
        props.setSignRecognizeText([...props.signRecognizeText, findWord?.recognitionText.toLowerCase() || ""])
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseClick);
        return () => {
            document.removeEventListener('mousedown', handleMouseClick);
        }
    }, [props]);

    return (
        <Card className={styles.recognitionBlock}>
            <div className={styles.recognizedWords}>
                {
                    props.sentence.text.split(" ").map((sentenceWord, index) => {
                        const word = StartThemeWords.find(word => word.id === props.sentence.words[index])
                        return <p key={`sentenceWord${props.sentence.id}i${index}`}
                                  className={clsx(styles.recognizedWord, props.signRecognizeText.includes(word?.recognitionText || "") && styles.recognitionBlock__rightWordFill)}>
                            {sentenceWord}
                        </p>
                    })
                }
            </div>

            <RecognitionCamera
                intervalID={intervalID}
                setIntervalID={setIntervalID}
                onReceiveText={onReceiveText}
                className={styles.recognitionCamera}
            />

            {
                !props.isDoneTask &&
                <div className={styles.footer}>
                    <Button variant={"bordered"} size={"lg"} onClick={props.next} className={styles.button}>
                        <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/>
                        Пропустить
                    </Button>
                </div>
            }

            {
                props.isDoneTask &&
                <div className={styles.footer}>
                    <TaskContinue next={props.next} isRightAnswer={true} className={styles.taskContinue}/>
                </div>
            }

        </Card>
    );
});
