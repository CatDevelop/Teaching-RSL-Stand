import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./ModelWarning.module.css";
import {Typography} from "../../../../components/Typography";
import GitHubLogo from "../../../../assets/images/GitHubLogo.svg";
import {clsx} from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {Spinner} from "@nextui-org/react";

export const ModelWarning: FC<ComponentProps> = typedMemo(function ModelWarning(props) {
    return (
        <Card className={clsx(styles.modelWarning__container, props.className)}>
            <Typography variant={"h3"} className={styles.modelWarning__title}>
                Произошла ошибка 🤖💔
            </Typography>
            <Typography variant={"p"} className={styles.modelWarning__description}>
                Распознавание работает только при запущенной на локальной машине модели распознавания.
                Чтобы развернуть её, скачайте архив и запустите .exe файл:
                <div className={styles.modelWarning__gitLink}>
                    <a href={"https://drive.google.com/file/d/17o-jI42XvbdJuj8Ap_oINbbuQvxtwEEx/view?usp=sharing"} target={"_blank"} rel="noreferrer">
                        Скачать архив
                    </a>
                </div>
            </Typography>
        </Card>
    )
});
