import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import {clsx} from "clsx";
import styles from "../../pages/TrainingPage/TrainingPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";

type Props = {
    onStart: any
};

export const StartTraining: FC<Props> = typedMemo(function StartTraining(props) {
    return (
        <Card className={clsx(styles.trainingTask__startCard, styles.trainingTask__startAnimation)}>
            <Typography variant={"h2"} className={styles.trainingTask__startCardTitle}>
                Начало тренировки
            </Typography>
            <Typography variant={"p"} className={styles.trainingTask__startCardDescription}>
                Вам будут предложены слова, которые вы должны показать в камеру.
                Наша система распознает ваш жест и отобразит слово зелёным цветом.
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
