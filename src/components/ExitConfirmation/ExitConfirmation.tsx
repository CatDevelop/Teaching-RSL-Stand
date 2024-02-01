import React, {Dispatch, FC, SetStateAction, useCallback} from "react";
import clsx from "clsx";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./ExitConfirmation.module.css";
import {Button} from "../Button";
import {ComponentProps} from "../../core/models/ComponentProps";
import {useNavigate} from "react-router-dom";
import {Typography} from "../Typography";

type Props = ComponentProps & Readonly<{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onExit: () => void
}>

/**
 * Подтверждение выхода из задания
 */
export const ExitConfirmation: FC<Props> = typedMemo(function ExitConfirmation(props) {
    const navigate = useNavigate()

    const closeModal = useCallback(() => props.setIsOpen(false), [props.setIsOpen])
    const toMainPage = useCallback(() => navigate("/profile"), [navigate])

    if (!props.isOpen)
        return;

    return (
        <>
            <div className={styles.exitConfirmation__blur}/>
            <div className={clsx(styles.exitConfirmation__container, props.className)}>
                <div className={styles.exitConfirmation__contentContainer}>
                    <div>
                        <Typography variant='h2'>Действительно хотите выйти?</Typography>
                        <Typography variant='p' className={styles.exitConfirmation__description}>
                            Ваш результат не сохранится
                        </Typography>
                    </div>
                    <div className={styles.exitConfirmation__buttons}>
                        <Button
                            size="lg"
                            variant="faded"
                            onClick={closeModal}
                        >
                            Остаться
                        </Button>
                        <Button
                            size="lg"
                            color="primary"
                            onClick={props.onExit}
                        >
                            Выйти
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
});
