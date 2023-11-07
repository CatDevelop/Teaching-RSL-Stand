import React, {FC} from "react";
import clsx from "clsx";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./ToPractice.module.css";
import {Button} from "../Button";
import {ComponentProps} from "../../core/models/ComponentProps";

type Props = ComponentProps & Readonly<{
    next: () => void;
    isRightAnswer: boolean;
    rightAnswer?: string;
}>

/** Переход к режиму тренировок. */
export const ToPractice: FC<Props> = typedMemo(function ToPractice(props) {
    return (
        <div className={clsx(styles.toPractice, props.className)}>
            <Button color="primary" onClick={props.next}>Далее</Button>
        </div>
    )
});
