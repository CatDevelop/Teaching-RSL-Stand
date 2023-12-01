import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./LearningBlock.module.css"
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = PropsWithChildren & ComponentProps & Readonly <{
    iconUrl: string;
    title: string;
}>

/** Learning block. */
export const LearningBlock: FC<Props> = typedMemo(function LearningBlock(props){
    return (
        <Card className={clsx(styles.learningBlock, props.className)}>
            <div className={styles.learningBlock__header}>
                <img src={props.iconUrl} alt={`${props.title} icon`} className={styles.learningBlock__icon} />
                <Typography variant="h3">
                    {props.title}
                </Typography>
            </div>
            <div className={styles.learningBlock__contentContainer}>
                {props.children}
            </div>
        </Card>
    );
});
