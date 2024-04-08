import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import {clsx} from "clsx";
import styles from "./StartTrainingSentence.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import RightClicker from "../../../../assets/images/RightClicker.svg";
import StartTrainingSentenceImage from "../../../../assets/images/StartTrainingSentence.svg";
import {useNavigate} from "react-router-dom";


export const StartTrainingSentence: FC = typedMemo(function StartTrainingSentence() {
    const navigate = useNavigate()

    return (
        <Card className={styles.startTraining}>
            <img src={StartTrainingSentenceImage} className={styles.image} alt=""/>
            <Typography variant={"h2"} className={styles.startTraining__title}>
                Начало практики
            </Typography>
            <Typography variant={"p"} className={styles.startTraining__description}>
                Вам нужно показать предложение изученными жестами.
                Система распознает их и отметит правильные зелёным.<br/>
                После успешного выполнения перейдите к следующему.
            </Typography>
            <Button
                variant={"solid"}
                color={"primary"}
                onClick={() => navigate("/training/sentence")}
                size={"lg"}
            >
                <img className={styles.startTraining__tap__clicker} src={RightClicker} alt={"Правый кликер"}/> Начать
            </Button>
        </Card>
    )
});
