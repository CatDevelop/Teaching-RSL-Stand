import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {Typography} from "../../../../../components/Typography";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {getSelectEntity} from "../../SelectEntity/SelectContainer/SelectContainer";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    otherVariants: Word[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/** Практика "Выбери слово". */
export const PracticeSelectWord: FC<Props> = typedMemo(function PracticeSelectWord(props) {
    const [selectWord, setSelectWord] = useState<Word | null>()
    const [variants] = useState(shuffleArray([props.wordObject, ...props.otherVariants]))

    useEffect(() => {
        if (props.checked) {
            if (selectWord?.id === props.wordObject.id)
                props.setStatus({status: "success"})
            else
                props.setStatus({status: "error", message: props.wordObject.text})
        }
    }, [props, selectWord])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!selectWord)
    }, [selectWord, props.setIsTaskReadyToCheck])

    return (
        <div className={clsx(styles.practiceSelectWord)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectWord__contentContainer}>
                    <SignVideo src={props.wordObject.gifSource}/>

                    <div className={styles.practiceSelectWord__buttonsContainer}>
                        <Typography variant="h3" className={styles.practiceSelectWord__title}>
                            Выбери верное слово
                        </Typography>
                        {
                            variants?.map(variant => (
                                <SelectButton
                                    wordObject={variant}
                                    setState={setSelectWord}
                                    state={getSelectEntity(props.checked, selectWord, variant, props.wordObject)}
                                />
                            ))
                        }
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
