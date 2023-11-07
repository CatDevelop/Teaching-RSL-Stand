import React, {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import Logo from "../../../assets/images/Logo.svg";
import {Typography} from "../../../components/Typography";
import {Button} from "../../../components/Button";
import {typedMemo} from "../../../core/utils/typedMemo";

export const NotFoundPage: FC = typedMemo(function NotFoundPage() {
    const navigate = useNavigate()

    const toMainPage = useCallback(() => navigate("/"), [navigate])

    return (
        <div className={styles.notFoundPage}>
            <img src={Logo} width={400} alt={"Логотип сервиса \"Изучение русского жестового языка\""}/>
            <div className={styles.notFoundPage__contentContainer}>
                <Typography variant="h1" className={styles.notFoundPage__header}>404</Typography>
                <Typography variant="p" className={styles.notFoundPage__description}>
                    Извините, страница не найдена
                </Typography>

                <Button color="primary" variant="solid" onClick={toMainPage}>
                    На главную
                </Button>
            </div>
        </div>
    )
})
