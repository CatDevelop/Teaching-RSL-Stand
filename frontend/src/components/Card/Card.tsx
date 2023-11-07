import React, { FC, PropsWithChildren } from "react";
import {clsx} from "clsx"
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Card.module.css"
import { ComponentProps } from "../../core/models/ComponentProps";

type Props = PropsWithChildren & ComponentProps;

/** Карточка. */
export const Card: FC<Props> = typedMemo(function Card(props){
    return (
        <div className={clsx(styles.card, props.className)}>
            {props.children}
        </div>
    );
});
