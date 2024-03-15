import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {Word} from "../../../../core/models/Word";
import {Card} from "../../../../components/Card";
import {Button} from "../../../../components/Button";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg"

type Props = ComponentProps & Readonly<{
    wordObject: Word
    next: () => void
}>

/** Карточка с теорией: GIF, изображение, слово. */
export const TheoryCard: FC<Props> = typedMemo(function TheoryCard(props) {
    return (
        <Card className={styles.theoryCard}>
            <Typography variant="h1" className={styles.title}>
                {props.wordObject.text}
            </Typography>

            <SignVideo
                src={props.wordObject.gifSource}
                className={styles.gif}
            />

            <div className={styles.footer}>
                <Button variant={"solid"} color="primary" size={'lg'} onClick={props.next} className={styles.button}>
                    <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/>
                    Далее
                </Button>
            </div>
        </Card>
    );
});
