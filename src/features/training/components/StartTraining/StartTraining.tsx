import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import {clsx} from "clsx";
import styles from "./StartTraining.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import RightClicker from "../../../../assets/images/RightClicker.svg";
import StartTrainingImage from "../../../../assets/images/StartTraining.png";

type Props = {
    onStart: any
};

export const StartTraining: FC<Props> = typedMemo(function StartTraining(props) {
    return (
        <Card className={styles.startTraining}>
            <img src={StartTrainingImage} className={styles.image}  alt=""/>
            <Typography variant={"h2"} className={styles.startTraining__title}>
                Начало тренировки
            </Typography>
            <Typography variant={"p"} className={styles.startTraining__description}>
                Покажите изученные жесты в камеру. <br/>
                Система распознает их и отметит правильные слова зеленым. <br/>
                После успешного выполнения задания перейдите к следующему
            </Typography>
            <Button
                variant={"solid"}
                color={"primary"}
                onClick={props.onStart}
                size={"lg"}
            >
                <img className={styles.startTraining__tap__clicker} src={RightClicker} alt={"Правый кликер"}/> Начать
            </Button>
        </Card>
    )
});
