import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./ResultCard.module.css";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {Typography} from "../../../../components/Typography";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    title: string;
    iconUrl: string;
    content: string;
}>

/** Результат тренировки. */
export const ResultCard: FC<Props> = typedMemo(function ResultCard({
    className,
    iconUrl,
    content,
    title,
}){
    return (
        <div className={clsx(styles.resultCard, className)}>
            <Typography variant="span" className={styles.resultCard__title}>{title}</Typography>
            <div className={styles.resultCard__result}>
                <img src={iconUrl} rel="preload" className={styles.resultCard__resultIcon} alt="Иконка результата"/>
                <Typography variant="span" className={styles.resultCard__resultContent}>
                    {content}
                </Typography>
            </div>
        </div>
    );
});
