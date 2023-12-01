import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectGIFByWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {getSelectEntity} from "../../SelectEntity/SelectContainer/SelectContainer";


type Props = ComponentProps & Readonly<{
    wordObject: Word;
    otherVariants: Word[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>


/** Практика "Выбери жест". */
export const PracticeSelectGIFByWord: FC<Props> = typedMemo(function PracticeSelectGIFByWord(props) {
    const [selectGIF, setSelectGIF] = useState<Word | null>()
    const [variants] = useState(shuffleArray([props.wordObject, ...props.otherVariants]))

    useEffect(() => {
        if (props.checked) {
            if (selectGIF?.id === props.wordObject.id)
                props.setStatus({status: "success"})
            else
                props.setStatus({status: "error", message: props.wordObject.text})
        }
    }, [props, selectGIF?.id])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!selectGIF)
    }, [selectGIF, props.setIsTaskReadyToCheck])

    return (
        <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
            <div className={styles.practiceSelectGif__titleContainer}>
                <Typography variant="h3" className={styles.practiceSelectGif__title}>
                    Выбери жест
                </Typography>
                <Typography
                    variant="h3"
                    className={clsx(styles.practiceSelectGif__title, styles.practiceSelectGif__titleSignText)}
                >
                    {props.wordObject.text}
                </Typography>
            </div>

            <div className={styles.practiceSelectGif__gifsContainer}>
                {
                    variants.map((variant, index) => {
                        return <div className={styles.practiceSelectGif__gif}>
                            <SelectGIF
                                key={"SelectGIF" + index}
                                wordObject={variant}
                                state={getSelectEntity(props.checked, selectGIF, variant, props.wordObject)}
                                setState={setSelectGIF}
                                number={index + 1}/>
                        </div>
                    })
                }
            </div>
        </LearningBlock>
    );
});
