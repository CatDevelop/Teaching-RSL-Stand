import React, { FC } from "react";
import clsx from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import TickCircle from '../../assets/images/TickCircle.svg'
import CloseCircle from '../../assets/images/CloseCircle.svg'
import styles from "./TaskContinue.module.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { ComponentProps } from "../../core/models/ComponentProps";

type Props = ComponentProps & Readonly<{
    next: () => void;
    isRightAnswer: boolean;
    rightAnswer?: string;
}>

/** Меню продолжения уровня. */
export const TaskContinue: FC<Props> = typedMemo(function TaskContinue(props){
    return (
        <div className={clsx(
            styles.taskContinue,
            !props.isRightAnswer && styles.taskContinue_incorrectly,
            props.className
        )}>
            {props.isRightAnswer ?
                <>
                    <div className={styles.taskContinue__result}>
                        <img src={TickCircle} rel="preload" alt="Иконка галочки" className={styles.taskContinue__icon} />
                        <Typography
                            variant="h3"
                            className={styles.taskContinue__textBlock}>
                            Вы отлично справились!
                        </Typography>
                    </div>
                    <Button color="primary" onClick={props.next}>Далее</Button>
                </> :
                <>
                    <div className={styles.taskContinue__result}>
                        <img src={CloseCircle} rel="preload" alt="Иконка крестика" className={styles.taskContinue__icon} />
                        <div className={styles.taskContinue__textBlock}>
                            <Typography variant="h3">Правильный ответ: </Typography>
                            <Typography className={styles.taskContinue__description}>{props.rightAnswer}</Typography>
                        </div>
                    </div>
                    <Button color="danger" onClick={props.next}>Далее</Button>
                </>
        }
        </div>
    )
});
