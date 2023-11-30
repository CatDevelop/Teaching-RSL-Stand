import React, {FC, PropsWithChildren} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Card} from "../Card";
import {Typography} from "../Typography";
import styles from "./BySberAI.module.css"
import clsx from "clsx";

type Props = PropsWithChildren & ComponentProps;

/**
 * Модель разработана SberAI.
 **/
export const BySberAI: FC<Props> = typedMemo(function BySberAI(props){
    return (
        <Card className={clsx(styles.bySberAI, props.className)}>
            <Typography className={styles.bySberAI__title}>
                Модель распознавания русского жестового языка разработана командой Sber AI
            </Typography>
        </Card>
    );
});
