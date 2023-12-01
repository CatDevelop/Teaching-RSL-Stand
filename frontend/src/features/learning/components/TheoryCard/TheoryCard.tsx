import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import TheoryIconSVG from "../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {LearningBlock} from "../LearningBlock";
import {Word} from "../../../../core/models/Word";

type Props = ComponentProps & Readonly<{
    wordObject: Word
}>

/** Карточка с теорией: GIF, изображение, слово. */
export const TheoryCard: FC<Props> = typedMemo(function TheoryCard(props) {
    return (
        <div className={clsx(styles.theoryCard)}>
            <LearningBlock iconUrl={TheoryIconSVG} title={"Теория"}>
                <div className={styles.theoryCard__contentContainer}>
                    <Typography variant="h1" className={styles.theoryCard__word}>
                        {props.wordObject.text}
                    </Typography>
                    <div className={styles.theoryCard__images}>
                        <SignVideo
                            src={props.wordObject.gifSource}
                            className={styles.theoryCard__gif}
                        />
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
