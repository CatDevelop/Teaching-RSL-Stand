import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction, useCallback, useState} from "react";
import styles from "./RecognitionWordBlock.module.css";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import {Word} from "../../../../core/models/Word";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {RecognitionCamera} from "../RecognitionCamera";
import {Button} from "../../../../components/Button";
import {TaskContinue} from "../../../../components/TaskContinue";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg";
import classNames from "classnames";


type Props = ComponentProps & Readonly<{
    word: Word;
    // onSuccess: () => void;
    // intervalID: TimeoutId | undefined;
    // setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    // signRecognizeGrade: number
    // setSignRecognizeGrade: Dispatch<SetStateAction<number>>
    signRecognizeText: string[]
    setSignRecognizeText: Dispatch<SetStateAction<string[]>>
    // correctWords: Set<string>

    isDoneTask: boolean
    next: () => void
}>

export const RecognitionWordBlock: FC<Props> = typedMemo(function RecognitionWordBlock(props) {
    const [intervalID, setIntervalID] = useState<TimeoutId>();

    const onReceiveText = useCallback((text: string) => {
        let results: string[] = Object.values(JSON.parse(text))
        console.log(results)

        if (results.includes(props.word.recognitionText)) {
            if (props.signRecognizeText.at(-1) !== props.word.text.toLowerCase()) {
                props.setSignRecognizeText([...props.signRecognizeText, props.word.text.toLowerCase()])

            }
        } else {
            if (props.signRecognizeText.at(-1) !== results[0].toLowerCase()) {
                props.setSignRecognizeText([...props.signRecognizeText, results[0].toLowerCase()])
            }
        }
    }, [props])

    return (
        <Card className={styles.recognitionBlock}>
            <div className={styles.header}>
                <Typography variant="h2" className={classNames(styles.word, props.signRecognizeText.includes(props.word.text.toLowerCase()) && styles.recognitionBlock__rightWord)}>
                    {props.word.text}
                </Typography>
            </div>



            <RecognitionCamera
                intervalID={intervalID}
                setIntervalID={setIntervalID}
                onReceiveText={onReceiveText}
                className={styles.recognitionCamera}
            />

            {
                !props.isDoneTask &&
                <div>
                    <Typography variant="h3">Распознанные жесты</Typography>
                    <div className={styles.footer}>
                        <div className={styles.recognizedWords}>
                            {
                                props.signRecognizeText.slice(-3).map(word => {
                                    return (
                                        <Typography
                                            variant="span"
                                            className={clsx(
                                                styles.recognizedWord,
                                                word.toLowerCase() === props.word.text.toLowerCase() && styles.recognitionBlock__rightWord
                                            )}
                                        >
                                            {word}
                                        </Typography>
                                    )
                                })
                            }
                        </div>
                        <Button variant={"bordered"} size={"lg"} onClick={props.next}>
                            <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/>
                            Пропустить
                        </Button>
                    </div>
                </div>
            }

            {
                props.isDoneTask &&
                <div className={styles.footerContainer}>

                    <div className={styles.footer}>
                        <TaskContinue next={props.next} isRightAnswer={true} className={styles.taskContinue}/>
                    </div>
                </div>
            }

        </Card>
    );
});
