import React, {FC, useCallback} from "react";
import styles from "./AFKPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../components/Typography";
import {typedMemo} from "../../core/utils/typedMemo";
import Gradient from '../../assets/video/gradient.mp4'
import LogoStand from '../../assets/images/LogoStandMonochrome.svg'

export const AFKPage: FC = typedMemo(function AFKPage() {
    const navigate = useNavigate();

    const toHome = useCallback(() => navigate("home"), [navigate])

    return (
        <div className={styles.afkPage} onClick={toHome}>
            <video
                className={styles.afkPage__gradient}
                src={Gradient}
                autoPlay
                loop
                muted
            />

            <img className={styles.afkPage__logo} src={LogoStand} alt="Логотип"/>
            <Typography
                variant="p"
                className={styles.afkPage__tap}
            >
                Нажмите на экран, чтобы продолжить
            </Typography>
        </div>
    )
})
