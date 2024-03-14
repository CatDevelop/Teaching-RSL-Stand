import React, {FC, useCallback, useEffect} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./StartLearning.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import RightClicker from "../../../../assets/images/RightClicker.svg";
import StartLearningImage from "../../../../assets/images/StartLearning.png";

type Props = {
    onStart: () => void
};

export const StartLearning: FC<Props> = typedMemo(function StartLearning(props) {
    return (
        <Card className={styles.startLearning}>
            <img src={StartLearningImage} className={styles.image} height={300}  alt=""/>
            <Typography variant="h2" className={styles.startLearning__title}>Начало обучения</Typography>
            <Typography
                variant="p"
                className={styles.startLearning__description}
            >
                Ознакомьтесь с теорией: изучите базовые
                жесты,<br/>запомните их, а потом проверьте свои умения<br/>
                с помощью нашей модели распознавания!
            </Typography>

            <Button
                variant="solid"
                color="primary"
                onClick={props.onStart}
            >
                <img className={styles.startLearning__tap__clicker} src={RightClicker} alt={"Правый кликер"}/> Начать
            </Button>
        </Card>
    )
});
