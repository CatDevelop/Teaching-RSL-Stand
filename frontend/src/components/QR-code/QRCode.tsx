import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Card} from "../Card";
import Habr from "../../assets/images/QrHabr.png";
import Git from "../../assets/images/QrGit.png"
import {Typography} from "../Typography";
import styles from "./QRCode.module.css"
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    type: "git" | "habr";
}>;

/** QR-код. */
export const QRCode: FC<Props> = typedMemo(function QRCode(props){
    return <Card className={clsx(styles.qrcode, props.className)}>
        {
            props.type === 'git'
                ? <img src={Git} alt='QR' className={styles.qrcode__image}/>
                : <img src={Habr} alt='QR' className={styles.qrcode__image}/>
        }
        <Typography
            variant="p"
            className={styles.qrcode__description}
        >
            {
                props.type === 'git'
                    ? "Модель распознавания\nразработана командой Sber AI"
                    : "Стенд для выставки\nразработан командой ПИН-КОД"
            }
        </Typography>
    </Card>
});
