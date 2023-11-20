import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import styles from "./Fact.module.css";
import {Typography} from "../../../../components/Typography";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    title: string;
    description: string;
    source: string;
    variant: 'blue' | 'grape' | 'green'
}>

/**
 * Карточка с фактом
 */
export const Fact: FC<Props> = typedMemo(function Fact(props) {
    return (
        <div className={clsx(
            styles.fact,
            props.variant === 'blue' && styles.fact__blue,
            props.variant === 'grape' && styles.fact__grape,
            props.variant === 'green' && styles.fact__green
        )}
        >
            <div className={styles.fact__factContainer}>
                <Typography
                    variant='h1'
                    className={styles.fact__title}
                >
                    {props.title}
                </Typography>
                <Typography
                    variant='p'
                    className={styles.fact__description}
                >
                    {props.description}
                </Typography>
            </div>
            <Typography
                variant='p'
                className={styles.fact__source}
            >
                © {props.source}
            </Typography>
        </div>
    );
});
