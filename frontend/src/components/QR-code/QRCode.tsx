import React, {FC, useCallback, useMemo} from "react";
import {Progress} from "@nextui-org/react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Card} from "../Card";
import Habr from "../../assets/images/QRHabr.png";
import GIT from "../../assets/images/QRGIT.png"
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
            props.type === 'git' &&
            <img src={GIT} alt='QR' className={styles.qrcode__image}/>
        }
        {
            props.type === 'habr' &&
            <img src={Habr} alt='QR' className={styles.qrcode__image}/>
        }
        <Typography
            variant="p"
            className={styles.qrcode__description}
        >
            {
                props.type === 'git' &&
                "Репозиторий модели распознавания"
            }
            {
                props.type === 'habr' &&
                "Статья о модели распознавания"
            }
        </Typography>
    </Card>
});
