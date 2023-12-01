import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import {clsx} from "clsx";
import styles from "./StartTraining.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";

type Props = {
    onStart: any
};

export const StartTraining: FC<Props> = typedMemo(function StartTraining(props) {
    return (
        <Card className={styles.startTraining}>
            <Typography variant={"h2"} className={styles.startTraining__title}>
                Начало тренировки
            </Typography>
            <Typography variant={"p"} className={styles.startTraining__description}>
                Вам будут предложены слова, которые вы должны показать в камеру.
                Система распознает ваш жест<br/> и отобразит слово зелёным цветом.
                После успешного выполнения перейдите к следующему слову.
            </Typography>
            <Button
                variant={"solid"}
                color={"primary"}
                onClick={props.onStart}
                size={"lg"}
            >
                Начать прохождение
            </Button>
        </Card>
    )
});
