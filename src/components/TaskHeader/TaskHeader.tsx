
import React, {FC} from "react";
import styles from "./TaskHeader.module.css"
import {Typography} from "../Typography";
import {ProgressBar} from "../ProgressBar";
import {typedMemo} from "../../core/utils/typedMemo";
import {Card} from "../Card";

type Props = Readonly<{
    type: string;
    name: string;
    currentStep: number;
    stepCount: number;
    task: string
}>

/**
 * Верхняя информационная панель для заданий
 */
export const TaskHeader: FC<Props> = typedMemo(function TaskHeader(props: Props) {
    return (
        <Card className={styles.taskHeader}>
            <div className={styles.info}>
                <Typography variant="h3" className={styles.name}>
                    {props.name}
                </Typography>
                <Typography variant="h2" className={styles.task}>
                    {props.task}
                </Typography>
                <Typography variant="p" className={styles.type}>
                    {props.type}
                </Typography>
            </div>
            <div>
                <ProgressBar currentStep={props.currentStep - 1} stepCount={props.stepCount}/>
            </div>
        </Card>
    );
});
