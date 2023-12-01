import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./StartLearning.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";

type Props = {
    onStart: any
};

export const StartLearning: FC<Props> = typedMemo(function StartLearning(props) {
    return (
        <Card className={styles.startLearning}>
            <Typography variant="h2" className={styles.startLearning__title}>Начало обучения</Typography>
            <Typography
                variant="p"
                className={styles.startLearning__description}
            >
                Сначала вы ознакомитесь с теорией, затем пройдёте 3 интерактивных задания,
                чтобы закрепить материал.
                Постарайтесь запомнить все жесты, чтобы успешно пройти практику.
            </Typography>

            <Button
                variant="solid"
                color="primary"
                onClick={props.onStart}
            >
                Начать прохождение
            </Button>
        </Card>
    )
});
