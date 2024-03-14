import React, {FC, PropsWithChildren} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Card} from "../Card";
import {Typography} from "../Typography";
import styles from "./ByPinCode.module.css"
import PinCode from '../../assets/images/PinCode.svg'
import clsx from "clsx";

type Props = PropsWithChildren & ComponentProps;

/** Модель разработана SberAI. */
export const ByPinCode: FC<Props> = typedMemo(function ByPinCode(props){
    return (
        <div className={clsx(styles.bySberAI, props.className)}>
            <Typography className={styles.bySberAI__title}>
                Сервис изучения русского жестового языка разработан студенческой командой
            </Typography>
            <img src={PinCode} alt={"Логотип"} className={styles.bySberAI__logo}/>
        </div>
    );
});
