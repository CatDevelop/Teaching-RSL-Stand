import React, {FC, useCallback, useEffect} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./StartLearning.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import RightClicker from "../../../../assets/images/RightClicker.svg";

type Props = {
    onStart: () => void
};

export const StartLearning: FC<Props> = typedMemo(function StartLearning(props) {
    return (
        <Card className={styles.startLearning}>
            <Typography variant="h2" className={styles.startLearning__title}>Начало обучения</Typography>
            <Typography
                variant="p"
                className={styles.startLearning__description}
            >
                Сначала вы ознакомитесь с теорией. Изучите 5 базовых жестов, запомните их, а потом проверьте свои умения<br/> с нашей моделью распознавания!
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
